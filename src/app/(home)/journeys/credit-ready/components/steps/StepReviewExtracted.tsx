'use client'

import React from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import Icon from '../Icon'
import type { VerificationState } from '../../types'

const stateConfig: Record<VerificationState, { label: string; color: string; icon: 'check' | 'clock' | 'alert' | 'info' }> = {
  'user-confirmed': { label: 'User confirmed', color: 'text-[#296052]', icon: 'check' },
  'needs-review': { label: 'Needs your review', color: 'text-[#946322]', icon: 'clock' },
  'not-available': { label: 'Not yet available', color: 'text-[#7d8682]', icon: 'info' },
  'extracted': { label: 'Extracted', color: 'text-[#5168a8]', icon: 'info' }
}

export default function StepReviewExtracted() {
  const { extractedFields, setExtractedFields, showNotice } = useCreditReady()

  const handleConfirm = (fieldId: string) => {
    setExtractedFields(
      extractedFields.map(field =>
        field.id === fieldId ? { ...field, state: 'user-confirmed' } : field
      )
    )
    showNotice('Field confirmed successfully.')
  }

  const handleEdit = (fieldId: string) => {
    showNotice(`Editing ${extractedFields.find(f => f.id === fieldId)?.label}`)
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Review extracted information</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Check values against their source documents. Edit anything inaccurate and confirm only what you recognise.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Extracted Fields */}
        <div className="space-y-3">
          {extractedFields.map((field) => (
            <div
              key={field.id}
              className={`rounded-2xl border p-5 ${
                field.state === 'user-confirmed'
                  ? 'border-[#d6e8dd] bg-[#f5faf7]'
                  : field.state === 'needs-review'
                  ? 'border-[#f3e5cd] bg-[#fffbf3]'
                  : 'border-[#e4e8e3] bg-[#fafbf9]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-[#2d3b35]">{field.label}</p>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      field.state === 'user-confirmed'
                        ? 'bg-[#e4f0ea] text-[#296052]'
                        : field.state === 'needs-review'
                        ? 'bg-[#fff4e2] text-[#946322]'
                        : 'bg-[#f1f2f3] text-[#7d8682]'
                    }`}>
                      <Icon name={stateConfig[field.state].icon} className="size-3" />
                      {stateConfig[field.state].label}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold text-[#8a928e]">Extracted value</p>
                      <p className="mt-1 text-sm font-bold text-[#2d3b35]">{field.value}</p>
                    </div>
                    {field.source && (
                      <div>
                        <p className="text-[10px] font-semibold text-[#8a928e]">Source document</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Icon name="document" className="size-3.5 text-[#8a928e]" />
                          <p className="text-[11px] text-[#46524d]">{field.source}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {field.confidence && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="text-[#8a928e]">Confidence score</span>
                        <span className="font-bold text-[#46524d]">{Math.round(field.confidence * 100)}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e8ebe8]">
                        <div
                          className="h-full rounded-full bg-[#2c6b5c]"
                          style={{ width: `${field.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {field.state === 'needs-review' && (
                    <>
                      <button
                        onClick={() => handleConfirm(field.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-[#183d35] px-3 py-1.5 text-[9px] font-bold text-white transition hover:bg-[#24564a]"
                      >
                        <Icon name="check" className="size-3" />
                        Confirm
                      </button>
                      <button
                        onClick={() => handleEdit(field.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-[#dce1dc] bg-white px-3 py-1.5 text-[9px] font-bold text-[#52605a] transition hover:border-[#aebbb5]"
                      >
                        <Icon name="edit" className="size-3" />
                        Edit
                      </button>
                    </>
                  )}
                  {field.state === 'user-confirmed' && (
                    <button
                      onClick={() => handleEdit(field.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-[#d6e8dd] bg-white px-3 py-1.5 text-[9px] font-bold text-[#296052] transition hover:border-[#b9d9c8]"
                    >
                      <Icon name="edit" className="size-3" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification States Legend */}
        <div className="mt-6 rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
          <p className="mb-3 text-xs font-bold text-[#2d3b35]">Verification states</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {Object.entries(stateConfig).slice(0, 3).map(([state, config]) => (
              <div key={state} className="flex items-start gap-2.5">
                <Icon name={config.icon} className="mt-0.5 size-4 text-[#8a928e]" />
                <div>
                  <p className="text-[10px] font-bold text-[#46524d]">{config.label}</p>
                  <p className="mt-0.5 text-[9px] text-[#8a928e]">
                    {state === 'user-confirmed' && 'You have verified this value'}
                    {state === 'needs-review' && 'Requires your confirmation'}
                    {state === 'not-available' && 'Information pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-5 rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="alert" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold">Verify before you confirm</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                Only confirm values that match your source documents exactly. Inaccurate information may affect your readiness assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
