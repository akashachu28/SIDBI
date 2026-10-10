'use client'

import React from 'react'
import { useMarketReady } from '../../context/MarketReadyContext'
import Icon from '../Icon'
import type { MarketObjectiveType } from '../../types'

export default function StepMarketObjective() {
  const { marketObjective, setMarketObjective } = useMarketReady()

  const objectives: { value: MarketObjectiveType; title: string; description: string; supported: boolean }[] = [
    {
      value: 'market-opportunities',
      title: 'Find market opportunities',
      description: 'Discover relevant market opportunities for your products or services',
      supported: true
    },
    {
      value: 'tenders',
      title: 'Explore tenders',
      description: 'Find government and institutional tender opportunities',
      supported: true
    },
    {
      value: 'buyer-export',
      title: 'Buyer & export opportunities',
      description: 'Connect with buyers and explore export markets',
      supported: true
    }
  ]

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">What are you looking for?</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Select your market objective to see relevant opportunities. Only options supported in Phase 1 are shown.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <div>
          <p className="mb-2.5 text-[11px] font-bold text-[#34423c]">Select your objective</p>
          <div className="space-y-3">
            {objectives.map((obj) => (
              <button
                key={obj.value}
                onClick={() => obj.supported && setMarketObjective(obj.value)}
                disabled={!obj.supported}
                className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                  marketObjective === obj.value
                    ? "border-[#4b796d] bg-[#eef5f1]"
                    : obj.supported
                    ? "border-[#e4e8e3] hover:border-[#cbd2cd]"
                    : "cursor-not-allowed border-[#e4e8e3] opacity-50"
                }`}
              >
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${
                    marketObjective === obj.value ? "border-[#2c6b5c] bg-[#2c6b5c]" : "border-[#bdc4c0]"
                  }`}
                >
                  {marketObjective === obj.value && (
                    <Icon name="check" className="size-3 text-white" />
                  )}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#2d3b35]">{obj.title}</h3>
                    {obj.supported && (
                      <span className="rounded-full bg-[#e4f0ea] px-2 py-0.5 text-[8px] font-bold text-[#2c6b5c]">
                        Supported
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-[#616c67]">{obj.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {marketObjective && (
          <div className="rounded-2xl border border-[#c6e0d8] bg-[#e4f0ea] p-5">
            <div className="flex items-start gap-3">
              <Icon name="check" className="size-5 text-[#2c6b5c]" />
              <div>
                <p className="text-sm font-bold text-[#2d3b35]">Objective Selected</p>
                <p className="mt-1 text-[11px] text-[#616c67]">
                  We'll show you {marketObjective === 'market-opportunities' ? 'market opportunities' : marketObjective === 'tenders' ? 'tender opportunities' : 'buyer and export opportunities'} based on your business profile.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Phase 1 Notice */}
        <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="info" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold text-[#926116]">Phase 1 Demonstrator</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                This demonstrator shows a limited set of curated opportunities. Full marketplace integration, 
                automated tender matching, and comprehensive buyer databases are outside Phase 1 scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
