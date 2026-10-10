'use client'

import React, { useMemo } from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import Icon from '../Icon'

export default function StepFundingChecklist() {
  const { checklistItems, setChecklistItems, showNotice } = useCreditReady()

  const categories = useMemo(() => {
    return {
      kyc: checklistItems.filter(item => item.category === 'kyc'),
      financial: checklistItems.filter(item => item.category === 'financial'),
      purpose: checklistItems.filter(item => item.category === 'purpose')
    }
  }, [checklistItems])

  const completedCount = checklistItems.filter(item => item.completed).length
  const completionPercentage = Math.round((completedCount / checklistItems.length) * 100)

  const toggleItem = (itemId: string) => {
    setChecklistItems(
      checklistItems.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const handleDownloadChecklist = () => {
    showNotice('Downloading your funding checklist...')
  }

  const handleDownloadDPR = () => {
    showNotice('Downloading DPR outline...')
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Build your funding checklist</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Bring your confirmed information together into a practical checklist and a preliminary DPR outline.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Completion Progress */}
        <div className="rounded-2xl border border-[#d6e8dd] bg-gradient-to-br from-[#f5faf7] to-[#eef5f1] p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#8a928e]">Checklist completion</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[32px] font-bold leading-none text-[#2c6b5c]">{completedCount}</span>
                <span className="text-sm text-[#8a928e]">of {checklistItems.length} items</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[28px] font-bold text-[#2c6b5c]">{completionPercentage}%</div>
              <p className="text-[9px] text-[#8a928e]">complete</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-[#2c6b5c] transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* KYC & Registration Documents */}
        <div className="mt-5 rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#2d3b35]">Business KYC and registrations</p>
              <p className="mt-0.5 text-[10px] text-[#8a928e]">
                {categories.kyc.filter(item => item.completed).length} of {categories.kyc.length} completed
              </p>
            </div>
            <Icon name="building" className="size-5 text-[#2c6b5c]" />
          </div>
          <div className="space-y-2">
            {categories.kyc.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-[#e8ebe7] p-3 text-left transition hover:border-[#cbd4ce] hover:bg-[#fafbf9]"
              >
                <span
                  className={`grid size-5 place-items-center rounded-md border ${
                    item.completed
                      ? 'border-[#2c6b5c] bg-[#2c6b5c] text-white'
                      : 'border-[#d9ded9]'
                  }`}
                >
                  {item.completed && <Icon name="check" className="size-3" />}
                </span>
                <span className="flex-1">
                  <span className={`block text-[11px] font-semibold ${item.completed ? 'text-[#8a928e] line-through' : 'text-[#46524d]'}`}>
                    {item.title}
                  </span>
                </span>
                {item.optional && (
                  <span className="rounded-full bg-[#f1f2f3] px-2 py-0.5 text-[8px] font-semibold text-[#8a928e]">
                    Optional
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Financial Documents */}
        <div className="mt-4 rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#2d3b35]">Financial and banking documents</p>
              <p className="mt-0.5 text-[10px] text-[#8a928e]">
                {categories.financial.filter(item => item.completed).length} of {categories.financial.length} completed
              </p>
            </div>
            <Icon name="document" className="size-5 text-[#2c6b5c]" />
          </div>
          <div className="space-y-2">
            {categories.financial.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-[#e8ebe7] p-3 text-left transition hover:border-[#cbd4ce] hover:bg-[#fafbf9]"
              >
                <span
                  className={`grid size-5 place-items-center rounded-md border ${
                    item.completed
                      ? 'border-[#2c6b5c] bg-[#2c6b5c] text-white'
                      : 'border-[#d9ded9]'
                  }`}
                >
                  {item.completed && <Icon name="check" className="size-3" />}
                </span>
                <span className="flex-1">
                  <span className={`block text-[11px] font-semibold ${item.completed ? 'text-[#8a928e] line-through' : 'text-[#46524d]'}`}>
                    {item.title}
                  </span>
                </span>
                {item.optional && (
                  <span className="rounded-full bg-[#f1f2f3] px-2 py-0.5 text-[8px] font-semibold text-[#8a928e]">
                    Optional
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Use of Funds Documentation */}
        <div className="mt-4 rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#2d3b35]">Funding-use evidence</p>
              <p className="mt-0.5 text-[10px] text-[#8a928e]">
                {categories.purpose.filter(item => item.completed).length} of {categories.purpose.length} completed
              </p>
            </div>
            <Icon name="schemes" className="size-5 text-[#2c6b5c]" />
          </div>
          <div className="space-y-2">
            {categories.purpose.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-[#e8ebe7] p-3 text-left transition hover:border-[#cbd4ce] hover:bg-[#fafbf9]"
              >
                <span
                  className={`grid size-5 place-items-center rounded-md border ${
                    item.completed
                      ? 'border-[#2c6b5c] bg-[#2c6b5c] text-white'
                      : 'border-[#d9ded9]'
                  }`}
                >
                  {item.completed && <Icon name="check" className="size-3" />}
                </span>
                <span className="flex-1">
                  <span className={`block text-[11px] font-semibold ${item.completed ? 'text-[#8a928e] line-through' : 'text-[#46524d]'}`}>
                    {item.title}
                  </span>
                </span>
                {item.optional && (
                  <span className="rounded-full bg-[#f1f2f3] px-2 py-0.5 text-[8px] font-semibold text-[#8a928e]">
                    Optional
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Download Actions */}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={handleDownloadChecklist}
            className="flex items-center gap-2 rounded-xl bg-[#183d35] px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#24564a]"
          >
            <Icon name="download" className="size-3.5" />
            Download checklist
          </button>
          <button
            onClick={handleDownloadDPR}
            className="flex items-center gap-2 rounded-xl border border-[#dce1dc] bg-white px-4 py-2.5 text-[10px] font-bold text-[#52605a] transition hover:border-[#aebbb5]"
          >
            <Icon name="download" className="size-3.5" />
            Download DPR outline
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-5 rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-4">
          <div className="flex items-start gap-3">
            <Icon name="info" className="size-4 text-[#2c6b5c]" />
            <div>
              <p className="text-[10px] leading-4 text-[#616c67]">
                Your checklist and DPR outline are based on confirmed information. Update your journey as you complete more items to keep these documents current.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
