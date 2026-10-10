'use client'

import React, { useState } from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import Icon from '../Icon'

const assistanceTypes = [
  { id: 'mentor', label: 'Business mentor', description: 'Guidance on business strategy and growth' },
  { id: 'ca', label: 'Chartered Accountant', description: 'Financial documentation and compliance' },
  { id: 'lender', label: 'Lender connection', description: 'Introduction to suitable financial institutions' },
  { id: 'institution', label: 'Government institution', description: 'Support from SIDBI or related programs' }
]

const suggestedInfo = [
  'Business profile and registration details',
  'Funding goal and intended use',
  'Readiness assessment summary',
  'Current information gaps',
  'Contact information'
]

export default function StepHumanAssistance() {
  const { humanAssistance, setHumanAssistance, showNotice } = useCreditReady()
  const [selectedType, setSelectedType] = useState<string>(humanAssistance?.assistanceType || '')
  const [reason, setReason] = useState<string>(humanAssistance?.reason || '')
  const [selectedInfo, setSelectedInfo] = useState<string[]>(humanAssistance?.infoToShare || [])
  const [consentGiven, setConsentGiven] = useState<boolean>(humanAssistance?.consentGiven || false)

  const toggleInfo = (info: string) => {
    setSelectedInfo(prev =>
      prev.includes(info) ? prev.filter(i => i !== info) : [...prev, info]
    )
  }

  const handleSubmit = () => {
    if (!selectedType || !reason || selectedInfo.length === 0 || !consentGiven) {
      showNotice('Please complete all required fields and provide consent.')
      return
    }

    setHumanAssistance({
      assistanceType: selectedType,
      reason,
      infoToShare: selectedInfo,
      consentGiven,
      status: 'submitted'
    })
    showNotice('Your assistance request has been submitted.')
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Request human assistance</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Ask for suitable support from a mentor, CA, lender, or institution. A connection is not guaranteed.
        </p>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        {/* Assistance Type */}
        <div>
          <label className="mb-3 block text-[11px] font-bold text-[#34423c]">
            What type of assistance would help you?
            <span className="ml-1 text-[#c58a35]">*</span>
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            {assistanceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex flex-col gap-1 rounded-xl border p-4 text-left transition ${
                  selectedType === type.id
                    ? "border-[#4b796d] bg-[#eef5f1]"
                    : "border-[#e1e5e0] hover:border-[#cbd2cd]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`grid size-4 place-items-center rounded-full border ${
                      selectedType === type.id ? "border-[#2c6b5c] bg-[#2c6b5c]" : "border-[#bdc4c0]"
                    }`}
                  >
                    {selectedType === type.id && (
                      <Icon name="check" className="size-2.5 text-white" />
                    )}
                  </span>
                  <span className="text-[11px] font-bold text-[#2d3b35]">{type.label}</span>
                </div>
                <span className="ml-6 text-[10px] text-[#7d8682]">{type.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reason for Request */}
        <div>
          <label className="mb-2 block text-[11px] font-bold text-[#34423c]">
            Why would this support help you?
            <span className="ml-1 text-[#c58a35]">*</span>
          </label>
          <textarea
            className="min-h-32 w-full resize-none rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-xs leading-5 outline-none transition placeholder:text-[#a1a9a5] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain how this assistance would benefit your business and funding journey..."
          />
          <p className="mt-1.5 text-[9px] text-[#929a96]">
            Be specific about what kind of support you need and what you hope to achieve.
          </p>
        </div>

        {/* Information to Share */}
        <div>
          <label className="mb-3 block text-[11px] font-bold text-[#34423c]">
            What information can we share?
            <span className="ml-1 text-[#c58a35]">*</span>
          </label>
          <p className="mb-3 text-[10px] text-[#7d8682]">
            Select the information we can share with the assigned support person or organization.
          </p>
          <div className="space-y-2">
            {suggestedInfo.map((info) => (
              <button
                key={info}
                onClick={() => toggleInfo(info)}
                className="flex w-full items-center gap-3 rounded-xl border border-[#e8ebe7] p-3 text-left transition hover:border-[#cbd4ce] hover:bg-[#fafbf9]"
              >
                <span
                  className={`grid size-5 place-items-center rounded-md border ${
                    selectedInfo.includes(info)
                      ? 'border-[#2c6b5c] bg-[#2c6b5c] text-white'
                      : 'border-[#d9ded9]'
                  }`}
                >
                  {selectedInfo.includes(info) && <Icon name="check" className="size-3" />}
                </span>
                <span className="flex-1 text-[11px] text-[#46524d]">{info}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Consent */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
          <button
            onClick={() => setConsentGiven(!consentGiven)}
            className="flex w-full items-start gap-3 text-left"
          >
            <span
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border ${
                consentGiven
                  ? 'border-[#2c6b5c] bg-[#2c6b5c] text-white'
                  : 'border-[#d9ded9]'
              }`}
            >
              {consentGiven && <Icon name="check" className="size-3" />}
            </span>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-[#2d3b35]">
                I consent to sharing the selected information
                <span className="ml-1 text-[#c58a35]">*</span>
              </p>
              <p className="mt-1 text-[10px] leading-4 text-[#7d8682]">
                By checking this box, I authorize Mialo to share the information selected above with a suitable mentor, advisor, lender, or institution for the purpose of providing me with relevant assistance. I understand that this does not guarantee a connection or any specific outcome.
              </p>
            </div>
          </button>
        </div>

        {/* Important Notes */}
        <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="info" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold">Important to know</p>
              <ul className="mt-2 space-y-1.5 text-[10px] leading-4 text-[#7b6c57]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1 shrink-0 rounded-full bg-[#d0a155]" />
                  <span>A referral is not guaranteed and depends on availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1 shrink-0 rounded-full bg-[#d0a155]" />
                  <span>Response time may vary based on the type of assistance requested</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1 shrink-0 rounded-full bg-[#d0a155]" />
                  <span>You can review and update your consent at any time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedType || !reason || selectedInfo.length === 0 || !consentGiven}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#183d35] px-5 py-3 text-[11px] font-bold text-white transition hover:bg-[#24564a] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="user" className="size-4" />
          Submit assistance request
        </button>

        {/* Request Status */}
        {humanAssistance?.status && humanAssistance.status !== 'draft' && (
          <div className="rounded-2xl border border-[#d6e8dd] bg-[#f5faf7] p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-[#e4f0ea] text-[#2c6b5c]">
                <Icon name="check" className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-[#2d3b35]">Request submitted</p>
                <p className="mt-1 text-[10px] text-[#7d8682]">
                  Your assistance request has been submitted. We&apos;ll notify you when there&apos;s an update.
                </p>
                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8a928e]">
                  Status: <span className="text-[#2c6b5c]">{humanAssistance.status}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
