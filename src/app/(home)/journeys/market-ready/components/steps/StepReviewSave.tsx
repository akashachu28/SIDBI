'use client'

import React from 'react'
import { useMarketReady } from '../../context/MarketReadyContext'
import Icon from '../Icon'

export default function StepReviewSave() {
  const { 
    businessProduct, 
    opportunities,
    checklistItems,
    preparationActions,
    progressSummary,
    showNotice
  } = useMarketReady()

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
          Review discovered opportunities, checklist status, and preparation progress. Save or export your summary.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        {/* Business Profile */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <p className="mb-4 text-xs font-bold text-[#2d3b35]">Business Profile</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Business Name</p>
              <p className="text-[11px] text-[#2d3b35]">{businessProduct.businessName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Product/Service</p>
              <p className="text-[11px] text-[#2d3b35]">{businessProduct.productService}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Sector</p>
              <p className="text-[11px] text-[#2d3b35]">{businessProduct.sector}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Location</p>
              <p className="text-[11px] text-[#2d3b35]">{businessProduct.location}</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-gradient-to-br from-[#fafbf9] to-white p-5">
          <p className="mb-4 text-xs font-bold text-[#2d3b35]">Progress Overview</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#c6e0d8] bg-[#e4f0ea] p-4 text-center">
              <div className="text-[26px] font-bold text-[#2c6b5c]">{progressSummary.opportunitiesFound}</div>
              <div className="text-[9px] text-[#616c67]">Opportunities</div>
            </div>
            <div className="rounded-xl border border-[#c6e0d8] bg-[#e4f0ea] p-4 text-center">
              <div className="text-[26px] font-bold text-[#2c6b5c]">{progressSummary.relevantOpportunities}</div>
              <div className="text-[9px] text-[#616c67]">Relevant</div>
            </div>
            <div className="rounded-xl border border-[#c6e0d8] bg-[#e4f0ea] p-4 text-center">
              <div className="text-[26px] font-bold text-[#2c6b5c]">{progressSummary.checklistCompleted}/{progressSummary.checklistTotal}</div>
              <div className="text-[9px] text-[#616c67]">Checklist</div>
            </div>
          </div>
        </div>

        {/* Opportunities Summary */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <p className="mb-4 text-xs font-bold text-[#2d3b35]">Selected Opportunities</p>
          <div className="space-y-3">
            {opportunities.map((opp) => (
              <div key={opp.id} className="rounded-xl border border-[#e9ece8] bg-[#fafbf9] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#2d3b35]">{opp.title}</h3>
                      {opp.isPrototype && (
                        <span className="rounded-full bg-[#f7ead7] px-2 py-0.5 text-[8px] font-bold text-[#aa742c]">
                          DEMO
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[10px] text-[#8a928e]">{opp.source} · {opp.type}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#f0f2ee] px-2 py-0.5 text-[9px] font-semibold text-[#68736e]">
                        {opp.sector}
                      </span>
                      {opp.deadline && (
                        <span className="rounded-full bg-[#f8d8d6] px-2 py-0.5 text-[9px] font-semibold text-[#c64536]">
                          Deadline: {opp.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#2c6b5c]">{opp.relevanceScore}%</div>
                    <div className="text-[9px] text-[#8a928e]">Match</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist Status */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <p className="mb-4 text-xs font-bold text-[#2d3b35]">Checklist Status</p>
          <div className="space-y-2">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-[#e9ece8] bg-[#fafbf9] p-3">
                <div className="flex items-center gap-3">
                  <span className={`grid size-5 shrink-0 place-items-center rounded border-2 ${
                    item.status === 'completed' 
                      ? 'border-[#2c6b5c] bg-[#2c6b5c]' 
                      : 'border-[#c6d6cd] bg-white'
                  }`}>
                    {item.status === 'completed' && <Icon name="check" className="size-3 text-white" />}
                  </span>
                  <span className="text-[11px] font-semibold text-[#2d3b35]">{item.title}</span>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                  item.status === 'completed' ? 'bg-[#e4f0ea] text-[#2c6b5c]' :
                  item.status === 'pending' ? 'bg-[#f7ead7] text-[#aa742c]' :
                  'bg-[#f0f2ee] text-[#68736e]'
                }`}>
                  {item.status === 'not-started' ? 'Not started' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Outstanding Actions */}
        {preparationActions.filter(a => a.status !== 'completed').length > 0 && (
          <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
            <p className="mb-4 text-xs font-bold text-[#2d3b35]">Outstanding Actions</p>
            <div className="space-y-2">
              {preparationActions.filter(a => a.status !== 'completed').map((action) => (
                <div key={action.id} className="flex items-center justify-between rounded-xl border border-[#e9ece8] bg-[#fafbf9] p-3">
                  <span className="text-[11px] font-semibold text-[#2d3b35]">{action.action}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                    action.status === 'in-progress' ? 'bg-[#e9eaf7] text-[#5a4fb3]' :
                    'bg-[#f7ead7] text-[#aa742c]'
                  }`}>
                    {action.status === 'in-progress' ? 'In progress' : 'Pending'}
                  </span>
                </div>
              ))}
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
              <p className="text-[11px] font-bold text-[#926116]">Phase 1 Demonstrator</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                This demonstrator shows curated opportunities from agreed sources. Full marketplace integration, 
                comprehensive tender automation, and extensive buyer/export databases are outside Phase 1 scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
