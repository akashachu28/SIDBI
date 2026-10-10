'use client'

import React from 'react'
import { useMarketReady } from '../../context/MarketReadyContext'
import Icon from '../Icon'

export default function StepBusinessProduct() {
  const { businessProduct, setBusinessProduct } = useMarketReady()

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Tell us about your business & product</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Provide your business profile and product/service details to help us find relevant market opportunities.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Business Name</span>
          <input
            className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            type="text"
            value={businessProduct.businessName}
            onChange={(e) => setBusinessProduct({
              ...businessProduct,
              businessName: e.target.value
            })}
            placeholder="Enter business name"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Sector</span>
            <input
              className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
              type="text"
              value={businessProduct.sector}
              onChange={(e) => setBusinessProduct({
                ...businessProduct,
                sector: e.target.value
              })}
              placeholder="Your sector"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Location</span>
            <input
              className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
              type="text"
              value={businessProduct.location}
              onChange={(e) => setBusinessProduct({
                ...businessProduct,
                location: e.target.value
              })}
              placeholder="City, State"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Product / Service</span>
          <input
            className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            type="text"
            value={businessProduct.productService}
            onChange={(e) => setBusinessProduct({
              ...businessProduct,
              productService: e.target.value
            })}
            placeholder="What do you offer?"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Tell us more about your offering</span>
          <textarea
            className="min-h-24 w-full resize-none rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-xs leading-5 outline-none transition placeholder:text-[#a1a9a5] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            value={businessProduct.description}
            onChange={(e) => setBusinessProduct({
              ...businessProduct,
              description: e.target.value
            })}
            placeholder="Describe your product or service, target markets, unique features..."
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Market Objective</span>
          <input
            className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition placeholder:text-[#afb5b1] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            type="text"
            value={businessProduct.marketObjective}
            onChange={(e) => setBusinessProduct({
              ...businessProduct,
              marketObjective: e.target.value
            })}
            placeholder="e.g., Expand to export markets, Find domestic buyers"
          />
        </label>

        {/* Profile Summary Card */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-[#2d3b35]">Profile Summary</p>
            <span className="grid size-7 place-items-center rounded-lg bg-[#e4f0ea] text-[#2c6b5c]">
              <Icon name="check" className="size-3.5" />
            </span>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Business</p>
              <p className="text-[11px] leading-4 text-[#2d3b35]">{businessProduct.businessName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Product/Service</p>
              <p className="text-[11px] leading-4 text-[#2d3b35]">{businessProduct.productService}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-[#8a928e]">Sector & Location</p>
              <p className="text-[11px] leading-4 text-[#2d3b35]">{businessProduct.sector} · {businessProduct.location}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
