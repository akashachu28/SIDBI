'use client';

import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { submitQuery } from '@/lib/api/services/query';

/* -------------------------------------------------------------------------- */
/*  Component: LiveTranscription                                              */
/* -------------------------------------------------------------------------- */

export interface LiveTranscriptionProps {
  initialText?: string;
  onTranscriptChange?: (text: string) => void;
  onContinue?: (query: string) => void;
  lang?: string;
  placeholder?: string;
  className?: string;
}

export function LiveTranscription({
  initialText = '',
  onTranscriptChange,
  onContinue,
  lang = 'en-IN',
  placeholder = 'Speak or type here...',
  className = '',
}: LiveTranscriptionProps) {
  const [selectedLang, setSelectedLang] = useState(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [manualText, setManualText] = useState(initialText);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // Sync initialText if provided
  useEffect(() => {
    if (initialText && !manualText) {
      setManualText(initialText);
    }
  }, [initialText, manualText]);

  // Update text when final speech is produced
  useEffect(() => {
    if (finalTranscript) {
      setManualText((prev) => {
        const updated = prev ? `${prev.trim()} ${finalTranscript}`.trim() : finalTranscript;
        onTranscriptChange?.(updated);
        return updated;
      });
      resetTranscript();
    }
  }, [finalTranscript, onTranscriptChange, resetTranscript]);

  const handleToggleRecord = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        continuous: true,
        language: selectedLang,
      });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setManualText(val);
    onTranscriptChange?.(val);
  };

  const handleClear = () => {
    setManualText('');
    resetTranscript();
    SpeechRecognition.stopListening();
    onTranscriptChange?.('');
  };

  const handleSubmit = async () => {
    const fullText = (manualText + (interimTranscript ? ' ' + interimTranscript : '')).trim();
    if (!fullText || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await submitQuery({ query: fullText });
      if (response.success) {
        setSubmitSuccess(true);
      }
      onContinue?.(fullText);
    } catch (err) {
      console.error('Submit query error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayText = manualText + (interimTranscript ? (manualText ? ' ' : '') + interimTranscript : '');

  return (
    <div className={`flex w-full flex-col rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-xl ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`size-2.5 rounded-full ${
                listening
                  ? 'animate-ping bg-red-500'
                  : browserSupportsSpeechRecognition
                  ? 'bg-emerald-500'
                  : 'bg-slate-300'
              }`}
            />
            <span className="text-sm font-semibold text-[#0f172a]">
              {listening
                ? 'Listening live…'
                : browserSupportsSpeechRecognition
                ? 'Speech Recognition Ready'
                : 'Not Supported in Browser'}
            </span>
          </div>

          <span className="rounded-md bg-[#eff6ff] px-2 py-0.5 text-xs font-medium text-[#2563eb]">
            React Speech Recognition
          </span>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="react-stt-lang" className="text-xs font-medium text-[#64748b]">
            Language:
          </label>
          <select
            id="react-stt-lang"
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            disabled={listening}
            className="rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs font-medium text-[#334155] focus:border-[#3b82f6] focus:outline-none"
          >
            <option value="en-IN">English (India)</option>
            <option value="en-US">English (US)</option>
            <option value="hi-IN">हिन्दी (Hindi)</option>
            <option value="ta-IN">தமிழ் (Tamil)</option>
            <option value="te-IN">తెలుగు (Telugu)</option>
            <option value="bn-IN">বাংলা (Bengali)</option>
          </select>
        </div>
      </div>

      {/* Textarea for live display and editing */}
      <div className="relative my-3 min-h-[140px] flex-1">
        <textarea
          value={displayText}
          onChange={handleTextChange}
          placeholder={placeholder}
          rows={5}
          className="w-full resize-none rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4 text-base leading-relaxed text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#3b82f6] focus:bg-white focus:outline-none"
        />
        {interimTranscript && listening && (
          <span className="absolute bottom-4 right-4 animate-pulse rounded-full bg-[#eff6ff] px-2.5 py-0.5 text-xs font-semibold text-[#2563eb]">
            Transcribing: {interimTranscript}
          </span>
        )}
      </div>

      {/* Permissions / support warning */}
      {!browserSupportsSpeechRecognition && (
        <div className="mb-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
          Your browser does not support Web Speech Recognition. Please try using Google Chrome, Microsoft Edge, or Safari.
        </div>
      )}

      {!isMicrophoneAvailable && browserSupportsSpeechRecognition && (
        <div className="mb-3 rounded-xl bg-red-50 p-3 text-xs text-red-600">
          Microphone access is blocked. Please check your browser permission settings.
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleClear}
          disabled={!displayText || listening}
          className="rounded-full px-4 py-2 text-xs font-semibold text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] disabled:opacity-40"
        >
          Clear
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleRecord}
            disabled={!browserSupportsSpeechRecognition}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all shadow-md ${
              listening
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white hover:opacity-95'
            }`}
          >
            {listening ? (
              <>
                <span className="size-2 animate-ping rounded-full bg-white" />
                Stop Listening
              </>
            ) : (
              <>
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="3" width="6" height="12" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
                Start Speaking
              </>
            )}
          </button>

          {onContinue && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!displayText.trim() || listening || isSubmitting}
              className="rounded-full bg-[#0f172a] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-40"
            >
              {isSubmitting ? 'Submitting…' : submitSuccess ? 'Submitted ✓' : 'Continue'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { SpeechRecognition, useSpeechRecognition };
