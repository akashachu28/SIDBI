'use client'

import 'regenerator-runtime/runtime'
import React, { useState, useRef, useEffect, useCallback } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { submitQuery } from "@/lib/api/services"

/* -------------------------------------------------------------------------- */
/*  Props and constants                                                        */
/* -------------------------------------------------------------------------- */

interface BusinessInfoStepProps {
  businessText: string
  setBusinessText: (text: string) => void
  isRecording: boolean
  setIsRecording: (recording: boolean) => void
  inputMode: 'mic' | 'type' | 'upload' | null
  setInputMode: (mode: 'mic' | 'type' | 'upload' | null) => void
  onBack: () => void
  onNext: () => void
}

const SUGGESTIONS = [
  "What schemes can I get?",
  "Help me with Udyam registration",
  "I want a loan for my business",
  "I run a small shop"
]

const PLACEHOLDER =
  "For example: We run a small garment unit in Tiruppur with 40 employees. We need working capital and want to know which government schemes we can apply for."

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export function BusinessInfoStep({
  businessText,
  setBusinessText,
  isRecording,
  setIsRecording,
  inputMode,
  setInputMode,
  onBack,
  onNext
}: BusinessInfoStepProps) {
  const [selectedLang, setSelectedLang] = useState('en-IN')
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const baseTextRef = useRef('')

  // React Speech Recognition library hook
  const {
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  // Synchronize recording state
  useEffect(() => {
    setIsRecording(listening)
  }, [listening, setIsRecording])

  // Update business text as speech finalizes
  useEffect(() => {
    if (finalTranscript) {
      const combined = baseTextRef.current ? `${baseTextRef.current.trim()} ${finalTranscript}`.trim() : finalTranscript
      setBusinessText(combined)
    }
  }, [finalTranscript, setBusinessText])

  const hasText = businessText.trim().length > 0
  const composing = isRecording || hasText || inputMode === 'type' || inputMode === 'mic'
  const showSuggestions = !hasText && !isRecording
  const wordCount = businessText.trim().split(/\s+/).filter(Boolean).length

  // Keep live transcript scrolled to bottom
  useEffect(() => {
    const el = transcriptRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [businessText, interimTranscript, isRecording])

  // Stop listening on unmount
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening()
    }
  }, [])

  /* ------------------------------ voice input ----------------------------- */

  const startRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      setInputMode('type')
      setSpeechError("Voice input isn't supported in this browser. Please use Chrome, Edge, or Safari, or type instead.")
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 0)
      return
    }

    if (!isMicrophoneAvailable) {
      setSpeechError("Microphone access is blocked. Allow it in your browser settings.")
      return
    }

    setSpeechError(null)
    baseTextRef.current = businessText ? businessText.trimEnd() + ' ' : ''
    resetTranscript()
    setInputMode('mic')

    SpeechRecognition.startListening({
      continuous: true,
      language: selectedLang,
    })
  }

  const stopRecording = () => {
    SpeechRecognition.stopListening()
    if (interimTranscript) {
      const full = (businessText ? `${businessText.trim()} ${interimTranscript}` : interimTranscript).trim()
      setBusinessText(full)
    }
    resetTranscript()
  }

  const handleMicClick = () => {
    if (listening) stopRecording()
    else startRecording()
  }

  /* ------------------------------ text input ------------------------------ */

  const handleType = useCallback(() => {
    setSpeechError(null)
    setInputMode('type')
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 0)
  }, [setInputMode])

  const handleSuggestionClick = useCallback((text: string) => {
    setSpeechError(null)
    setInputMode('type')
    setBusinessText(text + ' ')
    setTimeout(() => {
      const el = textareaRef.current
      if (el) {
        el.focus()
        el.setSelectionRange(el.value.length, el.value.length)
      }
    }, 0)
  }, [setInputMode, setBusinessText])

  const handleClear = () => {
    setBusinessText('')
    baseTextRef.current = ''
    resetTranscript()
    SpeechRecognition.stopListening()
    setSpeechError(null)
    setInputMode(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      if (hasText && !isRecording) handleContinue()
    }
  }

  const handleContinue = async () => {
    if (!hasText || isRecording || isSubmitting) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await submitQuery({
        query: businessText.trim()
      })

      if (!response.success) {
        console.warn('Query submission returned error:', response.message)
      }
    } catch (error) {
      console.error('Query submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while submitting your query'
      console.warn('Proceeding despite error:', errorMessage)
    } finally {
      setIsSubmitting(false)
      onNext()
    }
  }

  /* -------------------------------- pieces -------------------------------- */

  const suggestionChips = (label: string) => (
    <div className="bi-in mt-[clamp(14px,3.5vh,32px)] w-full max-w-[640px] shrink-0">
      <p className="mb-2.5 text-center text-xs font-medium text-[#94a3b8]">{label}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            onClick={() => handleSuggestionClick(text)}
            className="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm text-[#334155] shadow-sm transition-all hover:border-[#3b82f6]/40 hover:text-[#1d4ed8] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )

  const heading = isRecording
    ? { title: 'Listening live…', sub: 'Speak naturally. Your words appear below in real-time as you speak.' }
    : { title: 'Tell us about your business', sub: 'Say what you do, where you are, and what you need. Edit anything below.' }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f8ff]">
      {/* Scoped styles */}
      <style>{`
        @keyframes bi-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes bi-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes bi-ring {
          0% { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes bi-bar {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        @keyframes bi-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bi-caret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .bi-orb-float { animation: bi-float 6s ease-in-out infinite; }
        .bi-orb-spin { animation: bi-spin 14s linear infinite; }
        .bi-orb-spin-slow { animation: bi-spin 22s linear infinite reverse; }
        .bi-ring { animation: bi-ring 2s ease-out infinite; }
        .bi-bar { animation: bi-bar 0.9s ease-in-out infinite; transform-origin: center; }
        .bi-in { animation: bi-in 0.4s ease-out both; }
        .bi-caret { animation: bi-caret 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bi-orb-float, .bi-orb-spin, .bi-orb-spin-slow, .bi-ring, .bi-bar, .bi-in, .bi-caret { animation: none; }
        }
      `}</style>

      {/* Top bar */}
      <div className="relative z-10 flex shrink-0 items-center justify-between px-6 py-3 sm:py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className="rounded-full bg-[#eff6ff] px-3.5 py-1.5 text-xs font-semibold text-[#1e40af]">
          Step 2 of 4
        </span>
        <button
                  onClick={handleContinue}
                  disabled={!hasText || isRecording || isSubmitting}
                  className={`flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 ${
                    hasText && !isRecording && !isSubmitting
                      ? 'bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white shadow-[0_4px_14px_rgba(59,130,246,0.35)] hover:scale-[1.02]'
                      : 'cursor-not-allowed bg-[#f1f5f9] text-[#cbd5e1]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Continue
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                </button>
      </div>

      {/* Stage: fills the remaining height, no page scroll */}
      <div className="relative z-10 min-h-0 flex-1 px-6 pb-5 sm:pb-6">
        <div className="mx-auto flex h-full w-full max-w-[720px] flex-col items-center justify-center">
          {/* Orb */}
          <div
            className={`relative flex shrink-0 items-center justify-center transition-all duration-500 ease-out ${
              composing
                ? 'mb-3 size-[clamp(48px,9vh,80px)]'
                : 'mb-[clamp(14px,3.5vh,32px)] size-[clamp(112px,26vh,208px)]'
            }`}
          >
            {isRecording && (
              <>
                <span className="bi-ring absolute inset-0 rounded-full bg-[#8b5cf6]/35" />
                <span className="bi-ring absolute inset-0 rounded-full bg-[#3b82f6]/35" style={{ animationDelay: '1s' }} />
              </>
            )}

            <div className="bi-orb-float relative size-full">
              <div
                className={`relative size-full overflow-hidden rounded-full transition-transform duration-500 ${
                  isRecording ? 'scale-105' : 'scale-100'
                }`}
                style={{
                  background:
                    'radial-gradient(circle at 30% 25%, #ffffff 0%, rgba(255,255,255,0) 35%), linear-gradient(135deg, #c7d2fe 0%, #e9d5ff 50%, #bfdbfe 100%)',
                  boxShadow:
                    '0 24px 60px -12px rgba(139,92,246,0.35), 0 8px 24px -8px rgba(59,130,246,0.3), inset 0 -12px 30px rgba(139,92,246,0.18)'
                }}
              >
                <div className="bi-orb-spin absolute inset-[-20%]">
                  <div className="absolute left-[12%] top-[14%] size-[55%] rounded-full bg-[#60a5fa] opacity-70 blur-2xl" />
                  <div className="absolute bottom-[8%] right-[10%] size-[50%] rounded-full bg-[#f0abfc] opacity-80 blur-2xl" />
                </div>
                <div className="bi-orb-spin-slow absolute inset-[-20%]">
                  <div className="absolute bottom-[18%] left-[18%] size-[40%] rounded-full bg-[#a78bfa] opacity-60 blur-2xl" />
                  <div className="absolute right-[18%] top-[16%] size-[35%] rounded-full bg-[#93c5fd] opacity-60 blur-2xl" />
                </div>
                <div className="absolute left-[16%] top-[8%] h-[30%] w-[50%] rotate-[-18deg] rounded-full bg-white/50 blur-xl" />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/60" />
              </div>
            </div>
          </div>

          {!composing ? (
            /* ------------------------------ Idle ------------------------------ */
            <>
              <h1 className="shrink-0 text-center text-[clamp(1.75rem,5vh,2.5rem)] font-semibold leading-tight tracking-tight">
                <span className="text-[#0f172a]">Hello, </span>
                <span className="text-[#94a3b8]">how can I help?</span>
              </h1>
              <p className="mt-2 max-w-md shrink-0 text-center text-sm text-[#64748b]">
                Tell me about your business and what you are looking for. You can speak or type.
              </p>

              <div className="bi-in mt-[clamp(14px,3.5vh,32px)] flex w-full max-w-[420px] shrink-0 flex-col gap-3 sm:flex-row">
                <button
                  onClick={startRecording}
                  className="group flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#2563eb] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 focus-visible:ring-offset-2"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="3" width="6" height="12" rx="3" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                  </svg>
                  Speak
                </button>
                <button
                  onClick={handleType}
                  className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-[#e2e8f0] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#334155] shadow-sm transition-all hover:border-[#3b82f6]/40 hover:text-[#1d4ed8] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 focus-visible:ring-offset-2"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
                    <path d="M6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M7.5 14h9" />
                  </svg>
                  Type
                </button>
              </div>

              {speechError && (
                <p role="alert" className="mt-3 shrink-0 text-center text-xs text-red-500">{speechError}</p>
              )}

              {suggestionChips('Not sure where to start? Try one of these')}
            </>
          ) : (
            /* ---------------------------- Composing --------------------------- */
            <>
              <h1
                className="shrink-0 text-center text-[clamp(1.25rem,3.4vh,1.875rem)] font-semibold leading-tight tracking-tight text-[#0f172a]"
                aria-live="polite"
              >
                {heading.title}
              </h1>
              <p className="mt-1.5 hidden max-w-md shrink-0 text-center text-sm text-[#64748b] [@media(min-height:720px)]:block">
                {heading.sub}
              </p>

              {/* Writing surface: shows exactly what is typed or spoken */}
              <div
                className={`bi-in mt-[clamp(12px,2.5vh,24px)] flex min-h-[140px] w-full max-w-[720px] flex-1 flex-col rounded-3xl border bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-colors focus-within:border-[#3b82f6] [@media(min-height:900px)]:max-h-[360px] max-h-[320px] ${
                  isRecording ? 'border-[#8b5cf6]/50' : 'border-[#e2e8f0]'
                }`}
              >
                <div className="flex shrink-0 items-center justify-between px-6 pt-4 text-xs font-medium text-[#64748b]">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${isRecording ? 'animate-pulse bg-[#8b5cf6]' : 'bg-[#cbd5e1]'}`} />
                    {isRecording ? 'Listening live…' : 'Your business and requirements'}
                  </div>

                  
                </div>

                <div className="min-h-0 flex-1 px-6 py-2.5">
                  {isRecording ? (
                    <div
                      ref={transcriptRef}
                      aria-label="Live transcript"
                      className="h-full overflow-y-auto whitespace-pre-wrap break-words text-base leading-relaxed text-[#0f172a] sm:text-[18px]"
                    >
                      {businessText || interimTranscript ? (
                        <>
                          {businessText}
                          {interimTranscript ? <span className="text-[#3b82f6]"> {interimTranscript}</span> : null}
                        </>
                      ) : (
                        <span className="text-[#cbd5e1]">Start speaking…</span>
                      )}
                      <span className="bi-caret ml-0.5 inline-block h-5 w-[2px] translate-y-1 rounded-full bg-[#8b5cf6]" />
                    </div>
                  ) : (
                    <textarea
                      ref={textareaRef}
                      value={businessText}
                      onChange={(e) => {
                        setBusinessText(e.target.value)
                        if (inputMode !== 'type') setInputMode('type')
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder={PLACEHOLDER}
                      aria-label="Describe your business and what you need"
                      className="h-full w-full resize-none bg-transparent text-base leading-relaxed text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none sm:text-[18px]"
                    />
                  )}
                </div>

                {/* Toolbar */}
                <div className="flex shrink-0 items-center justify-between border-t border-[#eef2f6] px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="pl-2 text-xs text-[#94a3b8]">
                      {wordCount} {wordCount === 1 ? 'word' : 'words'}
                    </span>

                    {/* Language selector */}
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      disabled={isRecording}
                      className="rounded-full border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs font-medium text-[#475569] hover:border-[#cbd5e1] focus:outline-none"
                      title="Speech Recognition Language"
                    >
                      <option value="en-IN">EN (English - India)</option>
                      <option value="en-US">EN (English - US)</option>
                      <option value="hi-IN">HI (हिन्दी)</option>
                      <option value="ta-IN">TA (தமிழ்)</option>
                      <option value="te-IN">TE (తెలుగు)</option>
                      <option value="bn-IN">BN (বাংলা)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasText && !isRecording && (
                      <button
                        onClick={handleClear}
                        className="rounded-full px-3 py-2 text-xs font-medium text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      onClick={handleMicClick}
                      aria-pressed={isRecording}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 ${
                        isRecording
                          ? 'bg-[#0f172a] text-white shadow-md'
                          : 'bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0]'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <span className="flex h-3.5 items-center gap-[3px]">
                            {[0, 1, 2, 3].map((i) => (
                              <span
                                key={i}
                                className="bi-bar h-full w-[3px] rounded-full bg-white"
                                style={{ animationDelay: `${i * 0.12}s` }}
                              />
                            ))}
                          </span>
                          Stop
                        </>
                      ) : (
                        <>
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="3" width="6" height="12" rx="3" />
                            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                          </svg>
                          {hasText ? 'Add by voice' : 'Speak'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {showSuggestions && suggestionChips('Need ideas? Start with one of these')}

              {/* Action row */}
              <div className="mt-4 flex w-full shrink-0 items-center justify-between gap-4">
                <p className="text-xs" aria-live="polite">
                  {submitError ? (
                    <span role="alert" className="text-red-500">{submitError}</span>
                  ) : speechError ? (
                    <span role="alert" className="text-red-500">{speechError}</span>
                  ) : hasText && !isRecording ? (
                    <span className="text-[#94a3b8]">Ctrl + Enter to continue</span>
                  ) : null}
                </p>
                
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}