'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SchemesProvider, useSchemes } from './context/SchemesContext'
import SchemesHeader from './components/SchemesHeader'
import Icon from './components/Icon'

interface Scheme {
  id: string
  name: string
  provider: string
  type: string
  relevanceScore: number
  shortDescription: string
  category: 'central' | 'state' | 'sidbi'
  iconBg: string
  iconColor: string
}

export default function SchemesPage() {
  return (
    <SchemesProvider>
      <SchemesContent />
    </SchemesProvider>
  )
}

function SchemesContent() {
  const router = useRouter()
  const { schemes } = useSchemes()
  const [activeFilter, setActiveFilter] = useState<'all' | 'central' | 'state' | 'sidbi'>('all')
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'saved' | 'action-plans'>('list')
  const [savedSchemes, setSavedSchemes] = useState<string[]>([])
  const [actionPlanSchemes, setActionPlanSchemes] = useState<string[]>([])

  // Listen for header button clicks
  React.useEffect(() => {
    const handleShowSaved = () => setViewMode('saved')
    const handleShowActionPlans = () => setViewMode('action-plans')
    
    window.addEventListener('showSavedSchemes', handleShowSaved)
    window.addEventListener('showActionPlans', handleShowActionPlans)
    
    return () => {
      window.removeEventListener('showSavedSchemes', handleShowSaved)
      window.removeEventListener('showActionPlans', handleShowActionPlans)
    }
  }, [])

  // Mock data for additional schemes
  const allSchemes: Scheme[] = [
    {
      id: 'scheme1',
      name: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
      provider: 'SIDBI / Ministry of MSME',
      type: 'Credit guarantee',
      relevanceScore: 88,
      shortDescription: 'Up to ₹2 crore | Collateral free',
      category: 'central',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'scheme2',
      name: 'Technology Upgradation Fund Scheme (TUFS)',
      provider: 'Ministry of Textiles',
      type: 'Subsidy',
      relevanceScore: 75,
      shortDescription: 'Interest subvention',
      category: 'central',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 'scheme3',
      name: 'PM Vishwakarma',
      provider: 'Ministry of MSME',
      type: 'Support program',
      relevanceScore: 70,
      shortDescription: 'Support for artisans and MSMEs',
      category: 'central',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      id: 'scheme4',
      name: 'Maharashtra MSME Policy 2023',
      provider: 'Maharashtra Government',
      type: 'Subsidy',
      relevanceScore: 85,
      shortDescription: 'Capital subsidy, interest subsidy',
      category: 'state',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      id: 'scheme5',
      name: 'Rajasthan Investment Promotion Scheme',
      provider: 'Rajasthan Government',
      type: 'Incentive',
      relevanceScore: 68,
      shortDescription: 'Investment incentives for industries',
      category: 'state',
      iconBg: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      id: 'scheme6',
      name: 'SIDBI Make in India Soft Loan Fund',
      provider: 'SIDBI',
      type: 'Loan facility',
      relevanceScore: 75,
      shortDescription: 'Soft loans for manufacturing MSMEs',
      category: 'sidbi',
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-600'
    },
    {
      id: 'scheme7',
      name: 'Credit Linked Capital Subsidy Scheme',
      provider: 'Ministry of MSME',
      type: 'Subsidy',
      relevanceScore: 82,
      shortDescription: 'Technology upgradation subsidy',
      category: 'central',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      id: 'scheme8',
      name: 'SIDBI Growth Fund',
      provider: 'SIDBI',
      type: 'Fund',
      relevanceScore: 72,
      shortDescription: 'Growth capital for MSMEs',
      category: 'sidbi',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ]

  const getMatchBadge = (score: number) => {
    if (score >= 80) return { label: 'High Match', color: 'bg-[#d4f4e0] text-[#1e7e4f]' }
    if (score >= 60) return { label: 'Medium Match', color: 'bg-[#fef3e0] text-[#b76e00]' }
    return { label: 'Low Match', color: 'bg-[#f0f1f0] text-[#64748b]' }
  }

  const filterCounts = {
    all: allSchemes.length,
    central: allSchemes.filter(s => s.category === 'central').length,
    state: allSchemes.filter(s => s.category === 'state').length,
    sidbi: allSchemes.filter(s => s.category === 'sidbi').length
  }

  const filteredSchemes = activeFilter === 'all' 
    ? allSchemes 
    : allSchemes.filter(s => s.category === activeFilter)

  const handleSchemeClick = (schemeId: string) => {
    setSelectedSchemeId(schemeId)
  }

  const handleBackToList = () => {
    setSelectedSchemeId(null)
    setViewMode('list')
  }
  
  const handleSaveScheme = (schemeId: string) => {
    setSavedSchemes(prev => 
      prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]
    )
  }
  
  const handleAddToActionPlan = (schemeId: string) => {
    setActionPlanSchemes(prev => 
      prev.includes(schemeId) ? prev : [...prev, schemeId]
    )
  }

  // If a scheme is selected, show detail page
  if (selectedSchemeId) {
    const selectedScheme = allSchemes.find(s => s.id === selectedSchemeId)
    if (selectedScheme) {
      return (
        <SchemeDetailPage 
          scheme={selectedScheme} 
          onBack={handleBackToList}
          isSaved={savedSchemes.includes(selectedSchemeId)}
          isInActionPlan={actionPlanSchemes.includes(selectedSchemeId)}
          onSave={() => handleSaveScheme(selectedSchemeId)}
          onAddToActionPlan={() => handleAddToActionPlan(selectedSchemeId)}
        />
      )
    }
  }

  // Saved Schemes View
  if (viewMode === 'saved') {
    const saved = allSchemes.filter(s => savedSchemes.includes(s.id))
    
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
          {/* Back Button */}
          <button
            onClick={() => setViewMode('list')}
            className="mb-5 flex items-center gap-2 text-xs font-bold text-[#64748b] transition hover:text-[#3b82f6]"
          >
            <span className="rotate-180"><Icon name="arrow" className="size-4" /></span>
            Back to schemes
          </button>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-[#0f172a]">Saved Schemes</h1>
            <p className="mt-2 text-base text-[#64748b]">
              {saved.length === 0 ? 'No saved schemes yet.' : `You have ${saved.length} saved scheme${saved.length !== 1 ? 's' : ''}.`}
            </p>
          </div>

          {/* Content */}
          <div className="pb-6">
            {saved.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[20px] border border-[#e2e8f0] bg-white p-12 text-center shadow-sm">
                <div className="mb-4 grid size-16 place-items-center rounded-full bg-[#eff6ff]">
                  <svg className="size-8 text-[#3b82f6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#0f172a]">No saved schemes yet</h3>
                <p className="mt-1 text-sm text-[#64748b]">Save schemes you&apos;re interested in for easy access later.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {saved.map(scheme => {
                  const match = getMatchBadge(scheme.relevanceScore)
                  return (
                    <div
                      key={scheme.id}
                      className="flex items-center gap-4 rounded-[18px] border border-[#e2e8f0] bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <button
                        onClick={() => handleSchemeClick(scheme.id)}
                        className="flex flex-1 items-center gap-4 text-left transition-all hover:opacity-70"
                      >
                        <div className={`grid size-14 shrink-0 place-items-center rounded-xl ${scheme.iconBg}`}>
                          <Icon name="schemes" className={`size-6 ${scheme.iconColor}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[15px] font-semibold text-[#0f172a]">{scheme.name}</h3>
                          <p className="mt-0.5 text-[13px] text-[#64748b]">{scheme.shortDescription}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${match.color}`}>
                          {match.label}
                        </span>
                      </button>
                      <button
                        onClick={() => handleSaveScheme(scheme.id)}
                        className="shrink-0 rounded-lg border border-[#e2e8f0] p-2.5 text-[#64748b] transition-all hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                        title="Remove from saved"
                      >
                        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
  }

  // Action Plans View
  if (viewMode === 'action-plans') {
    const actionPlans = allSchemes.filter(s => actionPlanSchemes.includes(s.id))
    
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
            {/* Back Button */}
            <button
              onClick={() => setViewMode('list')}
              className="mb-5 flex items-center gap-2 text-xs font-bold text-[#64748b] transition hover:text-[#3b82f6]"
            >
              <span className="rotate-180"><Icon name="arrow" className="size-4" /></span>
              Back to schemes
            </button>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-[32px] font-bold text-[#0f172a]">Action Plans</h1>
              <p className="mt-2 text-base text-[#64748b]">
                {actionPlans.length === 0 ? 'No schemes in action plan yet.' : `You have ${actionPlans.length} scheme${actionPlans.length !== 1 ? 's' : ''} in your action plan.`}
              </p>
            </div>

            {/* Content */}
            <div className="pb-6">
              {actionPlans.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[20px] border border-[#e2e8f0] bg-white p-12 text-center shadow-sm">
                  <div className="mb-4 grid size-16 place-items-center rounded-full bg-[#eff6ff]">
                    <Icon name="progress" className="size-8 text-[#3b82f6]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a]">No action plans yet</h3>
                  <p className="mt-1 text-sm text-[#64748b]">Add schemes to your action plan to track your progress.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {actionPlans.map(scheme => {
                    const match = getMatchBadge(scheme.relevanceScore)
                    // Mock progress data - in real app, fetch from backend
                    const totalActions = 5
                    // Use scheme ID hash for deterministic "random" value (for demo)
                    const completedActions = parseInt(scheme.id.slice(-1)) % (totalActions + 1)
                    const progressPercentage = (completedActions / totalActions) * 100
                    const hasStarted = completedActions > 0
                    
                    return (
                      <div
                        key={scheme.id}
                        className="rounded-[18px] border border-[#e2e8f0] bg-white p-5 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="mb-4 flex items-start gap-4">
                          <div className={`grid size-14 shrink-0 place-items-center rounded-xl ${scheme.iconBg}`}>
                            <Icon name="schemes" className={`size-6 ${scheme.iconColor}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[15px] font-semibold text-[#0f172a]">{scheme.name}</h3>
                            <p className="mt-0.5 text-[13px] text-[#64748b]">{scheme.shortDescription}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${match.color}`}>
                            {match.label}
                          </span>
                        </div>

                        {/* Progress Section */}
                        <div className="space-y-3 border-t border-[#e2e8f0] pt-4">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">Action Plan Progress</p>
                            <span className="text-xs font-bold text-[#3b82f6]">{completedActions} of {totalActions} completed</span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="h-2 overflow-hidden rounded-full bg-[#f1f5f9]">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] transition-all"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>

                          {/* Completed Actions Summary */}
                          {completedActions > 0 && (
                            <div className="flex items-center gap-2 text-xs text-[#10b981]">
                              <Icon name="check" className="size-4" />
                              <span>Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            onClick={() => router.push(`/journeys/schemes/action-plans?scheme=${scheme.id}`)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3b82f6] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#2563eb]"
                          >
                            {hasStarted ? (
                              <>
                                <Icon name="progress" className="size-4" />
                                Resume Action Plan
                              </>
                            ) : (
                              <>
                                <Icon name="arrow" className="size-4" />
                                Start Action Plan
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleSchemeClick(scheme.id)}
                            className="rounded-xl border border-[#e2e8f0] px-5 py-2.5 text-sm font-semibold text-[#64748b] transition-all hover:border-[#3b82f6] hover:bg-[#eff6ff]"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => setActionPlanSchemes(prev => prev.filter(id => id !== scheme.id))}
                            className="rounded-xl border border-[#e2e8f0] p-2.5 text-[#64748b] transition-all hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                            title="Remove from action plan"
                          >
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
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
          <SchemesHeader savedCount={savedSchemes.length} actionPlanCount={actionPlanSchemes.length} />

          <div className="mt-5 space-y-5 pb-6">
            {/* Header Section */}
            <div>
              <h2 className="text-[26px] font-bold text-[#0f172a]">Schemes You May Be Eligible For</h2>
              <p className="mt-1.5 text-sm text-[#64748b]">Based on your business profile and goals.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveFilter('all')}
                className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
                    : 'border border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#3b82f6] hover:bg-[#eff6ff]'
                }`}
              >
                All ({filterCounts.all})
              </button>
              <button
                onClick={() => setActiveFilter('central')}
                className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all ${
                  activeFilter === 'central'
                    ? 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
                    : 'border border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#3b82f6] hover:bg-[#eff6ff]'
                }`}
              >
                Central ({filterCounts.central})
              </button>
              <button
                onClick={() => setActiveFilter('state')}
                className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all ${
                  activeFilter === 'state'
                    ? 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
                    : 'border border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#3b82f6] hover:bg-[#eff6ff]'
                }`}
              >
                State ({filterCounts.state})
              </button>
              <button
                onClick={() => setActiveFilter('sidbi')}
                className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all ${
                  activeFilter === 'sidbi'
                    ? 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
                    : 'border border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#3b82f6] hover:bg-[#eff6ff]'
                }`}
              >
                SIDBI ({filterCounts.sidbi})
              </button>
            </div>

            {/* Schemes List */}
            <div className="space-y-3">
              {filteredSchemes.map(scheme => {
                const match = getMatchBadge(scheme.relevanceScore)
                return (
                  <button
                    key={scheme.id}
                    onClick={() => handleSchemeClick(scheme.id)}
                    className="flex w-full items-center gap-4 rounded-[18px] border border-[#e2e8f0] bg-white p-4 text-left shadow-sm transition-all hover:border-[#3b82f6] hover:shadow-md"
                  >
                    <div className={`grid size-14 shrink-0 place-items-center rounded-xl ${scheme.iconBg}`}>
                      <Icon name="schemes" className={`size-6 ${scheme.iconColor}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-semibold text-[#0f172a]">{scheme.name}</h3>
                      <p className="mt-0.5 text-[13px] text-[#64748b]">{scheme.shortDescription}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${match.color}`}>
                      {match.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SchemeDetailPage({ 
  scheme, 
  onBack, 
  isSaved = false,
  isInActionPlan = false,
  onSave,
  onAddToActionPlan
}: { 
  scheme: Scheme
  onBack: () => void
  isSaved?: boolean
  isInActionPlan?: boolean
  onSave?: () => void
  onAddToActionPlan?: () => void
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'benefits' | 'documents'>('overview')

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
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-5 flex items-center gap-2 text-xs font-bold text-[#64748b] transition hover:text-[#3b82f6]"
          >
            <span className="rotate-180"><Icon name="arrow" className="size-4" /></span>
            Back to schemes
          </button>

          {/* Scheme Header */}
          <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className={`grid size-16 shrink-0 place-items-center rounded-xl ${scheme.iconBg}`}>
                <Icon name="schemes" className={`size-7 ${scheme.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-[24px] font-bold text-[#0f172a]">{scheme.name}</h1>
                <p className="mt-1 text-sm text-[#64748b]">{scheme.provider}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            {(['overview', 'eligibility', 'benefits', 'documents'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2 text-sm font-semibold capitalize shadow-sm transition-all ${
                  activeTab === tab
                    ? 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
                    : 'border border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#3b82f6] hover:bg-[#eff6ff]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-5 space-y-4 pb-6">
            {activeTab === 'overview' && (
              <div className="space-y-5">
                <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#0f172a]">Scheme Overview</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#64748b]">
                    Provides credit guarantee for collateral-free loans to MSMEs for term loans and working capital.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eff6ff] text-[#3b82f6]">
                        <Icon name="credit" className="size-4.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">Maximum Loan Amount</p>
                        <p className="mt-0.5 text-sm text-[#64748b]">Up to ₹2 crore</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eff6ff] text-[#3b82f6]">
                        <Icon name="building" className="size-4.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">Eligible Entities</p>
                        <p className="mt-0.5 text-sm text-[#64748b]">Micro and Small Enterprises (Udyam registered)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eff6ff] text-[#3b82f6]">
                        <Icon name="building" className="size-4.5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">Lending Institutions</p>
                        <p className="mt-0.5 text-sm text-[#64748b]">Banks, NBFCs, SIDBI, select financial institutions</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eligibility Badge */}
                <div className="rounded-[20px] border border-[#c7dff2] bg-gradient-to-br from-[#eff6ff] to-white p-5 shadow-sm">
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#3b82f6] text-white">
                      <Icon name="check" className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[#0f172a]">Your Eligibility</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748b]">
                        Based on your profile, you appear to be eligible for this scheme.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'eligibility' && (
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0f172a]">Eligibility Criteria</h2>
                <ul className="mt-5 space-y-3.5">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#3b82f6] text-white">
                      <Icon name="check" className="size-3" />
                    </span>
                    <span className="text-sm text-[#0f172a]">Valid Udyam registration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#3b82f6] text-white">
                      <Icon name="check" className="size-3" />
                    </span>
                    <span className="text-sm text-[#0f172a]">Micro or Small Enterprise classification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#3b82f6] text-white">
                      <Icon name="check" className="size-3" />
                    </span>
                    <span className="text-sm text-[#0f172a]">Credit facility up to ₹5 crore</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0f172a]">Key Benefits</h2>
                <ul className="mt-5 space-y-3.5">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#3b82f6]" />
                    <span className="text-sm text-[#0f172a]">Collateral-free credit guarantee</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#3b82f6]" />
                    <span className="text-sm text-[#0f172a]">Covers both term loans and working capital</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#3b82f6]" />
                    <span className="text-sm text-[#0f172a]">No third-party guarantee required</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0f172a]">Required Documents</h2>
                <ul className="mt-5 space-y-3.5">
                  <li className="flex items-start gap-3">
                    <Icon name="document" className="mt-0.5 size-4 shrink-0 text-[#64748b]" />
                    <span className="text-sm text-[#0f172a]">Udyam registration certificate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="document" className="mt-0.5 size-4 shrink-0 text-[#64748b]" />
                    <span className="text-sm text-[#0f172a]">KYC documents (PAN, Aadhaar, address proof)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="document" className="mt-0.5 size-4 shrink-0 text-[#64748b]" />
                    <span className="text-sm text-[#0f172a]">Project report for loan purpose</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="document" className="mt-0.5 size-4 shrink-0 text-[#64748b]" />
                    <span className="text-sm text-[#0f172a]">Financial statements (last 2 years)</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onSave}
                className={`flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-semibold shadow-sm transition-all ${
                  isSaved
                    ? 'border-[#3b82f6] bg-[#3b82f6] text-white hover:bg-[#2563eb]'
                    : 'border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#3b82f6] hover:bg-[#eff6ff]'
                }`}
              >
                <svg className="size-4" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={onAddToActionPlan}
                disabled={isInActionPlan}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition-all ${
                  isInActionPlan
                    ? 'cursor-not-allowed border-2 border-[#e2e8f0] bg-[#f8fafc] text-[#64748b]'
                    : 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(139,92,246,0.15)] hover:bg-[#2563eb]'
                }`}
              >
                {isInActionPlan ? (
                  <>
                    <Icon name="check" className="size-4" />
                    Added to Action Plan
                  </>
                ) : (
                  <>
                    Add to Action Plan
                    <Icon name="arrow" className="size-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
