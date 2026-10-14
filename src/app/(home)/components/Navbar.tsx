'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

type IconName = "search" | "bell" | "menu"

const iconPaths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  bell: (
    <>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8.5h18C21 16 18 16 18 9ZM10 21h4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
}

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

const Navbar = () => {
  const pathname = usePathname()

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/credit-ready') return 'Credit Ready'
    if (pathname === '/schemes') return 'Schemes & Compliance'
    if (pathname === '/market-ready') return 'Market Ready'
    if (pathname === '/action-plan') return 'My Action Plan'
    if (pathname === '/progress') return 'My Progress'
    if (pathname === '/connections') return 'Connections'
    return 'Dashboard'
  }

  const getPageSubtitle = () => {
    if (pathname === '/dashboard') return 'Your business growth workspace'
    if (pathname === '/credit-ready') return 'Journey A · Funding readiness'
    if (pathname === '/schemes') return 'Journey B · Government schemes'
    if (pathname === '/market-ready') return 'Journey C · Market opportunities'
    return 'Your business growth workspace'
  }

  return (
    <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-[#e2e8f0] bg-white/95 px-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-[#64748b] transition-colors hover:bg-[#f8fafc] hover:text-[#0f172a] lg:hidden" aria-label="Open navigation">
          <Icon name="menu" />
        </button>
        <div>
          <p className="text-sm font-bold tracking-[-0.01em] text-[#0f172a]">{getPageTitle()}</p>
          <p className="hidden text-[11px] text-[#64748b] sm:block">{getPageSubtitle()}</p>
        </div>
      </div>
      {/* <div className="flex items-center gap-2">
        <button className="hidden items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-2 text-xs font-medium text-[#64748b] shadow-sm transition-all hover:border-[#3b82f6]/30 hover:text-[#0f172a] sm:flex">
          <Icon name="search" className="size-4" />
          Search
          <span className="ml-5 rounded border border-[#e2e8f0] bg-[#f8fafc] px-1.5 py-0.5 text-[9px] text-[#94a3b8]">⌘ K</span>
        </button>
        <button className="relative rounded-xl border border-[#e2e8f0] bg-white p-2.5 text-[#64748b] shadow-sm transition-all hover:border-[#3b82f6]/30 hover:text-[#3b82f6]" aria-label="Notifications">
          <Icon name="bell" className="size-[18px]" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#3b82f6] ring-2 ring-white" />
        </button>
      </div> */}
    </header>
  )
}

export default Navbar
