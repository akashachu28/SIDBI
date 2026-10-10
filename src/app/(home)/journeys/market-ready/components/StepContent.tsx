'use client'

import React from 'react'
import { useMarketReady } from '../context/MarketReadyContext'
import StepBusinessProduct from './steps/StepBusinessProduct'
import StepMarketObjective from './steps/StepMarketObjective'
import StepOpportunities from './steps/StepOpportunities'
import StepBuyerChecklist from './steps/StepBuyerChecklist'
import StepReviewSave from './steps/StepReviewSave'
import Icon from './Icon'

export default function StepContent() {
  const { activeStep, setActiveStep, steps, showNotice } = useMarketReady()
  const currentStep = steps[activeStep]

  const stepComponents = [
    <StepBusinessProduct key="0" />,
    <StepMarketObjective key="1" />,
    <StepOpportunities key="2" />,
    <StepBuyerChecklist key="3" />,
    <StepReviewSave key="4" />
  ]

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleNext = () => {
    showNotice('Step saved successfully.')
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handleSaveForLater = () => {
    showNotice('Your progress has been saved.')
  }

  return (
    <section className="overflow-hidden rounded-[20px] border border-[#dfe3de] bg-white">
      {/* Step Header */}
      <div className="border-b border-[#e9ece8] px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2c6b5c]">
            Step {currentStep.number} of {steps.length}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${currentStep.required ? 'bg-[#f2f4f1] text-[#747e79]' : 'bg-[#e8f0eb] text-[#2c6b5c]'}`}>
            {currentStep.required ? 'Required step' : 'Optional step'}
          </span>
        </div>
      </div>

      {/* Step Content */}
      {stepComponents[activeStep]}

      {/* Step Footer */}
      <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#e9ece8] bg-[#fcfdfa] px-6 py-4 sm:flex-row sm:items-center sm:px-8">
        <button
          disabled={activeStep === 0}
          onClick={handlePrevious}
          className="rounded-xl border border-[#dce1dc] px-4 py-2.5 text-[10px] font-bold text-[#64706a] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous step
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleSaveForLater}
            className="flex-1 rounded-xl border border-[#d7ddd8] bg-white px-4 py-2.5 text-[10px] font-bold text-[#52605a] transition hover:border-[#aebbb5] sm:flex-none"
          >
            Save for later
          </button>
          <button
            onClick={handleNext}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#183d35] px-5 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#24564a] sm:flex-none"
          >
            Save & continue <Icon name="arrow" className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
