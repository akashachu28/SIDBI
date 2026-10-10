'use client'

import React from 'react'
import { useSchemes } from '../../context/SchemesContext'
import Icon from '../Icon'

export default function StepBusinessObjective() {
  const { businessObjective, setBusinessObjective } = useSchemes()

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Tell us about your business & objectives</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Provide your business profile and support needs to help us identify relevant schemes and programs.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        {/* Business Information */}
        <div>
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Business Name</span>
            <input
              className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
              type="text"
              value={businessObjective.businessName}
              onChange={(e) => setBusinessObjective({
                ...businessObjective,
                businessName: e.target.value
              })}
              placeholder="Enter business name"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Location</span>
              <input
                className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
                type="text"
                value={businessObjective.location}
                onChange={(e) => setBusinessObjective({
                  ...businessObjective,
                  location: e.target.value
                })}
                placeholder="City, State"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Sector</span>
              <input
                className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
                type="text"
                value={businessObjective.sector}
                onChange={(e) => setBusinessObjective({
                  ...businessObjective,
                  sector: e.target.value
                })}
                placeholder="Your sector"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Business Stage</span>
            <select
              className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
              value={businessObjective.businessStage}
              onChange={(e) => setBusinessObjective({
                ...businessObjective,
                businessStage: e.target.value
              })}
            >
              <option>Startup (0-2 years)</option>
              <option>Growing (2-5 years)</option>
              <option>Established (5+ years)</option>
              <option>Mature/Expanding</option>
            </select>
          </label>
        </div>

        <div>
          <p className="mb-2.5 text-[11px] font-bold text-[#34423c]">What's your primary objective?</p>
          <input
            className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            type="text"
            value={businessObjective.objective}
            onChange={(e) => setBusinessObjective({
              ...businessObjective,
              objective: e.target.value
            })}
            placeholder="e.g., Technology upgrade, Market expansion"
          />
        </div>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">What type of support do you need?</span>
          <textarea
            className="min-h-24 w-full resize-none rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-xs leading-5 outline-none transition placeholder:text-[#a1a9a5] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            value={businessObjective.supportNeed}
            onChange={(e) => setBusinessObjective({
              ...businessObjective,
              supportNeed: e.target.value
            })}
            placeholder="Describe the specific support you're looking for..."
          />
        </label>

        {/* Registrations & Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Registrations</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#e4f0ea] text-[#2c6b5c]">
                <Icon name="check" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              {businessObjective.registrations.map((reg, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-[10px] font-semibold text-[#8a928e]">{reg.type}</p>
                  <p className="text-[11px] leading-4 text-[#2d3b35]">{reg.details || reg.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Additional details</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#f7ead7] text-[#aa742c]">
                <Icon name="building" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              {businessObjective.relevantDetails.map((detail, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-[10px] font-semibold text-[#8a928e]">{detail.label}</p>
                  <p className="text-[11px] leading-4 text-[#2d3b35]">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
