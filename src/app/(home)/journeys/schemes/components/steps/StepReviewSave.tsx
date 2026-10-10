'use client'

import React from 'react'
import { useSchemes } from '../../context/SchemesContext'
import Icon from '../Icon'

export default function StepReviewSave() {
  const { 
    businessObjective, 
    schemes, 
    eligibilityCriteria,
    progressSummary,
    nextActions,
    humanAssistance,
    showNotice
  } = useSchemes()

  const handleExport = () => {
    showNotice('Export functionality will be implemented')
  }

  const handleSave = () => {
    showNotice('Progress saved successfully')
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Review & save your progress</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Review your journey summary including discovered schemes, assessments, and next actions. Save progress or export a summary report.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        {/* Business Context */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <p className="mb-4 text-xs font-bold text-[#2d3b35]">Business Context</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Business Name</p>
              <p className="text-[11px] text-[#2d3b35]">{businessObjective.businessName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Location</p>
              <p className="text-[11px] text-[#2d3b35]">{businessObjective.location}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Sector</p>
              <p className="text-[11px] text-[#2d3b35]">{businessObjective.sector}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Business Stage</p>
              <p className="text-[11px] text-[#2d3b35]">{businessObjective.businessStage}</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-gradient-to-br from-[#fafbf9] to-white p-5">
          <p className="mb-4 text-xs font-bold text-[#2d3b35]">Progress Overview</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#c6e0d8] bg-[#e4f0ea] p-4 text-center">
              <div className="text-[26px] font-bold text-[#2c6b5c]">{progressSummary.totalSchemesFound}</div>
              <div className="text-[9px] text-[#616c67]">Schemes Discovered</div>
            </div>
            <div className="rounded-xl border border-[#c6e0d8] bg-[#e4f0ea] p-4 text-center">
              <div className="text-[26px] font-bold text-[#2c6b5c]">{progressSummary.likelyRelevant}</div>
              <div className="text-[9px] text-[#616c67]">Likely Relevant</div>
            </div>
            <div className="rounded-xl border border-[#c6e0d8] bg-[#e4f0ea] p-4 text-center">
              <div className="text-[26px] font-bold text-[#2c6b5c]">{progressSummary.assessmentComplete}</div>
              <div className="text-[9px] text-[#616c67]">Fully Assessed</div>
            </div>
          </div>
        </div>

        {/* Schemes Summary */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <p className="mb-4 text-xs font-bold text-[#2d3b35]">Discovered Schemes</p>
          <div className="space-y-3">
            {schemes.map((scheme) => {
              const schemeCriteria = eligibilityCriteria.filter(c => c.schemeId === scheme.id)
              const matchCount = schemeCriteria.filter(c => c.result === 'matches').length
              const unknownCount = schemeCriteria.filter(c => c.result === 'unknown').length

              return (
                <div key={scheme.id} className="rounded-xl border border-[#e9ece8] bg-[#fafbf9] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#2d3b35]">{scheme.name}</h3>
                      <p className="mt-1 text-[10px] text-[#8a928e]">{scheme.provider}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                          scheme.eligibilityStatus === 'likely-relevant' ? 'bg-[#e4f0ea] text-[#2c6b5c]' :
                          scheme.eligibilityStatus === 'does-not-match' ? 'bg-[#f8d8d6] text-[#c64536]' :
                          scheme.eligibilityStatus === 'insufficient-information' ? 'bg-[#e9eaf7] text-[#5a4fb3]' :
                          'bg-[#f7ead7] text-[#aa742c]'
                        }`}>
                          {scheme.eligibilityStatus.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </span>
                        <span className="rounded-full bg-[#f0f2ee] px-2 py-0.5 text-[9px] font-semibold text-[#68736e]">
                          {matchCount} matches
                        </span>
                        {unknownCount > 0 && (
                          <span className="rounded-full bg-[#f7ead7] px-2 py-0.5 text-[9px] font-semibold text-[#aa742c]">
                            {unknownCount} unknowns
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#2c6b5c]">{scheme.relevanceScore}%</div>
                      <div className="text-[9px] text-[#8a928e]">Relevance</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Next Actions Summary */}
        {nextActions.length > 0 && (
          <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
            <p className="mb-4 text-xs font-bold text-[#2d3b35]">Next Actions ({nextActions.slice(0, 5).length} of {nextActions.length})</p>
            <div className="space-y-2">
              {nextActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between rounded-xl border border-[#e9ece8] bg-[#fafbf9] p-3">
                  <div className="flex-1">
                    <span className="text-[11px] font-semibold text-[#2d3b35]">{action.action}</span>
                    <div className="mt-0.5 text-[9px] capitalize text-[#8a928e]">{action.type.replace('-', ' ')}</div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                    action.status === 'completed' ? 'bg-[#e4f0ea] text-[#2c6b5c]' :
                    action.status === 'in-progress' ? 'bg-[#e9eaf7] text-[#5a4fb3]' :
                    action.status === 'blocked' ? 'bg-[#f8d8d6] text-[#c64536]' :
                    'bg-[#f7ead7] text-[#aa742c]'
                  }`}>
                    {action.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Human Assistance Status */}
        {humanAssistance && humanAssistance.status !== 'draft' && (
          <div className="rounded-2xl border border-[#c6e0d8] bg-[#e4f0ea] p-5">
            <div className="flex items-start gap-3">
              <Icon name="user" className="size-5 text-[#2c6b5c]" />
              <div>
                <p className="text-sm font-bold text-[#2d3b35]">Assistance Request Active</p>
                <p className="mt-1 text-[11px] text-[#616c67]">
                  Requested {humanAssistance.assistanceType.toLowerCase()}. 
                  Status: <span className="font-semibold">{humanAssistance.status}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleSave}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#183d35] px-5 py-3 text-[10px] font-bold text-white transition hover:bg-[#24564a]"
          >
            Save progress <Icon name="check" className="size-3.5" />
          </button>
          <button
            onClick={handleExport}
            className="flex-1 rounded-xl border border-[#dce1dc] bg-white px-5 py-3 text-[10px] font-bold text-[#52605a] transition hover:border-[#aebbb5]"
          >
            Export summary
          </button>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="info" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold text-[#926116]">Important Disclaimer</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                This journey does not automatically submit government applications or provide official legal/tax advice. 
                All assessments are preliminary guidance. Final eligibility must be confirmed through official channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
