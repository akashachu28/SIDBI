'use client'

import React from 'react'
import Icon from './Icon'
import { useCreditReady } from '../context/CreditReadyContext'

export default function ProgressSidebar() {
  const { readinessAssessment, informationItems, documents, setActiveStep, showNotice } = useCreditReady()

  const availableItems = informationItems.filter(item => item.available)
  const neededItems = informationItems.filter(item => !item.available)

  const handleHumanAssistance = () => {
    setActiveStep(7)
    showNotice('Human assistance options are ready to review.')
  }

  return (
    <aside className="space-y-4 self-start xl:sticky xl:top-[90px]">
      {/* Readiness Snapshot */}
      <div className="rounded-[20px] border border-[#dfe3de] bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">Readiness snapshot</p>
          <span className="grid size-8 place-items-center rounded-lg bg-[#edf3ef] text-[#2c6b5c]">
            <Icon name="progress" className="size-4" />
          </span>
        </div>
        <div className="mt-5 flex items-end gap-2">
          <span className="text-[30px] font-semibold leading-none tracking-[-0.05em]">
            {readinessAssessment.overallScore}%
          </span>
          <span className="pb-1 text-[9px] text-[#8b938f]">preliminary progress</span>
        </div>
        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8ebe8]">
            <div
              className="h-full rounded-full bg-[#2c6b5c] transition-all duration-500"
              style={{ width: `${readinessAssessment.overallScore}%` }}
            />
          </div>
        </div>
        <div className="mt-5 space-y-3 border-t border-[#edf0ec] pt-4">
          <div className="flex justify-between text-[10px]">
            <span className="text-[#7f8984]">Confirmed facts</span>
            <span className="font-bold">{availableItems.length}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-[#7f8984]">Information gaps</span>
            <span className="font-bold text-[#a56f28]">{neededItems.length}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-[#7f8984]">Documents added</span>
            <span className="font-bold">{documents.length} of 5</span>
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
          This journey provides preliminary guidance only. It is not loan underwriting, a credit guarantee, or loan approval.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="rounded-[20px] border border-[#dfe3de] bg-white p-4">
        <p className="mb-3 text-[11px] font-bold text-[#2d3b35]">Quick actions</p>
        <div className="space-y-2">
          <button
            onClick={() => setActiveStep(3)}
            className="flex w-full items-center justify-between rounded-xl bg-[#fafbf9] p-3 text-left transition hover:bg-[#f0f2ee]"
          >
            <div className="flex items-center gap-2">
              <Icon name="upload" className="size-4 text-[#2c6b5c]" />
              <span className="text-[10px] font-bold text-[#46524d]">Upload documents</span>
            </div>
            <Icon name="arrow" className="size-3 text-[#8a928e]" />
          </button>
          <button
            onClick={() => setActiveStep(6)}
            className="flex w-full items-center justify-between rounded-xl bg-[#fafbf9] p-3 text-left transition hover:bg-[#f0f2ee]"
          >
            <div className="flex items-center gap-2">
              <Icon name="download" className="size-4 text-[#2c6b5c]" />
              <span className="text-[10px] font-bold text-[#46524d]">View checklist</span>
            </div>
            <Icon name="arrow" className="size-3 text-[#8a928e]" />
          </button>
        </div>
      </div>

      {/* Human Assistance */}
      <button
        onClick={handleHumanAssistance}
        className="flex w-full items-center justify-between rounded-[16px] border border-[#dfe3de] bg-white p-4 text-left transition hover:border-[#b9c8c0]"
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
