'use client'

import React from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import Icon from '../Icon'

export default function StepInfoGaps() {
  const { informationItems } = useCreditReady()

  const availableItems = informationItems.filter(item => item.available)
  const neededItems = informationItems.filter(item => !item.available)

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Close the important information gaps</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          These items may help make your funding discussion more complete. Add what you have or tell us when something is unavailable.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Information Available */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Information available</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#e4f0ea] text-[#2c6b5c]">
                <Icon name="check" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              {availableItems.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#4f8678]" />
                  <div className="flex-1">
                    <p className="text-[11px] leading-4 text-[#616c67]">{item.label}</p>
                    {item.required && (
                      <span className="mt-0.5 inline-block text-[9px] text-[#8a928e]">Required</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Still Needed */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Still needed</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#f7ead7] text-[#aa742c]">
                <Icon name="clock" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              {neededItems.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#d0a155]" />
                  <div className="flex-1">
                    <p className="text-[11px] leading-4 text-[#616c67]">{item.label}</p>
                    <div className="mt-1 flex items-center gap-2">
                      {item.required && (
                        <span className="inline-block text-[9px] text-[#aa742c] font-semibold">Required</span>
                      )}
                      <button className="text-[9px] font-semibold text-[#2c6b5c] hover:underline">
                        Add now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-5 rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="info" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold">Why these items matter</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                Recent statements can help describe cash flow, while quotations connect your requested amount to a clear business use. They do not determine approval.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-[#183d35] px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#24564a]">
            <Icon name="edit" className="size-3.5" />
            Add missing information
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-[#dce1dc] bg-white px-4 py-2.5 text-[10px] font-bold text-[#52605a] transition hover:border-[#aebbb5]">
            Mark as unavailable
          </button>
        </div>
      </div>
    </>
  )
}
