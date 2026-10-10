import React, { type ReactNode } from 'react'

export type IconName =
  | "credit"
  | "arrow"
  | "check"
  | "clock"
  | "sparkles"
  | "progress"
  | "schemes"
  | "upload"
  | "document"
  | "alert"
  | "info"
  | "close"
  | "edit"
  | "download"
  | "user"
  | "building"
  | "refresh"
  | "market"

const iconPaths: Record<IconName, ReactNode> = {
  credit: (
    <>
      <path d="M4 18.5V9.8c0-.5.3-1 .8-1.2l6.5-3.8c.4-.2.9-.2 1.3 0l6.5 3.8c.5.2.8.7.8 1.2v8.7" />
      <path d="M2.5 19h19M8 11h8M8 15h8" />
    </>
  ),
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sparkles: <><path d="m12 3 1.3 4.2L17.5 9l-4.2 1.7L12 15l-1.3-4.3L6.5 9l4.2-1.8zM19 15l.6 2 1.9.8-1.9.8-.6 1.9-.6-1.9-1.9-.8 1.9-.8z" /></>,
  progress: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  schemes: (
    <>
      <path d="M7 3.5h8.5L20 8v12.5H7z" />
      <path d="M15 3.5V8h5M10 12h7M10 16h7M4 7v13.5" />
    </>
  ),
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></>,
  document: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /></>,
  alert: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><circle cx="12" cy="17" r="0.5" /></>,
  info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><circle cx="12" cy="8" r="0.5" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
  user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  building: <><path d="M4 21V6l8-3 8 3v15M8 9h2M14 9h2M8 13h2M14 13h2M9 21v-4h6v4" /></>,
  refresh: <><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></>,
  market: (
    <>
      <path d="M4 9.5h16l-1.3-5h-13zM5 9.5v10h14v-10" />
      <path d="M8 9.5v3M12 9.5v3M16 9.5v3M9 19.5v-4h6v4" />
    </>
  ),
}

export default function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}
