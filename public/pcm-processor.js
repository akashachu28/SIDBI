/**
 * AudioWorklet Processor for capturing PCM audio data from the microphone.
 * Runs in the Web Audio rendering thread to avoid UI latency.
 */
class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    // 4096 samples @ 16kHz is ~256ms of audio per chunk
    this.bufferSize = 4096;
    this.buffer = new Float32Array(this.bufferSize);
    this.bufferIndex = 0;
    this.isRecording = true;

    this.port.onmessage = (event) => {
      if (event.data === 'flush') {
        this.flush();
      } else if (event.data === 'stop') {
        this.flush();
        this.isRecording = false;
      } else if (event.data === 'start') {
        this.isRecording = true;
        this.bufferIndex = 0;
      }
    };
  }

  process(inputs) {
    if (!this.isRecording) {
      return true;
    }

    const input = inputs[0];
    if (input && input.length > 0) {
      const channelData = input[0]; // First channel (mono)
      if (channelData) {
        for (let i = 0; i < channelData.length; i++) {
          this.buffer[this.bufferIndex++] = channelData[i];

          if (this.bufferIndex >= this.bufferSize) {
            this.flush();
          }
        }
      }
    }

    return true;
  }

  flush() {
    if (this.bufferIndex > 0) {
      const outputChunk = this.buffer.slice(0, this.bufferIndex);
      // Transfer the buffer to main thread for zero-copy efficiency
      this.port.postMessage(outputChunk.buffer, [outputChunk.buffer]);
      this.bufferIndex = 0;
    }
  }
}

registerProcessor('pcm-processor', PCMProcessor);
