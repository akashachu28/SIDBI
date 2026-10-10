'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useOnboarding } from "../context/OnboardingContext"

type IconName = "dashboard" | "credit" | "schemes" | "market" | "sparkles" | "mic" | "upload" | "building" | "progress" | "arrow" | "check" | "clock" | "lock" | "info"

const iconPaths: Record<IconName, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  credit: (
    <>
      <path d="M4 18.5V9.8c0-.5.3-1 .8-1.2l6.5-3.8c.4-.2.9-.2 1.3 0l6.5 3.8c.5.2.8.7.8 1.2v8.7" />
      <path d="M2.5 19h19M8 11h8M8 15h8" />
    </>
  ),
  schemes: (
    <>
      <path d="M7 3.5h8.5L20 8v12.5H7z" />
      <path d="M15 3.5V8h5M10 12h7M10 16h7M4 7v13.5" />
    </>
  ),
  market: (
    <>
      <path d="M4 9.5h16l-1.3-5h-13zM5 9.5v10h14v-10" />
      <path d="M8 9.5v3M12 9.5v3M16 9.5v3M9 19.5v-4h6v4" />
    </>
  ),
  sparkles: <><path d="m12 3 1.3 4.2L17.5 9l-4.2 1.7L12 15l-1.3-4.3L6.5 9l4.2-1.8zM19 15l.6 2 1.9.8-1.9.8-.6 1.9-.6-1.9-1.9-.8 1.9-.8z" /></>,
  mic: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" /></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></>,
  building: <><path d="M4 21V6l8-3 8 3v15M8 9h2M14 9h2M8 13h2M14 13h2M9 21v-4h6v4" /></>,
  progress: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M9 11V7a3 3 0 0 1 6 0v4" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></>,
}

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

type OnboardingStep = "business-info" | "business-profile" | "journeys"

const DashboardPage = () => {
  const router = useRouter()
  const { state, completeWelcome, skipWelcome, completeBusinessInfo, completeBusinessProfile, unlockJourney } = useOnboarding()
  
  // Manage manual navigation separately from derived state
  const [manualStep, setManualStep] = useState<OnboardingStep | null>(null)
  const [businessText, setBusinessText] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  // Derive currentStep from onboarding state or use manual override
  const currentStep: OnboardingStep = manualStep ?? (() => {
    if (!state.businessInfoProvided) return "journeys"
    if (!state.businessProfileCompleted) return "business-profile"
    return "journeys"
  })()

  // Use setManualStep instead of setCurrentStep for navigation
  const setCurrentStep = setManualStep

  const handleStartOnboarding = () => {
    setCurrentStep("business-info")
  }

  const handleBusinessInfoSubmit = () => {
    if (businessText.trim()) {
      completeBusinessInfo(businessText)
      setCurrentStep("business-profile")
    }
  }

  const handleContinueToReadiness = () => {
    completeBusinessProfile()
    // Unlock all journeys when business profile is completed
    unlockJourney('credit')
    unlockJourney('schemes')
    unlockJourney('market')
    router.push("/journeys/credit-ready")
  }

  // Business Info Input Step
  if (currentStep === "business-info") {
    return (
      <div className="mx-auto max-w-[1200px]">
        {/* Progress Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#2c6b5c] text-xs font-bold text-white">1</span>
              <div className="h-0.5 w-8 rounded-full bg-[#2c6b5c]" />
              <span className="flex size-7 items-center justify-center rounded-full border-2 border-[#dfe3de] text-xs font-bold text-[#9aa19d]">2</span>
              <div className="h-0.5 w-8 rounded-full bg-[#e8ebe8]" />
              <span className="flex size-7 items-center justify-center rounded-full border-2 border-[#dfe3de] text-xs font-bold text-[#9aa19d]">3</span>
            </div>
            <span className="ml-2 text-xs font-semibold text-[#68716d]">Step 1 of 3</span>
          </div>
          <h1 className="text-[36px] font-bold leading-tight tracking-[-0.04em]">Tell us about your business</h1>
          <p className="mt-3 text-base text-[#68716d]">Help us understand your business so we can provide personalized guidance and unlock your journeys.</p>
        </div>

        {/* Input Options Grid */}
        <div className="mb-8 grid gap-5 lg:grid-cols-2">
          {/* Tap to Speak */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`group relative overflow-hidden rounded-[24px] border-2 p-8 transition-all duration-300 ${
              isRecording
                ? "border-[#2c6b5c] bg-gradient-to-br from-[#e1f0e9] to-[#d4e8dd] shadow-[0_8px_24px_rgba(44,107,92,0.15)]"
                : "border-[#dfe3de] bg-white hover:border-[#2c6b5c] hover:shadow-[0_12px_32px_rgba(30,45,39,0.08)]"
            }`}
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className={`mb-5 flex size-20 items-center justify-center rounded-full transition-all duration-300 ${isRecording ? "animate-pulse bg-[#2c6b5c] shadow-[0_0_0_12px_rgba(44,107,92,0.15)]" : "bg-[#edf3ef] text-[#2c6b5c] group-hover:scale-110"}`}>
                <Icon name="mic" className={`size-9 ${isRecording ? "text-white" : ""}`} />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.02em]">{isRecording ? "Recording..." : "Tap to speak"}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#68716d]">Tell us about your business verbally and we&apos;ll capture the details</p>
            </div>
            {isRecording && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2c6b5c]/20">
                <div className="h-full w-1/2 animate-pulse bg-[#2c6b5c]" />
              </div>
            )}
          </button>

          {/* Upload Document */}
          <label className="group relative cursor-pointer overflow-hidden rounded-[24px] border-2 border-dashed border-[#dfe3de] bg-gradient-to-br from-white to-[#fafbf9] p-8 transition-all duration-300 hover:border-[#2c6b5c] hover:shadow-[0_12px_32px_rgba(30,45,39,0.08)]">
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-[#edf3ef] text-[#2c6b5c] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2c6b5c] group-hover:text-white">
                <Icon name="upload" className="size-9" />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.02em]">Upload document</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#68716d]">Business profile, pitch deck, or registration documents</p>
              <span className="mt-4 inline-block rounded-full bg-[#f0f2ee] px-3 py-1 text-xs font-semibold text-[#68716d]">PDF, DOC, DOCX</span>
            </div>
          </label>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e8ebe8]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#f5f6f2] px-4 text-xs font-semibold uppercase tracking-wider text-[#9aa19d]">Or type here</span>
          </div>
        </div>

        {/* Text Input */}
        <div className="mb-8">
          <label className="mb-3 block text-sm font-bold tracking-[-0.01em]">Describe your business</label>
          <textarea
            value={businessText}
            onChange={(e) => setBusinessText(e.target.value)}
            placeholder="Example: Sharma Handlooms is a textile manufacturing business based in Jaipur, Rajasthan. We specialize in handwoven fabrics and traditional textiles, operating for 6 years with a focus on both domestic and export markets..."
            className="w-full rounded-2xl border border-[#dfe3de] bg-white p-5 text-sm leading-relaxed shadow-sm transition-all focus:border-[#2c6b5c] focus:outline-none focus:ring-4 focus:ring-[#2c6b5c]/10"
            rows={7}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-[#9aa19d]">
            <span>Include: business name, sector, products/services, location, years of operation</span>
            <span>{businessText.length} characters</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBusinessInfoSubmit}
            disabled={!businessText.trim() && !isRecording}
            className="group flex items-center gap-2 rounded-xl bg-[#183d35] px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(24,61,53,0.15)] transition-all hover:bg-[#245045] hover:shadow-[0_8px_20px_rgba(24,61,53,0.25)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-[0_4px_12px_rgba(24,61,53,0.15)]"
          >
            Continue to next step
            <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => setCurrentStep("journeys")}
            className="rounded-xl border-2 border-[#dfe3de] px-6 py-3 text-sm font-semibold text-[#68716d] transition-all hover:border-[#cbd4ce] hover:bg-[#fafbf9]"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  // Business Profile Review Step
  if (currentStep === "business-profile") {
    return (
      <div className="mx-auto max-w-[1200px]">
        {/* Progress Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-[#2c6b5c] text-xs font-bold text-white">
                <Icon name="check" className="size-4" />
              </span>
              <div className="h-0.5 w-8 rounded-full bg-[#2c6b5c]" />
              <span className="flex size-7 items-center justify-center rounded-full bg-[#2c6b5c] text-xs font-bold text-white">2</span>
              <div className="h-0.5 w-8 rounded-full bg-[#e8ebe8]" />
              <span className="flex size-7 items-center justify-center rounded-full border-2 border-[#dfe3de] text-xs font-bold text-[#9aa19d]">3</span>
            </div>
            <span className="ml-2 text-xs font-semibold text-[#68716d]">Step 2 of 3</span>
          </div>
          <h1 className="text-[36px] font-bold leading-tight tracking-[-0.04em]">Review your business profile</h1>
          <p className="mt-3 text-base text-[#68716d]">Here&apos;s what we understand about your business based on the information provided.</p>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* What We Understand */}
          <div className="rounded-[24px] border border-[#d4e8dd] bg-gradient-to-br from-white to-[#fafcf9] p-7 shadow-[0_4px_20px_rgba(44,107,92,0.06)]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-[-0.02em]">What we understand</h2>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e1f0e9] text-[#2c6b5c]">
                <Icon name="check" className="size-6" />
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Business name", value: "Sharma Handlooms" },
                { label: "Sector", value: "Textiles & handloom manufacturing" },
                { label: "Location", value: "Jaipur, Rajasthan" },
                { label: "Years of operation", value: "6 years" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e1f0e9] text-[#2c6b5c]">
                    <Icon name="check" className="size-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#24332e]">{item.label}</p>
                    <p className="mt-0.5 text-sm text-[#68716d]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Information Still Needed */}
          <div className="rounded-[24px] border border-[#f8d9a7] bg-gradient-to-br from-[#fffcf5] to-[#fff8ec] p-7 shadow-[0_4px_20px_rgba(197,138,53,0.06)]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-[-0.02em]">Information still needed</h2>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#fff4e2] text-[#c58a35]">
                <Icon name="info" className="size-6" />
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Bank statements", detail: "Last 6 months" },
                { label: "GST returns", detail: "Recent filing details" },
                { label: "Udyam registration", detail: "Registration number" },
                { label: "Annual turnover", detail: "Last financial year" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#fff4e2] text-[#c58a35]">
                    <Icon name="clock" className="size-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#24332e]">{item.label}</p>
                    <p className="mt-0.5 text-xs text-[#68716d]">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Step Info */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#e1f0e9] to-[#d4e8dd] p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2c6b5c] text-white">
              <Icon name="sparkles" className="size-5" />
            </div>
            <div>
              <p className="font-bold text-[#183d35]">Next step: Credit Ready Journey</p>
              <p className="mt-1 text-sm leading-relaxed text-[#2c6b5c]">
                We&apos;ll guide you through collecting the missing information, upload documents, and assess your funding readiness step by step.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleContinueToReadiness}
            className="group flex items-center gap-2 rounded-xl bg-[#183d35] px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(24,61,53,0.15)] transition-all hover:bg-[#245045] hover:shadow-[0_8px_20px_rgba(24,61,53,0.25)]"
          >
            Continue to Credit Ready
            <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => setCurrentStep("business-info")}
            className="rounded-xl border-2 border-[#dfe3de] px-6 py-3 text-sm font-semibold text-[#68716d] transition-all hover:border-[#cbd4ce] hover:bg-[#fafbf9]"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  // Journeys Overview (Default State)
  return (
    <div className="mx-auto max-w-[1440px]">
      {/* Hero Section */}
      <section className="relative mb-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#183d35] via-[#1f4a3e] to-[#183d35] px-8 py-10 text-white shadow-[0_20px_50px_rgba(24,61,53,0.2)] sm:px-12 sm:py-12">
        {/* Decorative Elements */}
        <div className="absolute -right-12 -top-20 size-72 rounded-full border border-white/8" />
        <div className="absolute -right-6 top-4 size-44 rounded-full border border-white/8" />
        <div className="absolute right-24 top-12 size-20 rounded-full bg-white/5 blur-2xl" />
        
        <div className="relative z-10">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <Icon name="sparkles" className="size-4" />
            MSME Navigator
          </span>
          <h1 className="mb-4 max-w-2xl text-[38px] font-bold leading-[1.1] tracking-[-0.04em] sm:text-[44px]">
            Good morning, Vinod.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/80">
            {state.businessProfileCompleted 
              ? "You're making great progress. Your personalized business journeys are ready to explore."
              : "Complete your business profile to unlock personalized guidance tailored to your business needs."}
          </p>
        </div>
      </section>

      {/* Onboarding CTA */}
      {!state.businessProfileCompleted && (
        <section className="mb-8 overflow-hidden rounded-[24px] border-2 border-[#2c6b5c] bg-gradient-to-br from-[#e1f0e9] via-[#e8f3ed] to-[#e1f0e9] p-8 shadow-[0_8px_28px_rgba(44,107,92,0.12)]">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-[20px] bg-[#2c6b5c] shadow-[0_8px_20px_rgba(44,107,92,0.25)]">
              <Icon name="sparkles" className="size-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold tracking-[-0.03em] text-[#183d35]">Start Your Onboarding</h2>
              <p className="text-sm leading-relaxed text-[#2c6b5c]">
                Tell us about your business to unlock personalized journeys and guidance. We&apos;ll help you navigate credit readiness, government schemes, and market opportunities.
              </p>
            </div>
            <button
              onClick={handleStartOnboarding}
              className="group flex shrink-0 items-center gap-2 rounded-xl bg-[#183d35] px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(24,61,53,0.15)] transition-all hover:bg-[#245045] hover:shadow-[0_8px_20px_rgba(24,61,53,0.25)]"
            >
              Get started
              <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      )}

      {/* Journeys Section */}
      <section className="mb-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#2c6b5c]">Guided Pathways</p>
            <h2 className="text-[26px] font-bold tracking-[-0.04em]">Your Business Journeys</h2>
            <p className="mt-2 text-sm text-[#68716d]">Structured guidance to help you achieve your business goals</p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <JourneyCard
            id="credit"
            letter="A"
            title="Credit Ready"
            description="Understand your funding readiness and prepare for meaningful lender conversations."
            icon="credit"
            progress={0}
            isLocked={!state.creditReadyUnlocked}
            accent="bg-[#2c6b5c]"
            iconBg="bg-[#e0eee9] text-[#24594d]"
            onUnlock={() => router.push("/journeys/credit-ready")}
          />
          <JourneyCard
            id="schemes"
            letter="B"
            title="Schemes & Compliance"
            description="Discover relevant schemes, assess eligibility and organise your next actions."
            icon="schemes"
            progress={0}
            isLocked={!state.schemesUnlocked}
            accent="bg-[#c58a35]"
            iconBg="bg-[#f8ebd8] text-[#9a6828]"
            onUnlock={() => router.push("/journeys/schemes")}
          />
          <JourneyCard
            id="market"
            letter="C"
            title="Market Ready"
            description="Explore opportunities and build a clear buyer or proposal readiness checklist."
            icon="market"
            progress={0}
            isLocked={!state.marketReadyUnlocked}
            accent="bg-[#68758f]"
            iconBg="bg-[#e8ebf1] text-[#515f79]"
            onUnlock={() => router.push("/journeys/market-ready")}
          />
        </div>
      </section>
    </div>
  )
}

function JourneyCard({
  id,
  letter,
  title,
  description,
  icon,
  progress,
  isLocked,
  accent,
  iconBg,
  onUnlock
}: {
  id: string
  letter: string
  title: string
  description: string
  icon: IconName
  progress: number
  isLocked: boolean
  accent: string
  iconBg: string
  onUnlock: () => void
}) {
  return (
    <article className={`group relative flex min-h-[320px] flex-col overflow-hidden rounded-[24px] border-2 bg-white p-6 shadow-[0_4px_20px_rgba(30,45,39,0.04)] transition-all duration-300 ${
      !isLocked 
        ? "border-[#e3e6e1] hover:-translate-y-2 hover:border-[#cbd4ce] hover:shadow-[0_20px_40px_rgba(30,45,39,0.12)]" 
        : "border-[#e8ebe8]"
    }`}>
      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[24px] bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-[3px]">
          <div className="text-center">
            <div className="mb-4 inline-flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#f1f2f3] to-[#e8ebe8] text-[#68716d] shadow-inner">
              <Icon name="lock" className="size-9" />
            </div>
            <p className="text-sm font-bold text-[#68716d]">Complete onboarding</p>
            <p className="mt-1 text-xs text-[#9aa19d]">to unlock this journey</p>
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className={`flex size-14 items-center justify-center rounded-[16px] shadow-sm transition-transform duration-300 ${iconBg} ${!isLocked ? "group-hover:scale-110" : ""}`}>
          <Icon name={icon} className="size-7" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f2f3] px-3 py-1.5 text-xs font-semibold tracking-tight text-[#67706c]">
          <span className="size-1.5 rounded-full bg-[#929a96]" />
          Not started
        </span>
      </div>

      {/* Card Content */}
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9aa19d]">Journey {letter}</span>
        </div>
        <h3 className="mb-3 text-[20px] font-bold leading-tight tracking-[-0.03em]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#727c77]">{description}</p>
      </div>

      {/* Card Footer */}
      <div className="mt-6 space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-[#8c9490]">Ready when you are</span>
            <span className="font-bold text-[#47534e]">0%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#e8ebe8]">
            <div className={`h-full rounded-full transition-all duration-500 ${accent}`} style={{ width: `${progress}%` }} />
          </div>
        </div>

        <button
          onClick={onUnlock}
          disabled={isLocked}
          className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
            isLocked
              ? "cursor-not-allowed bg-[#f1f2f3] text-[#9aa19d]"
              : "bg-[#182f29] text-white shadow-[0_4px_12px_rgba(24,47,41,0.15)] hover:bg-[#245045] hover:shadow-[0_8px_20px_rgba(24,47,41,0.25)]"
          }`}
        >
          {isLocked ? (
            <>
              <Icon name="lock" className="size-4" />
              Locked
            </>
          ) : (
            <>
              Start journey
              <Icon name="arrow" className="size-4 transition-transform group-hover/btn:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </article>
  )
}

export default DashboardPage
