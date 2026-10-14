'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Icon from '../components/Icon'

export default function ActionPlanPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const schemeId = searchParams.get('scheme')
  
  // Mock scheme data - in real app, fetch based on schemeId
  const scheme = {
    id: schemeId || 'scheme1',
    name: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
    provider: 'SIDBI / Ministry of MSME'
  }

  const [actionSteps, setActionSteps] = useState([
    {
      id: 1,
      title: 'Complete Documentation',
      description: 'Upload bank statements, balance sheet and other required documents.',
      status: 'active' as 'completed' | 'active' | 'pending',
      completedAt: null as string | null
    },
    {
      id: 2,
      title: 'Generate Project Report (DPR)',
      description: 'We\'ll help you create a bank-ready DPR.',
      status: 'pending' as 'completed' | 'active' | 'pending',
      completedAt: null as string | null
    },
    {
      id: 3,
      title: 'Apply for Selected Schemes',
      description: 'We\'ll prepare the applications.',
      status: 'pending' as 'completed' | 'active' | 'pending',
      completedAt: null as string | null
    },
    {
      id: 4,
      title: 'Connect with Lenders',
      description: 'Get introduced to suitable banks/NBFCs.',
      status: 'pending' as 'completed' | 'active' | 'pending',
      completedAt: null as string | null
    },
    {
      id: 5,
      title: 'Track Progress',
      description: 'Monitor your applications and get updates.',
      status: 'pending' as 'completed' | 'active' | 'pending',
      completedAt: null as string | null
    }
  ])

  const handleStartStep = (stepId: number) => {
    setActionSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status: 'active' as const }
        : step
    ))
  }

  const handleCompleteStep = (stepId: number) => {
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    setActionSteps(prev => prev.map((step, idx) => {
      if (step.id === stepId) {
        return { ...step, status: 'completed' as const, completedAt: now }
      }
      // Auto-activate next step
      if (step.id === stepId + 1) {
        return { ...step, status: 'active' as const }
      }
      return step
    }))
  }

  const completedCount = actionSteps.filter(s => s.status === 'completed').length
  const progressPercentage = (completedCount / actionSteps.length) * 100

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-white via-[#fafbfc] to-[#f8f9fa]">
      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[15%] size-96 animate-pulse rounded-full bg-gradient-to-br from-[#3b82f6]/5 to-transparent blur-3xl" style={{ animationDuration: '8s' }} />
        <div className="absolute right-[15%] top-[40%] size-80 animate-pulse rounded-full bg-gradient-to-tl from-[#3b82f6]/4 to-transparent blur-3xl" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Scrollable Content */}
      <div className="relative flex-1 overflow-y-auto px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[900px]">
          {/* Back Button */}
          <Link
            href="/journeys/schemes"
            className="mb-5 flex items-center gap-2 text-xs font-bold text-[#64748b] transition hover:text-[#3b82f6]"
          >
            <span className="rotate-180"><Icon name="arrow" className="size-4" /></span>
            Back to schemes
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-[#0f172a]">Your Personalised Action Plan</h1>
            <p className="mt-2 text-base text-[#64748b]">
              Complete these steps to get your loan and scheme benefits.
            </p>
          </div>

          {/* Scheme Info Card */}
          <div className="mb-8 rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-50">
                <Icon name="schemes" className="size-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[#0f172a]">{scheme.name}</h3>
                <p className="mt-1 text-sm text-[#64748b]">{scheme.provider}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-5 rounded-xl bg-[#f8fafc] p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-[#0f172a]">Overall Progress</span>
                <span className="font-bold text-[#3b82f6]">{completedCount} of {actionSteps.length} completed</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Steps */}
          <div className="relative space-y-4 pb-6">
            {/* Vertical Line */}
            <div className="absolute left-[23px] top-8 bottom-8 w-0.5 bg-[#e2e8f0]" />

            {actionSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex gap-4">
                  {/* Step Number Circle */}
                  <div className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-white text-lg font-bold shadow-sm ${
                    step.status === 'completed'
                      ? 'bg-[#10b981] text-white'
                      : step.status === 'active'
                      ? 'bg-[#3b82f6] text-white'
                      : 'bg-white text-[#94a3b8] border-[#e2e8f0]'
                  }`}>
                    {step.status === 'completed' ? (
                      <Icon name="check" className="size-6" />
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Step Content Card */}
                  <div className={`flex-1 rounded-2xl border p-5 transition-all ${
                    step.status === 'completed'
                      ? 'border-[#d1fae5] bg-[#f0fdf4]'
                      : step.status === 'active'
                      ? 'border-[#3b82f6] bg-white shadow-[0_4px_16px_rgba(59,130,246,0.1)]'
                      : 'border-[#e2e8f0] bg-white'
                  }`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${
                          step.status === 'completed' ? 'text-[#059669]' : 'text-[#0f172a]'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`mt-1 text-sm ${
                          step.status === 'completed' ? 'text-[#059669]' : 'text-[#64748b]'
                        }`}>
                          {step.description}
                        </p>

                        {step.status === 'completed' && step.completedAt && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-[#059669]">
                            <Icon name="check" className="size-3.5" />
                            <span>Completed on {step.completedAt}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0">
                        {step.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d1fae5] px-4 py-2 text-xs font-semibold text-[#059669]">
                            <Icon name="check" className="size-3.5" />
                            Completed
                          </span>
                        ) : step.status === 'active' ? (
                          <button
                            onClick={() => handleCompleteStep(step.id)}
                            className="rounded-xl bg-[#3b82f6] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#2563eb]"
                          >
                            Start
                          </button>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-[#f1f5f9] px-4 py-2 text-xs font-semibold text-[#64748b]">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estimated Timeline */}
          <div className="mt-8 rounded-2xl bg-[#eff6ff] p-6">
            <h3 className="text-lg font-bold text-[#0f172a]">Estimated Timeline</h3>
            <p className="mt-1 text-sm text-[#64748b]">
              4 – 8 weeks (depending on documentation and lender)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
