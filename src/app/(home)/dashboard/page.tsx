'use client'

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOnboarding } from "../context/OnboardingContext"
import { Icon, type IconName } from "./_components/Icon"
import { BusinessInfoStep } from "./_components/BusinessInfoStep"
import { DocumentsStep } from "./_components/DocumentsStep"
import { ProfileReviewStep } from "./_components/ProfileReviewStep"

type OnboardingStep = "help-selection" | "business-info" | "documents" | "profile-review" | "journeys"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, completeBusinessInfo, completeBusinessProfile, unlockJourney } = useOnboarding()
  
  // Manage manual navigation separately from derived state
  const [manualStep, setManualStep] = useState<OnboardingStep | null>(null)
  const [businessText, setBusinessText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedHelp, setSelectedHelp] = useState<string[]>([])
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([])
  const [inputMode, setInputMode] = useState<'mic' | 'type' | 'upload' | null>(null)
  
  // Profile data from steps
  const [profileData, setProfileData] = useState({
    businessTitle: "",
    companyDescription: "",
    companyType: "llc",
    employeeCount: "1-20",
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    gstNumber: "",
    yearOfEstablishment: "",
  })

  // Handle step query parameter
  useEffect(() => {
    const stepParam = searchParams.get('step')
    if (stepParam === '3') {
      // Use setTimeout to defer setState call
      const timer = setTimeout(() => {
        setManualStep('documents')
        // Clear the URL parameter after setting the step
        router.replace('/dashboard', { scroll: false })
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [searchParams, router])

  // Derive currentStep from onboarding state or use manual override
  const currentStep: OnboardingStep = manualStep ?? (() => {
    if (!state.businessInfoProvided) return "journeys"
    if (!state.businessProfileCompleted) return "profile-review"
    return "journeys"
  })()

  // Use setManualStep instead of setCurrentStep for navigation
  const setCurrentStep = setManualStep

  const handleStartOnboarding = () => {
    setCurrentStep("help-selection")
  }
  
  const handleHelpSelection = (helpId: string) => {
    setSelectedHelp(prev => 
      prev.includes(helpId) ? prev.filter(id => id !== helpId) : [...prev, helpId]
    )
  }
  
  const handleNextFromHelpSelection = () => {
    setCurrentStep("business-info")
  }

  const handleBusinessInfoSubmit = () => {
    setCurrentStep("documents")
  }

  const handleDocumentsSubmit = () => {
    completeBusinessInfo(businessText)
    setCurrentStep("profile-review")
  }

  const handleContinueToReadiness = () => {
    completeBusinessProfile()
    // Unlock all journeys when business profile is completed
    unlockJourney('credit')
    unlockJourney('schemes')
    unlockJourney('market')
    router.push("/journeys/credit-ready")
  }

  // Help Selection Step
  if (currentStep === "help-selection") {
    const helpOptions = [
      {
        id: 'finance',
        title: 'Get Finance',
        description: 'Check credit readiness and explore loan options',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        icon: 'credit'
      },
      {
        id: 'schemes',
        title: 'Government Schemes',
        description: 'Find schemes that apply to your business',
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-600',
        icon: 'schemes'
      },
      {
        id: 'compliance',
        title: 'Compliance',
        description: 'Stay compliant with registrations, tax and regulatory requirements',
        iconBg: 'bg-green-50',
        iconColor: 'text-green-600',
        icon: 'building'
      },
      {
        id: 'markets',
        title: 'Markets & Tenders',
        description: 'Find buyers, government tenders and export opportunities',
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-600',
        icon: 'market'
      },
      {
        id: 'workforce',
        title: 'Hire & Manage Workforce',
        description: 'Find skilling, hiring and HR support',
        iconBg: 'bg-pink-50',
        iconColor: 'text-pink-600',
        icon: 'user'
      }
    ]
    //help section
      return (
        <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-gradient-to-br from-white via-[#fafbfc] to-[#f8f9fa]">
          {/* top bar  */}
            <div className="relative z-10  flex items-center justify-between px-6 py-3">
              <button
                onClick={() => setCurrentStep("journeys")}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
              >
                Cancel
              </button>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-4 py-1.5">
                  <span className="size-2 rounded-full bg-[#3b82f6]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1e40af]">
                    Step 1 of 4
                  </span>
                </div>
              <button
                onClick={handleNextFromHelpSelection}
                disabled={selectedHelp.length === 0}
                className={`flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40  ${
                  selectedHelp.length === 0
                    ? 'cursor-not-allowed bg-[#e2e8f0] text-[#94a3b8]'
                    : 'bg-[#3b82f6] text-white shadow-[0_4px_16px_rgba(59,130,246,0.2)] hover:bg-[#2563eb] hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)]'
                }`}
              >
                Continue
                <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          {/* Subtle Background Elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[20%] top-[10%] size-64 animate-pulse rounded-full bg-gradient-to-br from-[#3b82f6]/4 to-transparent blur-3xl" style={{ animationDuration: '8s' }} />
            <div className="absolute right-[15%] bottom-[20%] size-72 animate-pulse rounded-full bg-gradient-to-tl from-[#8b5cf6]/4 to-transparent blur-3xl" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          </div>

          {/* Scrollable Content Area */}
          <div className="relative flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
            
            <div className="mx-auto max-w-[1200px]">
              {/* Header */}
              <div className="mb-12">
                
                <h1 className="text-[40px] font-black leading-tight tracking-[-0.04em] text-[#0f172a]">
                  What would you like help with?
                </h1>
                <p className="mt-4 text-base text-[#64748b]">
                  Choose one or more. You can always come back later.
                </p>
              </div>

              {/* Options Grid */}
              <div className="mb-10 space-y-4">
                {helpOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleHelpSelection(option.id)}
                    className={`group relative flex w-full items-center gap-5 overflow-hidden rounded-[20px] border bg-white p-6 text-left transition-all duration-300 ${
                      selectedHelp.includes(option.id)
                        ? 'border-[#3b82f6] shadow-[0_8px_32px_rgba(59,130,246,0.15)]'
                        : 'border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)]'
                    }`}
                  >
                    {/* Selection Indicator */}
                    {selectedHelp.includes(option.id) && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#3b82f6] to-[#2563eb]" />
                    )}

                    {/* Icon */}
                    <div className={`flex size-16 shrink-0 items-center justify-center rounded-[16px] transition-all duration-300 ${
                      selectedHelp.includes(option.id) ? option.iconBg : 'bg-[#f8fafc]'
                    } ${!selectedHelp.includes(option.id) ? 'group-hover:bg-' + option.iconBg.split('bg-')[1] : ''}`}>
                      <Icon name={option.icon as IconName} className={`size-7 ${
                        selectedHelp.includes(option.id) ? option.iconColor : 'text-[#64748b]'
                      } transition-colors duration-300`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-[18px] font-bold text-[#0f172a]">{option.title}</h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-[#64748b]">{option.description}</p>
                    </div>

                    {/* Checkmark or Arrow */}
                    <div className="shrink-0">
                      {selectedHelp.includes(option.id) ? (
                        <div className="flex size-10 items-center justify-center rounded-full bg-[#3b82f6]">
                          <Icon name="check" className="size-5 text-white" />
                        </div>
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-[#f8fafc] transition-colors group-hover:bg-[#e2e8f0]">
                          <Icon name="arrow" className="size-5 text-[#94a3b8] transition-colors group-hover:text-[#64748b]" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selection Counter */}
              {selectedHelp.length > 0 && (
                <div className="mb-6 flex items-center justify-center gap-2 text-sm text-[#64748b]">
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#3b82f6] text-xs font-bold text-white">
                    {selectedHelp.length}
                  </div>
                  <span>
                    {selectedHelp.length === 1 ? 'option' : 'options'} selected
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Action Buttons at Bottom */}
          <div className="relative border-t border-[#e2e8f0] bg-white/95 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
            
          </div>
        </div>
      )
  }

  // Business Info Step (Step 1 of 3) - Redesigned
  if (currentStep === "business-info") {
    return (
      <BusinessInfoStep
        businessText={businessText}
        setBusinessText={setBusinessText}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        inputMode={inputMode}
        setInputMode={setInputMode}
        onBack={() => setCurrentStep("help-selection")}
        onNext={handleBusinessInfoSubmit}
      />
    )
  }

  // Documents Upload Step (Step 2 of 3)
  if (currentStep === "documents") {
    return (
      <DocumentsStep
        uploadedDocs={uploadedDocs}
        setUploadedDocs={setUploadedDocs}
        profileData={profileData}
        setProfileData={setProfileData}
        onBack={() => setCurrentStep("business-info")}
        onNext={handleDocumentsSubmit}
      />
    )
  }

  // Profile Review Step (Step 3 of 3)
  if (currentStep === "profile-review") {
    return (
      <ProfileReviewStep
        onBack={() => setCurrentStep("documents")}
        onNext={handleContinueToReadiness}
      />
    )
  }
  // Journeys Overview (Default State)
  return (
    <div className="relative h-full bg-gradient-to-br from-white via-[#fafbfc] to-[#f8f9fa]">
      {/* Animated Background Elements - Subtle */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs - Very Subtle */}
        <div className="absolute left-[10%] top-[15%] size-96 animate-pulse rounded-full bg-gradient-to-br from-[#3b82f6]/5 to-transparent blur-3xl" style={{ animationDuration: '8s' }} />
        <div className="absolute right-[15%] top-[40%] size-80 animate-pulse rounded-full bg-gradient-to-tl from-[#3b82f6]/4 to-transparent blur-3xl" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        
        {/* Flowing Lines - Very Light */}
        <svg className="absolute left-0 top-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 200 Q 400 100 800 300 T 1600 200" stroke="url(#line1)" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Grid Pattern - Very Subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1440px]">
          {/* Hero Section - Blue Accent */}
          <section className="relative mb-10 overflow-hidden rounded-[32px] border border-[#e2e8f0] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-10 shadow-[0_32px_64px_rgba(15,23,42,0.3)] backdrop-blur-xl sm:p-14">
            {/* Animated Background Pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* Flowing Lines in Hero */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="heroLine1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 50 Q 200 20 400 50 T 800 50" stroke="url(#heroLine1)" strokeWidth="2" fill="none" />
            </svg>

            {/* Decorative Elements */}
            <div className="absolute -right-20 -top-20 size-96 rounded-full border border-white/5" />
            <div className="absolute -right-8 top-8 size-64 rounded-full border border-[#3b82f6]/10" />
            <div className="absolute right-32 top-20 size-32 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-transparent blur-2xl" />
            
            <div className="relative z-10">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-xl">
                <Icon name="sparkles" className="size-5 text-[#60a5fa]" />
                <span className="text-sm font-bold tracking-wide text-white/90">MSME NAVIGATOR</span>
              </div>
              
              <h1 className="mb-5 max-w-3xl text-[48px] font-black leading-[1.1] tracking-[-0.05em] text-white sm:text-[56px]">
                Good morning, Vinod.
              </h1>
              
              <p className="max-w-2xl text-lg leading-relaxed text-white/80">
                {state.businessProfileCompleted 
                  ? "You&apos;re making great progress. Your personalized business journeys are ready to explore."
                  : "Complete your business profile to unlock personalized guidance tailored to your business needs."}
              </p>

              {/* Quick Stats */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#3b82f6]/20">
                    <Icon name="progress" className="size-5 text-[#60a5fa]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Journeys</p>
                    <p className="text-xl font-bold text-white">3</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#3b82f6]/20">
                    <Icon name="check" className="size-5 text-[#60a5fa]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Completion</p>
                    <p className="text-xl font-bold text-white">0%</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Onboarding CTA - Clean White with Blue Accent */}
          {!state.businessProfileCompleted && (
            <section className="group relative mb-10 overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all hover:border-[#3b82f6]/20 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              {/* Subtle Blue Accent Line */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#3b82f6] via-[#60a5fa] to-transparent" />

              <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#3b82f6] to-[#2563eb] shadow-[0_8px_20px_rgba(59,130,246,0.25)] transition-transform group-hover:scale-105">
                  <Icon name="sparkles" className="size-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-3 text-[26px] font-bold leading-tight tracking-[-0.03em] text-[#0f172a]">
                    Start Your Business Journey
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[#475569]">
                    Tell us about your business to unlock personalized journeys and guidance. We`&apos;`ll help you navigate credit readiness, government schemes, and market opportunities.
                  </p>
                </div>
                <button
                  onClick={handleStartOnboarding}
                  className="group/btn flex shrink-0 items-center gap-3 rounded-xl bg-[#3b82f6] px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(59,130,246,0.2)] transition-all hover:bg-[#2563eb] hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)]"
                >
                  Get started
                  <Icon name="arrow" className="size-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </section>
          )}

          {/* Journeys Section - Clean Design */}
          <section className="mb-12">
            {/* Section Header */}
            <div className="mb-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-4 py-1.5">
                <span className="size-2 rounded-full bg-[#3b82f6]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1e40af]">
                  Guided Pathways
                </span>
              </div>
              <h2 className="text-[36px] font-black tracking-[-0.04em] text-[#0f172a]">
                Your Business Journeys
              </h2>
              <p className="mt-3 text-base text-[#64748b]">
                Structured guidance to help you achieve your business goals
              </p>
            </div>

            {/* Journey Cards Grid */}
            <div className="grid gap-6 xl:grid-cols-3">
              <JourneyCard
                id="credit"
                letter="A"
                title="Credit Ready"
                description="Understand your funding readiness and prepare for meaningful lender conversations."
                icon="credit"
                progress={0}
                isLocked={!state.creditReadyUnlocked}
                accent="bg-gradient-to-r from-[#3b82f6] to-[#2563eb]"
                iconBg="bg-[#eff6ff] text-[#1e40af]"
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
                accent="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]"
                iconBg="bg-[#f5f3ff] text-[#6d28d9]"
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
                accent="bg-gradient-to-r from-[#06b6d4] to-[#0891b2]"
                iconBg="bg-[#ecfeff] text-[#0e7490]"
                onUnlock={() => router.push("/journeys/market-ready")}
              />
            </div>
          </section>
        </div>
      </div>
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

  //journey cards in the main section
  return (
    <article className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-[24px] border bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)] transition-all duration-500 ${
      !isLocked 
        ? "border-[#e2e8f0] hover:-translate-y-2 hover:border-[#cbd5e1] hover:shadow-[0_20px_48px_rgba(15,23,42,0.1)]" 
        : "border-[#f1f5f9]"
    }`}>
      {/* Subtle Top Border Accent */}
      <div className={`absolute left-0 top-0 h-1 w-full ${accent}`} />

      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[24px] bg-white/95 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-5 inline-flex size-20 items-center justify-center rounded-full bg-[#f8fafc]">
              <Icon name="lock" className="size-9 text-[#94a3b8]" />
            </div>
            <p className="text-sm font-bold text-[#475569]">Complete onboarding</p>
            <p className="mt-1 text-xs text-[#94a3b8]">to unlock this journey</p>
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="relative p-6 pb-0">
        <div className="mb-5 flex items-start justify-between">
          <div className={`flex size-14 items-center justify-center rounded-[16px] shadow-sm transition-all duration-500 ${iconBg} ${!isLocked ? "group-hover:scale-105" : ""}`}>
            <Icon name={icon} className="size-7" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f8fafc] px-3 py-1.5 text-xs font-semibold text-[#64748b]">
            <span className="size-1.5 rounded-full bg-[#cbd5e1]" />
            Not started
          </span>
        </div>

        {/* Journey Label */}
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#f8fafc] px-3 py-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
            Journey {letter}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative flex-1 px-6 py-3">
        <h3 className="mb-3 text-[20px] font-bold leading-tight tracking-[-0.03em] text-[#0f172a]">{title}</h3>
        <p className="text-[14px] leading-relaxed text-[#64748b]">{description}</p>
      </div>

      {/* Card Footer */}
      <div className="relative space-y-4 p-6 pt-0">
        {/* Progress Bar */}
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-[#64748b]">Progress</span>
            <span className="font-bold text-[#475569]">{progress}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#f1f5f9]">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${accent}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onUnlock}
          disabled={isLocked}
          className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition-all duration-300 ${
            isLocked
              ? "cursor-not-allowed bg-[#f8fafc] text-[#94a3b8]"
              : "bg-[#0f172a] text-white hover:bg-[#1e293b] hover:shadow-md"
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

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-white via-[#fafbfc] to-[#f8f9fa]">
        <div className="text-center">
          <div className="mb-4 inline-flex size-12 animate-spin items-center justify-center rounded-full border-4 border-[#e2e8f0] border-t-[#3b82f6]" />
          <p className="text-sm font-semibold text-[#64748b]">Loading...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
