'use client'

import Link from 'next/link'
import Icon from './Icon'

export default function SchemesHeader({ 
  savedCount = 0, 
  actionPlanCount = 0 
}: { 
  savedCount?: number
  actionPlanCount?: number 
}) {

  return (
    <>
      <Link href="/dashboard" className="mb-5 flex items-center gap-2 text-xs font-bold text-[#64748b] transition hover:text-[#3b82f6]">
        <span className="rotate-180"><Icon name="arrow" className="size-4" /></span>
        Back to dashboard
      </Link>

      <section className="relative overflow-hidden rounded-[22px] border border-[#e2e8f0] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-6 py-6 text-white shadow-[0_8px_24px_rgba(15,23,42,0.15)] sm:px-8 sm:py-7">
        {/* Decorative Elements */}
        <div className="absolute -right-12 -top-24 size-64 rounded-full border border-white/5" />
        <div className="absolute -right-8 top-8 size-48 rounded-full border border-[#3b82f6]/10" />
        <div className="absolute right-20 top-16 size-24 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-transparent blur-2xl" />
        
        {/* Flowing Line */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="schemesHeaderLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 40 Q 200 20 400 40 T 800 40" stroke="url(#schemesHeaderLine)" strokeWidth="2" fill="none" />
        </svg>

        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-[#3b82f6]/20 backdrop-blur-sm">
                <Icon name="schemes" className="size-4 text-[#60a5fa]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#94a3b8]">Journey B</span>
              <span className="rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2.5 py-1 text-[9px] font-semibold text-[#93c5fd] backdrop-blur-sm">In progress</span>
            </div>
            <h1 className="text-[29px] font-bold tracking-[-0.04em] sm:text-[34px]">Schemes & Compliance</h1>
            <p className="mt-2 max-w-xl text-xs leading-5 text-white/70">
              Identify potentially relevant schemes using curated sources, assess eligibility criteria, explain evidence, and create next actions.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="mb-3 grid grid-cols-2 gap-3">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('showSavedSchemes'))}
                className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-center backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="text-lg font-bold">{savedCount}</div>
                <div className="text-[9px] text-white/60">Saved</div>
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('showActionPlans'))}
                className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-center backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="text-lg font-bold text-[#60a5fa]">{actionPlanCount}</div>
                <div className="text-[9px] text-white/60">Action Plans</div>
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-[9px] text-white/60">
              <span>Last saved today, 10:42 AM</span>
              <span className="flex items-center gap-1 text-[#60a5fa]">
                <Icon name="check" className="size-3" /> Saved
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
