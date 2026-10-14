import React, { useState, useRef, useEffect } from "react"

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
  const [speechError, setSpeechError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<any>(null)
  const baseTextRef = useRef('')

  const hasText = businessText.trim().length > 0
  // Suggestions disappear as soon as the user types or records
  const showSuggestions = !hasText && !isRecording

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }, [businessText])

  // Stop recognition if the component unmounts
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort?.()
    }
  }, [])

  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSpeechError("Voice input isn't supported in this browser. Please type instead.")
      return
    }

    setSpeechError(null)
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-IN'

    // Keep whatever is already typed and append speech after it
    baseTextRef.current = businessText ? businessText.trimEnd() + ' ' : ''

    recognition.onresult = (event: any) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setBusinessText(baseTextRef.current + transcript)
    }

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setSpeechError("Microphone access is blocked. Allow it in your browser settings.")
      } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
        setSpeechError("Voice input stopped. Try again or type instead.")
      }
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setInputMode('mic')
    setIsRecording(true)
  }

  const stopRecording = () => {
    recognitionRef.current?.stop?.()
    setIsRecording(false)
  }

  const handleMicClick = () => {
    if (isRecording) stopRecording()
    else startRecording()
  }

  const handleSuggestionClick = (text: string) => {
    setInputMode('type')
    setBusinessText(text + ' ')
    requestAnimationFrame(() => {
      const el = textareaRef.current
      if (el) {
        el.focus()
        el.setSelectionRange(el.value.length, el.value.length)
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (hasText && !isRecording) onNext()
    }
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f8ff]">
      {/* Scoped styles for the orb */}
      <style>{`
        @keyframes bi-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
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
        .bi-orb-float { animation: bi-float 6s ease-in-out infinite; }
        .bi-orb-spin { animation: bi-spin 14s linear infinite; }
        .bi-orb-spin-slow { animation: bi-spin 22s linear infinite reverse; }
        .bi-ring { animation: bi-ring 2s ease-out infinite; }
        .bi-bar { animation: bi-bar 0.9s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .bi-orb-float, .bi-orb-spin, .bi-orb-spin-slow, .bi-ring, .bi-bar { animation: none; }
        }
      `}</style>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5">
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
      </div>

      {/* Center stage */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-6">
        {/* Orb */}
        <div className="relative mb-8 flex size-44 items-center justify-center sm:size-52">
          {isRecording && (
            <>
              <span className="bi-ring absolute inset-0 rounded-full bg-[#8b5cf6]/30" />
              <span className="bi-ring absolute inset-0 rounded-full bg-[#3b82f6]/30" style={{ animationDelay: '1s' }} />
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
              {/* Moving color blobs */}
              <div className="bi-orb-spin absolute inset-[-20%]">
                <div className="absolute left-[12%] top-[14%] size-[55%] rounded-full bg-[#60a5fa] opacity-70 blur-2xl" />
                <div className="absolute bottom-[8%] right-[10%] size-[50%] rounded-full bg-[#f0abfc] opacity-80 blur-2xl" />
              </div>
              <div className="bi-orb-spin-slow absolute inset-[-20%]">
                <div className="absolute bottom-[18%] left-[18%] size-[40%] rounded-full bg-[#a78bfa] opacity-60 blur-2xl" />
                <div className="absolute right-[18%] top-[16%] size-[35%] rounded-full bg-[#93c5fd] opacity-60 blur-2xl" />
              </div>
              {/* Glass highlight */}
              <div className="absolute left-[16%] top-[8%] h-[30%] w-[50%] rotate-[-18deg] rounded-full bg-white/50 blur-xl" />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/60" />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <h1 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl" aria-live="polite">
          {isRecording ? (
            <span className="text-[#0f172a]">Listening…</span>
          ) : (
            <>
              <span className="text-[#0f172a]">Hello, </span>
              <span className="text-[#94a3b8]">how can I help?</span>
            </>
          )}
        </h1>
        <p className="mt-3 max-w-md text-center text-sm text-[#64748b]">
          {isRecording
            ? 'Speak about your business. Tap the mic again when you are done.'
            : 'Tell me about your business by speaking or typing.'}
        </p>

        {/* Suggestions (hidden once typing or recording) */}
        <div
          className={`mt-8 w-full max-w-[640px] transition-all duration-300 ${
            showSuggestions ? 'max-h-48 opacity-100' : 'pointer-events-none max-h-0 overflow-hidden opacity-0'
          }`}
          aria-hidden={!showSuggestions}
        >
          <div className="flex flex-wrap justify-center gap-2.5">
            {SUGGESTIONS.map((text) => (
              <button
                key={text}
                onClick={() => handleSuggestionClick(text)}
                tabIndex={showSuggestions ? 0 : -1}
                className="rounded-full border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm text-[#334155] shadow-sm transition-all hover:border-[#3b82f6]/40 hover:text-[#1d4ed8] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="relative z-10 px-6 pb-8">
        <div className="mx-auto w-full max-w-[680px]">
          <div
            className={`flex items-end gap-2 rounded-[28px] border bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all focus-within:border-[#3b82f6] focus-within:shadow-[0_8px_30px_rgba(59,130,246,0.15)] ${
              isRecording ? 'border-[#8b5cf6]/50' : 'border-[#e2e8f0]'
            }`}
          >
            <textarea
              ref={textareaRef}
              value={businessText}
              onChange={(e) => {
                setBusinessText(e.target.value)
                if (inputMode !== 'type') setInputMode('type')
              }}
              onKeyDown={handleKeyDown}
              readOnly={isRecording}
              rows={1}
              placeholder={isRecording ? 'Your words will appear here…' : 'Describe your business…'}
              aria-label="Describe your business"
              className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-4 py-3 text-[15px] leading-snug text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none"
            />

            {/* Mic */}
            <button
              onClick={handleMicClick}
              aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
              aria-pressed={isRecording}
              className={`relative flex size-11 shrink-0 items-center justify-center rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 ${
                isRecording
                  ? 'bg-[#0f172a] text-white'
                  : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]'
              }`}
            >
              {isRecording ? (
                <span className="flex h-4 items-center gap-[3px]">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="bi-bar h-full w-[3px] rounded-full bg-white"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </span>
              ) : (
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="3" width="6" height="12" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
              )}
            </button>

            {/* Continue */}
            <button
              onClick={onNext}
              disabled={!hasText || isRecording}
              aria-label="Continue"
              className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 ${
                hasText && !isRecording
                  ? 'bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white shadow-[0_4px_14px_rgba(59,130,246,0.35)] hover:scale-105'
                  : 'cursor-not-allowed bg-[#f1f5f9] text-[#cbd5e1]'
              }`}
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* Helper / error line */}
          <div className="mt-3 h-5 text-center text-xs">
            {speechError ? (
              <span className="text-red-500" role="alert">{speechError}</span>
            ) : (
              <span className="text-[#94a3b8]">Enter to continue · Shift + Enter for a new line</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}