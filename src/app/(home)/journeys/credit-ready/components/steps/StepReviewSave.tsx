'use client'

import React from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import Icon from '../Icon'

export default function StepReviewSave() {
  const { steps, readinessAssessment, informationItems, showNotice } = useCreditReady()

  const completedSteps = steps.filter(step => step.state === 'complete')
  const remainingGaps = informationItems.filter(item => !item.available && item.required)

  const handleSaveJourney = () => {
    showNotice('Your journey has been saved successfully.')
  }

  const handleDownloadSummary = () => {
    showNotice('Downloading journey summary...')
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Review and save your journey</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Review completed steps, outstanding gaps, and your current progress before saving this version.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Journey Summary */}
        <div className="rounded-2xl border border-[#d6e8dd] bg-gradient-to-br from-[#f5faf7] to-[#eef5f1] p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#e4f0ea]">
              <Icon name="credit" className="size-6 text-[#2c6b5c]" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a928e]">Journey A · Credit Ready</p>
              <h3 className="mt-0.5 text-base font-bold text-[#2d3b35]">Your funding readiness journey</h3>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-white/70 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <Icon name="check" className="size-5 text-[#2c6b5c]" />
                <span className="text-[24px] font-bold text-[#2c6b5c]">{completedSteps.length}</span>
              </div>
              <p className="mt-2 text-[10px] font-semibold text-[#7d8682]">Steps completed</p>
            </div>

            <div className="rounded-xl bg-white/70 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <Icon name="clock" className="size-5 text-[#aa742c]" />
                <span className="text-[24px] font-bold text-[#aa742c]">{remainingGaps.length}</span>
              </div>
              <p className="mt-2 text-[10px] font-semibold text-[#7d8682]">Outstanding gaps</p>
            </div>

            <div className="rounded-xl bg-white/70 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <Icon name="progress" className="size-5 text-[#2c6b5c]" />
                <span className="text-[24px] font-bold text-[#2c6b5c]">{readinessAssessment.overallScore}%</span>
              </div>
              <p className="mt-2 text-[10px] font-semibold text-[#7d8682]">Current readiness</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {/* Completed Steps */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Completed required steps</p>
              <span className="rounded-full bg-[#e4f0ea] px-2 py-1 text-[9px] font-bold text-[#2c6b5c]">
                {completedSteps.length} / {steps.filter(s => s.required).length}
              </span>
            </div>
            <div className="space-y-2">
              {completedSteps.map((step) => (
                <div key={step.id} className="flex items-start gap-2.5 rounded-lg bg-[#fafbf9] p-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#2c6b5c] text-white">
                    <Icon name="check" className="size-3" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-[#2d3b35]">{step.title}</p>
                    <p className="mt-0.5 text-[9px] text-[#8a928e]">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outstanding Gaps */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Outstanding information gaps</p>
              <span className="rounded-full bg-[#fff4e2] px-2 py-1 text-[9px] font-bold text-[#946322]">
                {remainingGaps.length} remaining
              </span>
            </div>
            {remainingGaps.length > 0 ? (
              <div className="space-y-2">
                {remainingGaps.map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5 rounded-lg bg-[#fafbf9] p-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#f7ead7] text-[#aa742c]">
                      <Icon name="clock" className="size-3" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-[#2d3b35]">{item.label}</p>
                      {item.required && (
                        <span className="mt-0.5 inline-block text-[8px] font-semibold uppercase tracking-[0.08em] text-[#aa742c]">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-[#f5faf7] p-4 text-center">
                <Icon name="check" className="mx-auto size-6 text-[#2c6b5c]" />
                <p className="mt-2 text-[11px] font-semibold text-[#2c6b5c]">All information complete</p>
                <p className="mt-1 text-[9px] text-[#8a928e]">No outstanding required items</p>
              </div>
            )}
          </div>
        </div>

        {/* Current Progress */}
        <div className="mt-5 rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Icon name="progress" className="size-4 text-[#2c6b5c]" />
            <p className="text-xs font-bold text-[#2d3b35]">Current readiness progress</p>
          </div>
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-[#7d8682]">Overall readiness score</span>
            <span className="text-2xl font-bold text-[#2c6b5c]">{readinessAssessment.overallScore}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e8ebe8]">
            <div
              className="h-full rounded-full bg-[#2c6b5c]"
              style={{ width: `${readinessAssessment.overallScore}%` }}
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold text-[#8a928e]">Strengths identified</p>
              <p className="mt-1 text-sm font-bold text-[#2c6b5c]">{readinessAssessment.strengths.length}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#8a928e]">Areas to strengthen</p>
              <p className="mt-1 text-sm font-bold text-[#aa742c]">{readinessAssessment.areasToStrengthen.length}</p>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="mt-5 rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Icon name="arrow" className="size-4 text-[#2c6b5c]" />
            <p className="text-xs font-bold text-[#2d3b35]">What happens next</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl bg-[#fafbf9] p-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#edf3ef] text-[10px] font-bold text-[#2c6b5c]">
                1
              </span>
              <div>
                <p className="text-[11px] font-bold text-[#2d3b35]">Revisit supported steps</p>
                <p className="mt-0.5 text-[10px] text-[#7d8682]">
                  You can return to any step to update information or add missing details
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-[#fafbf9] p-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#edf3ef] text-[10px] font-bold text-[#2c6b5c]">
                2
              </span>
              <div>
                <p className="text-[11px] font-bold text-[#2d3b35]">Download available artefacts</p>
                <p className="mt-0.5 text-[10px] text-[#7d8682]">
                  Export your checklist, DPR outline, and readiness summary
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-[#fafbf9] p-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#edf3ef] text-[10px] font-bold text-[#2c6b5c]">
                3
              </span>
              <div>
                <p className="text-[11px] font-bold text-[#2d3b35]">Continue outstanding actions later</p>
                <p className="mt-0.5 text-[10px] text-[#7d8682]">
                  Your progress is automatically saved and you can resume anytime
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={handleSaveJourney}
            className="flex items-center gap-2 rounded-xl bg-[#183d35] px-5 py-3 text-[11px] font-bold text-white transition hover:bg-[#24564a]"
          >
            <Icon name="check" className="size-4" />
            Save journey version
          </button>
          <button
            onClick={handleDownloadSummary}
            className="flex items-center gap-2 rounded-xl border border-[#dce1dc] bg-white px-5 py-3 text-[11px] font-bold text-[#52605a] transition hover:border-[#aebbb5]"
          >
            <Icon name="download" className="size-4" />
            Download summary
          </button>
        </div>

        {/* Final Note */}
        <div className="mt-5 rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="info" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold">Journey completion milestone</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                Completing this journey means you&apos;ve finished all defined required steps. It does not mean you have received loan approval. Actual lending decisions are made by financial institutions based on their own underwriting criteria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
