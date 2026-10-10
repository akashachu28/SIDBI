'use client'

import React from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import Icon from '../Icon'

export default function StepReadinessAssessment() {
  const { readinessAssessment } = useCreditReady()

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Understand your funding readiness</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          See a transparent summary of confirmed facts, gaps, unknowns, and practical next actions.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Overall Score */}
        <div className="rounded-2xl border border-[#d6e8dd] bg-gradient-to-br from-[#f5faf7] to-[#eef5f1] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8a928e]">Readiness score</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[44px] font-bold leading-none tracking-[-0.05em] text-[#2c6b5c]">
                  {readinessAssessment.overallScore}%
                </span>
                <span className="text-xs text-[#8a928e]">preliminary</span>
              </div>
            </div>
            <div className="grid size-16 place-items-center rounded-2xl bg-[#e4f0ea]">
              <Icon name="progress" className="size-8 text-[#2c6b5c]" />
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-[#2c6b5c]"
              style={{ width: `${readinessAssessment.overallScore}%` }}
            />
          </div>
          <p className="mt-3 text-[10px] leading-4 text-[#616c67]">
            This is a preliminary assessment based on the information you&apos;ve provided. It is not a credit guarantee or loan approval.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {/* Current Strengths */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Current strengths</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#e4f0ea] text-[#2c6b5c]">
                <Icon name="check" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              {readinessAssessment.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#4f8678]" />
                  {strength}
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Strengthen */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Areas to strengthen</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#f7ead7] text-[#aa742c]">
                <Icon name="alert" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              {readinessAssessment.areasToStrengthen.map((area, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#d0a155]" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Information Gaps */}
        {readinessAssessment.gaps.length > 0 && (
          <div className="mt-4 rounded-2xl border border-[#e4e8e3] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#2d3b35]">Outstanding information gaps</p>
                <p className="mt-0.5 text-[10px] text-[#8a928e]">
                  {readinessAssessment.gaps.length} items still needed
                </p>
              </div>
              <span className="rounded-full bg-[#fff4e2] px-2.5 py-1 text-[10px] font-bold text-[#946322]">
                {readinessAssessment.gaps.length}
              </span>
            </div>
            <div className="space-y-2">
              {readinessAssessment.gaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#e8ebe7] p-3"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon name="document" className="size-4 text-[#aa742c]" />
                    <span className="text-[11px] text-[#46524d]">{gap}</span>
                  </div>
                  <button className="text-[9px] font-bold text-[#2c6b5c] hover:underline">
                    Add now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Actions */}
        <div className="mt-4 rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Icon name="arrow" className="size-4 text-[#2c6b5c]" />
            <p className="text-xs font-bold text-[#2d3b35]">Recommended next actions</p>
          </div>
          <div className="space-y-2">
            {readinessAssessment.nextActions.map((action, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-[#e8ebe7] bg-white p-3"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#edf3ef] text-[10px] font-bold text-[#2c6b5c]">
                  {idx + 1}
                </span>
                <span className="flex-1 text-[11px] leading-4 text-[#46524d]">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-5 rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="info" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold">Important to understand</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                This readiness assessment is preliminary guidance only. It does not represent loan underwriting, a credit guarantee, or loan approval. Actual lending decisions are made by financial institutions based on their own criteria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
