import React from "react"

export type IconName = "dashboard" | "credit" | "schemes" | "market" | "sparkles" | "mic" | "upload" | "building" | "progress" | "arrow" | "check" | "clock" | "lock" | "info" | "document" | "user"

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
  sparkles: <><path d="m12 3 1.3 4.2L17.5 9l-4.2 1.7L12 15l-1.3-4.3L6.5 9l4.2-1.8zM19 15l.6 2 1.9.8-1.9.8-.6 1.9-.6-1.9-1.9-.8 1.9-.8z" /></>,
  mic: <><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" /></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></>,
  building: <><path d="M4 21V6l8-3 8 3v15M8 9h2M14 9h2M8 13h2M14 13h2M9 21v-4h6v4" /></>,
  progress: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M9 11V7a3 3 0 0 1 6 0v4" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></>,
  document: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>,
  user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
}

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}
