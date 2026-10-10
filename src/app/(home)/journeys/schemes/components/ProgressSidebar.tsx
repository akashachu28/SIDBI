'use client'

import React, { useEffect } from 'react'
import Icon from './Icon'
import { useSchemes } from '../context/SchemesContext'

export default function ProgressSidebar() {
  const { progressSummary, updateProgressSummary, setActiveStep, showNotice } = useSchemes()

  useEffect(() => {
    updateProgressSummary()
  }, [])

  const handleHumanAssistance = () => {
    setActiveStep(6)
    showNotice('Human assistance options are ready to review.')
  }

  return (
    <aside className="space-y-4 self-start xl:sticky xl:top-22.5">
      {/* Progress Snapshot */}
      <div className="rounded-[20px] border border-[#dfe3de] bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">Discovery snapshot</p>
          <span className="grid size-8 place-items-center rounded-lg bg-[#edf3ef] text-[#2c6b5c]">
            <Icon name="schemes" className="size-4" />
          </span>
        </div>
        <div className="mt-5 flex items-end gap-2">
          <span className="text-[30px] font-semibold leading-none tracking-tighter">
            {progressSummary.totalSchemesFound}
          </span>
          <span className="pb-1 text-[9px] text-[#8b938f]">schemes found</span>
        </div>
        <div className="mt-4 space-y-3 border-t border-[#edf0ec] pt-4">
          <div className="flex justify-between text-[10px]">
            <span className="text-[#7f8984]">Likely relevant</span>
            <span className="font-bold text-[#2c6b5c]">{progressSummary.likelyRelevant}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-[#7f8984]">Fully assessed</span>
            <span className="font-bold">{progressSummary.assessmentComplete}</span>
          </div>
          {progressSummary.eligibilityUnknowns > 0 && (
            <div className="flex justify-between text-[10px]">
              <span className="text-[#7f8984]">Eligibility unknowns</span>
              <span className="font-bold text-[#a56f28]">{progressSummary.eligibilityUnknowns}</span>
            </div>
          )}
          {progressSummary.documentsNeeded > 0 && (
            <div className="flex justify-between text-[10px]">
              <span className="text-[#7f8984]">Documents needed</span>
              <span className="font-bold text-[#c64536]">{progressSummary.documentsNeeded}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-[#edf0ec] pt-3 text-[10px]">
            <span className="text-[#7f8984]">Actions pending</span>
            <span className="font-bold">{progressSummary.actionsPending}</span>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-[20px] border border-[#dfe3de] bg-[#f0f4f1] p-5">
        <span className="grid size-8 place-items-center rounded-lg bg-white text-[#365f54]">
          <Icon name="sparkles" className="size-4" />
        </span>
        <p className="mt-4 text-[11px] font-bold">Important to know</p>
        <p className="mt-1.5 text-[10px] leading-4 text-[#65736d]">
          This journey provides preliminary guidance from curated sources. It is not an official eligibility decision or government application.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="rounded-[20px] border border-[#dfe3de] bg-white p-4">
        <p className="mb-3 text-[11px] font-bold text-[#2d3b35]">Quick actions</p>
        <div className="space-y-2">
          <button
            onClick={() => setActiveStep(1)}
            className="flex w-full items-center justify-between rounded-xl bg-[#fafbf9] p-3 text-left transition hover:bg-[#f0f2ee]"
          >
            <div className="flex items-center gap-2">
              <Icon name="schemes" className="size-4 text-[#2c6b5c]" />
              <span className="text-[10px] font-bold text-[#46524d]">View schemes</span>
            </div>
            <Icon name="arrow" className="size-3 text-[#8a928e]" />
          </button>
          <button
            onClick={() => setActiveStep(4)}
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

      {/* Human Assistance */}
      <button
        onClick={handleHumanAssistance}
        className="flex w-full items-center justify-between rounded-2xl border border-[#dfe3de] bg-white p-4 text-left transition hover:border-[#b9c8c0]"
      >
        <span>
          <span className="block text-[10px] font-bold">Need help?</span>
          <span className="mt-0.5 block text-[9px] text-[#8b938f]">Explore human assistance</span>
        </span>
        <span className="grid size-7 place-items-center rounded-full bg-[#edf3ef] text-[#2c6b5c]">
          <Icon name="arrow" className="size-3.5" />
        </span>
      </button>
    </aside>
  )
}
