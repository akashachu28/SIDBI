'use client'

import React from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import Icon from '../Icon'

export default function StepBusinessProfile() {
  const { businessProfile } = useCreditReady()

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Review your business profile</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          We&apos;ll reuse information you have already shared. Confirm it, correct it, or mark optional details as unknown.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Business Identity */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Business identity</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#e4f0ea] text-[#2c6b5c]">
                <Icon name="check" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-[#8a928e]">Business name & type</p>
                <p className="text-[11px] leading-4 text-[#2d3b35]">
                  {businessProfile.businessName} · {businessProfile.businessType}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-[#8a928e]">Sector</p>
                <p className="text-[11px] leading-4 text-[#2d3b35]">{businessProfile.sector}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-[#8a928e]">Location</p>
                <p className="text-[11px] leading-4 text-[#2d3b35]">{businessProfile.location}</p>
              </div>
            </div>
          </div>

          {/* Business Context */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Business context</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#f7ead7] text-[#aa742c]">
                <Icon name="clock" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#4f8678]" />
                Operating for {businessProfile.yearsOfOperation} years
              </div>
              {businessProfile.registrations.map((reg, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#4f8678]" />
                  {reg.type} {reg.confirmed ? 'confirmed' : reg.status}
                </div>
              ))}
              {businessProfile.financialDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#d0a155]" />
                  {detail.label} {detail.verified ? 'verified' : 'need review'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="mt-5 rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-[#2d3b35]">Need to update your information?</h3>
              <p className="mt-1 text-[11px] text-[#7d8682]">
                You can edit any field, mark items as unknown, or skip optional details.
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-[#dce1dc] bg-white px-4 py-2 text-[10px] font-bold text-[#52605a] transition hover:border-[#aebbb5]">
              <Icon name="edit" className="size-3.5" />
              Edit profile
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
