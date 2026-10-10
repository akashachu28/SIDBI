'use client'

import React, { useState } from 'react'
import { useSchemes } from '../../context/SchemesContext'
import Icon from '../Icon'

export default function StepHumanAssistance() {
  const { humanAssistance, setHumanAssistance, schemes } = useSchemes()
  const [localRequest, setLocalRequest] = useState(humanAssistance || {
    assistanceType: '',
    reason: '',
    schemes: [],
    clarificationNeeded: [],
    infoToShare: [],
    consentGiven: false,
    status: 'draft' as const
  })

  const handleSubmit = () => {
    setHumanAssistance({
      ...localRequest,
      status: 'submitted',
      requestDate: new Date().toLocaleString()
    })
  }

  const assistanceTypes = [
    'Eligibility clarification',
    'Application guidance',
    'Document preparation help',
    'Institution contact',
    'General inquiry'
  ]

  const infoOptions = [
    'Business name and registration details',
    'Business location and sector',
    'Financial information',
    'Current business stage',
    'Support needs and objectives',
    'Uploaded documents',
    'Assessment results'
  ]

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Request human assistance</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Get help from experts or institution representatives when eligibility is unclear. Information shared only with your consent.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        {humanAssistance && humanAssistance.status !== 'draft' && (
          <div className="rounded-2xl border border-[#c6e0d8] bg-[#e4f0ea] p-5">
            <div className="flex items-start gap-3">
              <Icon name="check" className="size-5 text-[#2c6b5c]" />
              <div>
                <p className="text-sm font-bold text-[#2d3b35]">Request Submitted</p>
                <p className="mt-1 text-[11px] text-[#616c67]">
                  Your assistance request was submitted on {humanAssistance.requestDate}. 
                  Current status: <span className="font-semibold">{humanAssistance.status}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">
            Type of assistance needed <span className="text-[#c64536]">*</span>
          </span>
          <select
            className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            value={localRequest.assistanceType}
            onChange={(e) => setLocalRequest({ ...localRequest, assistanceType: e.target.value })}
            disabled={humanAssistance?.status === 'submitted'}
          >
            <option value="">Select assistance type</option>
            {assistanceTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">
            Describe your need <span className="text-[#c64536]">*</span>
          </span>
          <textarea
            className="min-h-24 w-full resize-none rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-xs leading-5 outline-none transition placeholder:text-[#a1a9a5] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            value={localRequest.reason}
            onChange={(e) => setLocalRequest({ ...localRequest, reason: e.target.value })}
            placeholder="Explain what you need help with..."
            disabled={humanAssistance?.status === 'submitted'}
          />
        </label>

        <div>
          <p className="mb-2.5 text-[11px] font-bold text-[#34423c]">Related schemes (optional)</p>
          <div className="space-y-2">
            {schemes.map((scheme) => (
              <label key={scheme.id} className="flex items-center gap-3 rounded-xl border border-[#e4e8e3] bg-[#fafbf9] p-3 transition hover:bg-white">
                <input
                  type="checkbox"
                  checked={localRequest.schemes.includes(scheme.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setLocalRequest({ ...localRequest, schemes: [...localRequest.schemes, scheme.id] })
                    } else {
                      setLocalRequest({ ...localRequest, schemes: localRequest.schemes.filter(s => s !== scheme.id) })
                    }
                  }}
                  className="size-4 rounded border-[#c6d6cd] text-[#2c6b5c]"
                  disabled={humanAssistance?.status === 'submitted'}
                />
                <span className="text-[11px] font-semibold text-[#2d3b35]">{scheme.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-[11px] font-bold text-[#34423c]">
            Information to share <span className="text-[#c64536]">*</span>
          </p>
          <div className="space-y-2">
            {infoOptions.map((option) => (
              <label key={option} className="flex items-center gap-3 rounded-xl border border-[#e4e8e3] bg-[#fafbf9] p-3 transition hover:bg-white">
                <input
                  type="checkbox"
                  checked={localRequest.infoToShare.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setLocalRequest({ ...localRequest, infoToShare: [...localRequest.infoToShare, option] })
                    } else {
                      setLocalRequest({ ...localRequest, infoToShare: localRequest.infoToShare.filter(i => i !== option) })
                    }
                  }}
                  className="size-4 rounded border-[#c6d6cd] text-[#2c6b5c]"
                  disabled={humanAssistance?.status === 'submitted'}
                />
                <span className="text-[11px] font-semibold text-[#2d3b35]">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={localRequest.consentGiven}
              onChange={(e) => setLocalRequest({ ...localRequest, consentGiven: e.target.checked })}
              className="mt-0.5 size-4 rounded border-[#c6d6cd] text-[#2c6b5c]"
              disabled={humanAssistance?.status === 'submitted'}
            />
            <div>
              <span className="text-[11px] font-bold text-[#926116]">
                Consent to share information <span className="text-[#c64536]">*</span>
              </span>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                I consent to sharing the selected information with authorized experts or institution representatives 
                for assistance purposes. Information will be handled according to privacy policies.
              </p>
            </div>
          </label>
        </div>

        {(!humanAssistance || humanAssistance.status === 'draft') && (
          <button
            onClick={handleSubmit}
            disabled={!localRequest.assistanceType || !localRequest.reason || localRequest.infoToShare.length === 0 || !localRequest.consentGiven}
            className="w-full rounded-xl bg-[#183d35] px-4 py-3 text-[10px] font-bold text-white transition hover:bg-[#24564a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit assistance request
          </button>
        )}
      </div>
    </>
  )
}
