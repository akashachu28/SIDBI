'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type IconName =
  | "dashboard"
  | "credit"
  | "schemes"
  | "market"
  | "plan"
  | "progress"
  | "connections"
  | "settings"

const iconPaths: Record<IconName, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  credit: (
    <>
      <path d="M4 18.5V9.8c0-.5.3-1 .8-1.2l6.5-3.8c.4-.2.9-.2 1.3 0l6.5 3.8c.5.2.8.7.8 1.2v8.7" />
      <path d="M2.5 19h19M8 11h8M8 15h8" />
    </>
  ),
  schemes: (
    <>
      <path d="M7 3.5h8.5L20 8v12.5H7z" />
      <path d="M15 3.5V8h5M10 12h7M10 16h7M4 7v13.5" />
    </>
  ),
  market: (
    <>
      <path d="M4 9.5h16l-1.3-5h-13zM5 9.5v10h14v-10" />
      <path d="M8 9.5v3M12 9.5v3M16 9.5v3M9 19.5v-4h6v4" />
    </>
  ),
  plan: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  progress: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  connections: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="17" r="3" />
      <path d="m10.2 10.2 4.6 4.6M16 7h4v4M8 17H4v-4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
}

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

const navItems: { label: string; icon: IconName; href: string; badge?: boolean }[] = [
  { label: "Profile", icon: "dashboard", href: "/dashboard" },
  { label: "Credit Ready", icon: "credit", href: "/journeys/credit-ready", badge: true },
  { label: "Schemes & Compliance", icon: "schemes", href: "/journeys/schemes", badge: true },
  { label: "Market Ready", icon: "market", href: "/journeys/market-ready", badge: true },
]

const manageItems: { label: string; icon: IconName; href: string }[] = [
  { label: "My Action Plan", icon: "plan", href: "/action-plan" },
  { label: "My Progress", icon: "progress", href: "/progress" },
  { label: "Connections", icon: "connections", href: "/connections" },
]

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[252px] flex-col border-r border-[#e3e6e1] bg-[#fbfcf9]">
      {/* Logo/Brand */}
      <div className="flex h-[82px] items-center px-7">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-[10px] bg-[#183d35] text-white">
            <svg viewBox="0 0 32 32" className="size-5" fill="none" aria-hidden="true">
              <path d="M7 22V10l9 7 9-7v12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[21px] font-bold tracking-[-0.04em]">mialo</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3.5 py-4">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa19d]">Workspace</p>
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition ${
                  isActive
                    ? "bg-[#e7efe9] text-[#1d5145]"
                    : "text-[#68716d] hover:bg-[#f0f2ee] hover:text-[#24332e]"
                }`}
              >
                <Icon name={item.icon} className="size-[18px]" />
                {item.label}
                {item.badge && <span className="ml-auto size-1.5 rounded-full bg-[#d0a155]" />}
              </Link>
            )
          })}
        </div>

        {/* <p className="px-3 pb-2 pt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa19d]">Manage</p>
        <div className="space-y-1">
          {manageItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition ${
                  isActive
                    ? "bg-[#e7efe9] text-[#1d5145]"
                    : "text-[#68716d] hover:bg-[#f0f2ee] hover:text-[#24332e]"
                }`}
              >
                <Icon name={item.icon} className="size-[18px]" />
                {item.label}
              </Link>
            )
          })}
        </div> */}
      </nav>

      {/* User Profile Footer */}
      <div className="border-t border-[#e7e9e5] p-3.5">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-[#f0f2ee]">
          <span className="grid size-9 place-items-center rounded-full bg-[#dce9e3] text-xs font-bold text-[#28574c]">AS</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold text-[#26332f]">Vinod</span>
            <span className="block truncate text-[10px] text-[#8a928e]">Mialo Technologies</span>
          </span>
          <Icon name="settings" className="size-4 text-[#8a928e]" />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
