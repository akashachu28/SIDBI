'use client'

import React from 'react'
import Icon from './Icon'
import { useCreditReady } from '../context/CreditReadyContext'

export default function StepSidebar() {
  const { activeStep, setActiveStep, steps } = useCreditReady()

  return (
    <aside className="self-start rounded-[20px] border border-[#dfe3de] bg-white p-3 xl:sticky xl:top-[90px]">
      <div className="px-3 pb-3 pt-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#929a96]">Journey steps</p>
        <p className="mt-1 text-[11px] text-[#7d8682]">Complete required steps in order.</p>
      </div>
      <div className="space-y-1">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(index)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
              activeStep === index ? "bg-[#e8f0eb]" : "hover:bg-[#f5f6f3]"
            }`}
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                step.state === "complete"
                  ? "bg-[#2c6b5c] text-white"
                  : activeStep === index
                  ? "border border-[#2c6b5c] bg-white text-[#24594d]"
                  : "border border-[#dfe3df] bg-white text-[#8d9691]"
              }`}
            >
              {step.state === "complete" ? <Icon name="check" className="size-3.5" /> : step.number}
            </span>
            <span className="min-w-0">
              <span className={`block truncate text-[11px] font-bold ${activeStep === index ? "text-[#204d42]" : "text-[#46524d]"}`}>
                {step.title}
              </span>
              <span className="block truncate text-[9px] text-[#929a96]">{step.detail}</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
