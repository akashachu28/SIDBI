'use client'

import React, { useEffect } from 'react'
import Icon from './Icon'
import { useMarketReady } from '../context/MarketReadyContext'

export default function ProgressSidebar() {
  const { progressSummary, updateProgressSummary, setActiveStep, showNotice } = useMarketReady()

  useEffect(() => {
    updateProgressSummary()
  }, [])

  return (
    <aside className="space-y-4 self-start xl:sticky xl:top-22.5">
      {/* Progress Snapshot */}
      <div className="rounded-[20px] border border-[#dfe3de] bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">Market snapshot</p>
          <span className="grid size-8 place-items-center rounded-lg bg-[#edf3ef] text-[#2c6b5c]">
            <Icon name="market" className="size-4" />
          </span>
        </div>
        <div className="mt-5 flex items-end gap-2">
          <span className="text-[30px] font-semibold leading-none tracking-tighter">
            {progressSummary.opportunitiesFound}
          </span>
          <span className="pb-1 text-[9px] text-[#8b938f]">opportunities</span>
        </div>
        <div className="mt-4 space-y-3 border-t border-[#edf0ec] pt-4">
          <div className="flex justify-between text-[10px]">
            <span className="text-[#7f8984]">Relevant matches</span>
            <span className="font-bold text-[#2c6b5c]">{progressSummary.relevantOpportunities}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-[#7f8984]">Checklist completed</span>
            <span className="font-bold">{progressSummary.checklistCompleted} / {progressSummary.checklistTotal}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-[#7f8984]">Actions pending</span>
            <span className="font-bold text-[#a56f28]">{progressSummary.actionsPending}</span>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-[20px] border border-[#dfe3de] bg-[#f0f4f1] p-5">
        <span className="grid size-8 place-items-center rounded-lg bg-white text-[#365f54]">
          <Icon name="sparkles" className="size-4" />
        </span>
        <p className="mt-4 text-[11px] font-bold">Phase 1 Demonstrator</p>
        <p className="mt-1.5 text-[10px] leading-4 text-[#65736d]">
          This is a limited demonstrator showing curated opportunities. Full marketplace features are outside Phase 1 scope.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="rounded-[20px] border border-[#dfe3de] bg-white p-4">
        <p className="mb-3 text-[11px] font-bold text-[#2d3b35]">Quick actions</p>
        <div className="space-y-2">
          <button
            onClick={() => setActiveStep(2)}
            className="flex w-full items-center justify-between rounded-xl bg-[#fafbf9] p-3 text-left transition hover:bg-[#f0f2ee]"
          >
            <div className="flex items-center gap-2">
              <Icon name="market" className="size-4 text-[#2c6b5c]" />
              <span className="text-[10px] font-bold text-[#46524d]">View opportunities</span>
            </div>
            <Icon name="arrow" className="size-3 text-[#8a928e]" />
          </button>
          <button
            onClick={() => setActiveStep(3)}
            className="flex w-full items-center justify-between rounded-xl bg-[#fafbf9] p-3 text-left transition hover:bg-[#f0f2ee]"
          >
            <div className="flex items-center gap-2">
              <Icon name="document" className="size-4 text-[#2c6b5c]" />
              <span className="text-[10px] font-bold text-[#46524d]">View checklist</span>
            </div>
            <Icon name="arrow" className="size-3 text-[#8a928e]" />
          </button>
        </div>
      </div>

      {/* Export Notice */}
      <button
        onClick={() => showNotice('Export preparation guide available')}
        className="flex w-full items-center justify-between rounded-2xl border border-[#dfe3de] bg-white p-4 text-left transition hover:border-[#b9c8c0]"
      >
        <span>
          <span className="block text-[10px] font-bold">Export readiness?</span>
          <span className="mt-0.5 block text-[9px] text-[#8b938f]">View preparation guide</span>
        </span>
        <span className="grid size-7 place-items-center rounded-full bg-[#edf3ef] text-[#2c6b5c]">
          <Icon name="arrow" className="size-3.5" />
        </span>
      </button>
    </aside>
  )
}
