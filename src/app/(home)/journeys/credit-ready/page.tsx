'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { CreditReadyProvider, useCreditReady } from './context/CreditReadyContext'
import CreditReadyHeader from './components/CreditReadyHeader'
import Icon from './components/Icon'

export default function CreditReadyPage() {
  return (
    <CreditReadyProvider>
      <CreditReadyContent />
    </CreditReadyProvider>
  )
}

function CreditReadyContent() {
  const router = useRouter()
  const { readinessAssessment } = useCreditReady()

  const handleBack = () => {
    // Navigate back to step 2 (business profile)
    // For now, this would go to dashboard or previous step
    router.push('/dashboard')
  }

  const handleExploreSchemes = () => {
    router.push('/journeys/schemes')
  }

  const handleAddDocuments = () => {
    // Navigate to dashboard with step 3 (Documents step) active
    router.push('/dashboard?step=3')
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-white via-[#fafbfc] to-[#f8f9fa]">
      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[15%] size-96 animate-pulse rounded-full bg-gradient-to-br from-[#3b82f6]/5 to-transparent blur-3xl" style={{ animationDuration: '8s' }} />
        <div className="absolute right-[15%] top-[40%] size-80 animate-pulse rounded-full bg-gradient-to-tl from-[#3b82f6]/4 to-transparent blur-3xl" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Scrollable Content */}
      <div className="relative flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1440px]">
          {/* Journey Header */}
          <CreditReadyHeader />

          {/* Main Content */}
          <div className="mt-5 space-y-5 pb-6">
            {/* Score Card */}
            <div className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              {/* Background decorative elements */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border-2 border-[#eff6ff] opacity-40" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full border-2 border-[#f0f9ff] opacity-30" />
              <div className="pointer-events-none absolute right-1/4 top-1/3 size-32 rounded-full bg-gradient-to-br from-[#3b82f6]/10 to-transparent blur-2xl" />
              <div className="pointer-events-none absolute left-1/3 bottom-1/4 size-40 rounded-full bg-gradient-to-tr from-[#60a5fa]/10 to-transparent blur-3xl" />
              
              {/* Geometric shapes */}
              <svg className="pointer-events-none absolute left-10 top-10 size-16 opacity-10" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
              <svg className="pointer-events-none absolute right-20 bottom-16 size-12 opacity-10" viewBox="0 0 100 100">
                <rect x="10" y="10" width="80" height="80" fill="none" stroke="#60a5fa" strokeWidth="2" transform="rotate(45 50 50)" />
              </svg>

              <div className="relative text-center">
                <h2 className="bg-gradient-to-r from-[#0f172a] to-[#3b82f6] bg-clip-text text-3xl font-bold text-transparent">
                  Your Credit Readiness
                </h2>
                
                {/* Score Gauge */}
                <div className="relative mx-auto my-10 size-56">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#60a5fa]/20 via-[#3b82f6]/20 to-[#2563eb]/20 blur-xl" />
                  
                  {/* Main gauge */}
                  <svg className="relative size-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      strokeDasharray="188.5 251.2"
                    />
                    {/* Progress arc - Blue gradient with glow */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="6"
                      strokeDasharray={`${(readinessAssessment.overallScore / 100) * 188.5} 251.2`}
                      strokeLinecap="round"
                      filter="url(#glow)"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                  
                  {/* Score display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="mb-1 rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-semibold text-[#1e40af] shadow-sm backdrop-blur-sm">
                      Moderate
                    </span>
                    <span className="bg-gradient-to-br from-[#0f172a] to-[#3b82f6] bg-clip-text text-5xl font-bold text-transparent">
                      {readinessAssessment.overallScore}
                    </span>
                    <span className="text-base font-medium text-[#64748b]">/100</span>
                  </div>
                </div>

                <div className="relative mx-auto max-w-md rounded-xl border border-[#e2e8f0] bg-white/80 p-4 backdrop-blur-sm">
                  <p className="text-sm leading-relaxed text-[#0f172a]">
                    You are <strong className="font-semibold text-[#3b82f6]">moderately credit ready</strong>. Complete the remaining steps to improve your score.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Strengths and Gaps in a row */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* Key Strengths */}
              <div className="rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-green-100 text-green-700">
                    <Icon name="check" className="size-4" />
                  </span>
                  <h3 className="text-lg font-semibold text-[#0f172a]">Key Strengths</h3>
                </div>
                <ul className="space-y-2.5">
                  {readinessAssessment.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-600 text-white">
                        <Icon name="check" className="size-3" />
                      </span>
                      <span className="text-sm text-[#0f172a]">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps to Address */}
              <div className="rounded-2xl border border-[#e2e8f0] bg-gradient-to-br from-red-50 to-rose-50 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-red-100 text-red-700">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-semibold text-[#0f172a]">Gaps to Address</h3>
                </div>
                <ul className="space-y-2.5">
                  {readinessAssessment.areasToStrengthen.map((gap, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-red-600 text-white">
                        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </span>
                      <span className="text-sm text-[#0f172a]">{gap}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleAddDocuments}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-5 py-3 text-sm font-semibold text-[#0f172a] shadow-sm transition-all hover:border-[#3b82f6] hover:bg-[#eff6ff]"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Add More Documents
                </button>
              </div>
            </div>

            {/* Next Steps CTA Card */}
            <section className="group relative overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all hover:border-[#3b82f6]/20 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              {/* Subtle Blue Accent Line */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#3b82f6] via-[#60a5fa] to-transparent" />

              <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#3b82f6] to-[#2563eb] shadow-[0_8px_20px_rgba(59,130,246,0.25)] transition-transform group-hover:scale-105">
                  <Icon name="schemes" className="size-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="mb-3 text-[26px] font-bold leading-tight tracking-[-0.03em] text-[#0f172a]">
                    Explore Government Schemes
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[#475569]">
                    Discover relevant government schemes and compliance requirements tailored to your business profile. Get personalized recommendations and action items.
                  </p>
                </div>
                <button
                  onClick={handleExploreSchemes}
                  className="group/btn flex shrink-0 items-center gap-3 rounded-xl bg-[#3b82f6] px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(59,130,246,0.2)] transition-all hover:bg-[#2563eb] hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)]"
                >
                  Explore Schemes
                  <Icon name="arrow" className="size-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
