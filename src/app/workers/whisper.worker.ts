import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js for the browser environment
env.allowLocalModels = false;
env.useBrowserCache = true;

// Define message types
export type WorkerIncomingMessage =
  | {
      type: 'load';
      modelId?: string;
      device?: 'webgpu' | 'wasm' | 'auto';
      language?: string;
    }
  | {
      type: 'transcribe';
      audio: Float32Array;
      language?: string;
      task?: 'transcribe' | 'translate';
      isFinal?: boolean;
    }
  | {
      type: 'reset';
    };

export type WorkerOutgoingMessage =
  | {
      status: 'loading';
      message: string;
    }
  | {
      status: 'progress';
      file?: string;
      progress?: number;
      loaded?: number;
      total?: number;
      statusText?: string;
    }
  | {
      status: 'ready';
      model: string;
      device: string;
    }
  | {
      status: 'transcribing';
    }
  | {
      status: 'transcription';
      text: string;
      isFinal: boolean;
    }
  | {
      status: 'error';
      error: string;
    };

const MODEL_ID = 'onnx-community/whisper-small';

// Pipeline holder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let transcriberInstance: any = null;
let isInitializing = false;

// Helper to check for WebGPU availability in worker
function checkWebGPUSupport(): boolean {
  try {
    return (
      typeof navigator !== 'undefined' &&
      'gpu' in navigator &&
      Boolean(navigator.gpu)
    );
  } catch {
    return false;
  }
}

// Initialize the Whisper pipeline
async function getTranscriber(preferredDevice: 'webgpu' | 'wasm' | 'auto' = 'auto') {
  if (transcriberInstance) {
    return transcriberInstance;
  }

  if (isInitializing) {
    // Wait until initialization completes
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return transcriberInstance;
  }

  isInitializing = true;
  self.postMessage({ status: 'loading', message: 'Initializing Whisper Small model...' });

  const hasWebGPU = checkWebGPUSupport();
  const targetDevice =
    preferredDevice === 'auto'
      ? hasWebGPU
        ? 'webgpu'
        : 'wasm'
      : preferredDevice;

  // Progress callback to notify main thread
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const progressCallback = (data: any) => {
    self.postMessage({
      status: 'progress',
      file: data.file,
      progress: data.progress,
      loaded: data.loaded,
      total: data.total,
      statusText: data.status,
    });
  };

  try {
    // Attempt with selected device and optimized precision
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      device: targetDevice,
      dtype: {
        encoder_model: 'fp32',
        decoder_model_merged: 'q4',
      },
      progress_callback: progressCallback,
    };

    transcriberInstance = await pipeline('automatic-speech-recognition', MODEL_ID, options);
    self.postMessage({
      status: 'ready',
      model: MODEL_ID,
      device: targetDevice,
    });
  } catch (gpuError) {
    console.warn(`Failed to initialize with ${targetDevice}, falling back to wasm:`, gpuError);

    try {
      // Fallback to WASM
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wasmOptions: any = {
        device: 'wasm',
        dtype: {
          encoder_model: 'fp32',
          decoder_model_merged: 'q4',
        },
        progress_callback: progressCallback,
      };

      transcriberInstance = await pipeline('automatic-speech-recognition', MODEL_ID, wasmOptions);
      self.postMessage({
        status: 'ready',
        model: MODEL_ID,
        device: 'wasm',
      });
    } catch {
      // Last resort fallback with standard q4
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lastOptions: any = {
          device: 'wasm',
          dtype: 'q4',
          progress_callback: progressCallback,
        };
        transcriberInstance = await pipeline('automatic-speech-recognition', MODEL_ID, lastOptions);
        self.postMessage({
          status: 'ready',
          model: MODEL_ID,
          device: 'wasm',
        });
      } catch (finalError) {
        const errorMsg =
          finalError instanceof Error ? finalError.message : String(finalError);
        self.postMessage({
          status: 'error',
          error: `Failed to load model: ${errorMsg}`,
        });
        throw finalError;
      }
    }
  } finally {
    isInitializing = false;
  }

  return transcriberInstance;
}

// Handle messages from the main thread
self.addEventListener('message', async (event: MessageEvent<WorkerIncomingMessage>) => {
  const message = event.data;

  try {
    switch (message.type) {
      case 'load': {
        await getTranscriber(message.device || 'auto');
        break;
      }

      case 'transcribe': {
        const { audio, language = 'english', task = 'transcribe', isFinal = false } = message;

        if (!audio || audio.length === 0) {
          self.postMessage({
            status: 'transcription',
            text: '',
            isFinal,
          });
          return;
        }

        self.postMessage({ status: 'transcribing' });

        const transcriber = await getTranscriber();

        // Run speech recognition
        const result = await transcriber(audio, {
          language: language === 'auto' ? null : language,
          task,
          chunk_length_s: 30,
          stride_length_s: 5,
          return_timestamps: false,
        });

        const rawText = Array.isArray(result)
          ? result.map((r) => r.text).join(' ')
          : result.text || '';

        self.postMessage({
          status: 'transcription',
          text: rawText.trim(),
          isFinal,
        });
        break;
      }

      case 'reset': {
        // No-op or clear transient state
        break;
      }
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    self.postMessage({
      status: 'error',
      error: errorMsg,
    });
  }
});
