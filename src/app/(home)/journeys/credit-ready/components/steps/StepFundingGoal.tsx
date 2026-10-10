'use client'

import React from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import type { InputMode } from '../../types'

export default function StepFundingGoal() {
  const { fundingGoal, setFundingGoal } = useCreditReady()

  const purposes = ['Working capital', 'Machinery & equipment', 'Business expansion', 'Other purpose']
  const inputModes: InputMode[] = ['Guided form', 'Write in my own words', 'Voice input']

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">What are you seeking funding for?</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          A clear goal helps us organise the information and documents that may be useful in a funding conversation.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">How much funding are you looking for?</span>
          <span className="flex overflow-hidden rounded-xl border border-[#dce1dc] bg-[#fafbf9] focus-within:border-[#4c7b6f] focus-within:ring-2 focus-within:ring-[#dce9e3]">
            <span className="flex items-center border-r border-[#e0e4df] px-4 text-sm font-semibold text-[#63706a]">₹</span>
            <input
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm font-semibold outline-none placeholder:text-[#afb5b1]"
              value={Number(fundingGoal.amount).toLocaleString('en-IN')}
              onChange={(e) => setFundingGoal({ ...fundingGoal, amount: e.target.value.replace(/,/g, '') })}
              placeholder="Enter an amount"
            />
            <span className="flex items-center px-4 text-[10px] font-semibold text-[#8b938f]">INR</span>
          </span>
          <span className="mt-1.5 block text-[9px] text-[#929a96]">An estimate is fine. You can update this later.</span>
        </label>

        <div>
          <p className="mb-2.5 text-[11px] font-bold text-[#34423c]">What will the funding be used for?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {purposes.map((purpose) => (
              <button
                key={purpose}
                onClick={() => setFundingGoal({ ...fundingGoal, purpose })}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left text-[11px] font-semibold transition ${
                  fundingGoal.purpose === purpose
                    ? "border-[#4b796d] bg-[#eef5f1] text-[#24594d]"
                    : "border-[#e1e5e0] hover:border-[#cbd2cd]"
                }`}
              >
                <span
                  className={`grid size-4 place-items-center rounded-full border ${
                    fundingGoal.purpose === purpose ? "border-[#2c6b5c] bg-[#2c6b5c]" : "border-[#bdc4c0]"
                  }`}
                >
                  {fundingGoal.purpose === purpose && (
                    <svg className="size-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  )}
                </span>
                {purpose}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Tell us a little more about your purpose</span>
          <textarea
            className="min-h-24 w-full resize-none rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-xs leading-5 outline-none transition placeholder:text-[#a1a9a5] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            value={fundingGoal.description}
            onChange={(e) => setFundingGoal({ ...fundingGoal, description: e.target.value })}
            placeholder="Describe how you plan to use the funding..."
          />
        </label>

        <div>
          <p className="mb-2.5 text-[11px] font-bold text-[#34423c]">How would you like to provide information?</p>
          <div className="flex flex-wrap gap-2">
            {inputModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setFundingGoal({ ...fundingGoal, inputMode: mode })}
                className={`rounded-full border px-3.5 py-2 text-[10px] font-bold transition ${
                  fundingGoal.inputMode === mode
                    ? "border-[#2c6b5c] bg-[#2c6b5c] text-white"
                    : "border-[#dce1dc] text-[#68736e] hover:border-[#aebbb5]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
