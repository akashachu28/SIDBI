'use client'

import React from 'react'
import Link from 'next/link'
import Icon from './Icon'
import { useSchemes } from '../context/SchemesContext'

export default function SchemesHeader() {
  const { businessObjective, progressSummary } = useSchemes()

  return (
    <>
      <Link href="/dashboard" className="mb-5 flex items-center gap-2 text-xs font-bold text-[#68736e] transition hover:text-[#24594d]">
        <span className="rotate-180"><Icon name="arrow" className="size-4" /></span>
        Back to dashboard
      </Link>

      <section className="relative overflow-hidden rounded-[22px] bg-[#183d35] px-6 py-6 text-white sm:px-8 sm:py-7">
        <div className="absolute -right-12 -top-24 size-64 rounded-full border border-white/10" />
        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-white/10"><Icon name="schemes" className="size-4" /></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b9d0c9]">Journey B</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold text-white/80">In progress</span>
            </div>
            <h1 className="text-[29px] font-semibold tracking-[-0.04em] sm:text-[34px]">Schemes & Compliance</h1>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[#c7d7d2]">
              Identify potentially relevant schemes using curated sources, assess eligibility criteria, explain evidence, and create next actions.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-2xl bg-white/8 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between text-[10px]">
              <span className="font-semibold text-[#d2dfdb]">Discovery progress</span>
              <span className="font-bold">{progressSummary.likelyRelevant} of {progressSummary.totalSchemesFound} relevant</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/10 p-2.5 text-center backdrop-blur-sm">
                <div className="text-lg font-bold">{progressSummary.totalSchemesFound}</div>
                <div className="text-[9px] text-[#aec5be]">Schemes found</div>
              </div>
              <div className="rounded-lg bg-white/10 p-2.5 text-center backdrop-blur-sm">
                <div className="text-lg font-bold text-[#b9d9c8]">{progressSummary.likelyRelevant}</div>
                <div className="text-[9px] text-[#aec5be]">Likely relevant</div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[9px] text-[#aec5be]">
              <span>Last saved today, 10:42 AM</span>
              <span className="flex items-center gap-1 text-[#dce8e4]"><Icon name="check" className="size-3" /> Saved</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
