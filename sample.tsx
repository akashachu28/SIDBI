import { useMemo, useState, type ReactNode } from "react";

type IconName =
  | "dashboard"
  | "credit"
  | "schemes"
  | "market"
  | "plan"
  | "progress"
  | "connections"
  | "settings"
  | "search"
  | "bell"
  | "arrow"
  | "check"
  | "clock"
  | "building"
  | "menu"
  | "close"
  | "sparkles";

const iconPaths: Record<IconName, ReactNode> = {
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
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  bell: (
    <>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8.5h18C21 16 18 16 18 9ZM10 21h4" />
    </>
  ),
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  building: <><path d="M4 21V6l8-3 8 3v15M8 9h2M14 9h2M8 13h2M14 13h2M9 21v-4h6v4" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  sparkles: <><path d="m12 3 1.3 4.2L17.5 9l-4.2 1.7L12 15l-1.3-4.3L6.5 9l4.2-1.8zM19 15l.6 2 1.9.8-1.9.8-.6 1.9-.6-1.9-1.9-.8 1.9-.8z" /></>,
};

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

type Journey = {
  id: string;
  letter: string;
  title: string;
  description: string;
  icon: IconName;
  progress: number;
  status: "In progress" | "Needs input" | "Not started" | "Completed";
  checkpoint: string;
  updated: string;
  accent: string;
  iconBg: string;
};

const initialJourneys: Journey[] = [
  {
    id: "credit",
    letter: "A",
    title: "Credit Ready",
    description: "Understand your funding readiness and prepare for meaningful lender conversations.",
    icon: "credit",
    progress: 64,
    status: "In progress",
    checkpoint: "Information & document gaps",
    updated: "Today, 10:42 AM",
    accent: "bg-[#2c6b5c]",
    iconBg: "bg-[#e0eee9] text-[#24594d]",
  },
  {
    id: "schemes",
    letter: "B",
    title: "Schemes & Compliance",
    description: "Discover relevant schemes, assess eligibility and organise your next actions.",
    icon: "schemes",
    progress: 38,
    status: "Needs input",
    checkpoint: "Eligibility assessment",
    updated: "Yesterday, 4:18 PM",
    accent: "bg-[#c58a35]",
    iconBg: "bg-[#f8ebd8] text-[#9a6828]",
  },
  {
    id: "market",
    letter: "C",
    title: "Market Ready",
    description: "Explore opportunities and build a clear buyer or proposal readiness checklist.",
    icon: "market",
    progress: 0,
    status: "Not started",
    checkpoint: "Business & product",
    updated: "Not started",
    accent: "bg-[#68758f]",
    iconBg: "bg-[#e8ebf1] text-[#515f79]",
  },
];

const navItems: { label: string; icon: IconName }[] = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Credit Ready", icon: "credit" },
  { label: "Schemes & Compliance", icon: "schemes" },
  { label: "Market Ready", icon: "market" },
  { label: "My Action Plan", icon: "plan" },
  { label: "My Progress", icon: "progress" },
  { label: "Connections", icon: "connections" },
];

function StatusPill({ status }: { status: Journey["status"] }) {
  const styles = {
    "In progress": "bg-[#edf5f2] text-[#296052]",
    "Needs input": "bg-[#fff4e2] text-[#946322]",
    "Not started": "bg-[#f1f2f3] text-[#67706c]",
    Completed: "bg-[#e9f5e7] text-[#376b32]",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] ${styles[status]}`}>
      <span className={`size-1.5 rounded-full ${status === "Needs input" ? "bg-[#c58a35]" : status === "Not started" ? "bg-[#929a96]" : "bg-[#2c6b5c]"}`} />
      {status}
    </span>
  );
}

function ProgressBar({ value, accent = "bg-[#2c6b5c]" }: { value: number; accent?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8ebe8]" aria-label={`${value}% complete`}>
      <div className={`h-full rounded-full transition-all duration-500 ${accent}`} style={{ width: `${value}%` }} />
    </div>
  );
}

const creditSteps = [
  { title: "Funding Goal", detail: "Amount and intended use", state: "complete" },
  { title: "Business Profile", detail: "Confirm business details", state: "complete" },
  { title: "Information & Gaps", detail: "Review missing inputs", state: "current" },
  { title: "Upload Documents", detail: "Add supporting files", state: "upcoming" },
  { title: "Review Information", detail: "Verify extracted details", state: "upcoming" },
  { title: "Readiness Assessment", detail: "Understand your position", state: "upcoming" },
  { title: "Funding Checklist", detail: "Prepare useful artefacts", state: "upcoming" },
  { title: "Human Assistance", detail: "Request expert support", state: "upcoming" },
  { title: "Review & Save", detail: "Review your journey", state: "upcoming" },
];

const stepDetails = [
  {
    eyebrow: "Define your requirement",
    title: "What are you seeking funding for?",
    description: "A clear goal helps us organise the information and documents that may be useful in a funding conversation.",
    sections: [],
  },
  {
    eyebrow: "Confirm your information",
    title: "Review your business profile",
    description: "We’ll reuse information you have already shared. Confirm it, correct it, or mark optional details as unknown.",
    sections: [
      { title: "Business identity", items: ["Sharma Handlooms · Sole proprietorship", "Textiles & handloom manufacturing", "Jaipur, Rajasthan"] },
      { title: "Business context", items: ["Operating for 6 years", "Udyam registration confirmed", "Financial details need review"] },
    ],
  },
  {
    eyebrow: "Your current checkpoint",
    title: "Close the important information gaps",
    description: "These items may help make your funding discussion more complete. Add what you have or tell us when something is unavailable.",
    sections: [
      { title: "Information available", items: ["Business registration details", "Funding goal and intended use", "Last financial year turnover"] },
      { title: "Still needed", items: ["Latest 6-month bank statement", "Current outstanding loan details", "Machinery supplier quotation"] },
    ],
  },
  {
    eyebrow: "Secure document centre",
    title: "Add your supporting documents",
    description: "Upload selected files and track their processing status. Extracted information will always require your confirmation.",
    sections: [
      { title: "Recommended now", items: ["Bank statement · PDF", "Supplier quotation · PDF or image", "Latest GST return · PDF"] },
      { title: "Privacy", items: ["Files stay private and authorised", "You can retry recoverable upload failures", "Nothing is marked verified without confirmation"] },
    ],
  },
  {
    eyebrow: "Verify before use",
    title: "Review extracted information",
    description: "Check values against their source documents. Edit anything inaccurate and confirm only what you recognise.",
    sections: [
      { title: "Ready to review", items: ["Annual turnover · GST return", "Average monthly balance · Bank statement", "Equipment cost · Supplier quotation"] },
      { title: "Verification states", items: ["User confirmed", "Needs your review", "Not yet available"] },
    ],
  },
  {
    eyebrow: "Preliminary guidance",
    title: "Understand your funding readiness",
    description: "See a transparent summary of confirmed facts, gaps, unknowns, and practical next actions.",
    sections: [
      { title: "Current strengths", items: ["Clear working-capital purpose", "Established operating history", "Core registration details confirmed"] },
      { title: "Areas to strengthen", items: ["Add recent banking evidence", "Confirm current liabilities", "Document expected use of funds"] },
    ],
  },
  {
    eyebrow: "Prepare useful artefacts",
    title: "Build your funding checklist",
    description: "Bring your confirmed information together into a practical checklist and a preliminary DPR outline.",
    sections: [
      { title: "Readiness checklist", items: ["Business KYC and registrations", "Financial and banking documents", "Funding-use evidence"] },
      { title: "DPR outline", items: ["Business overview", "Funding requirement", "Use of funds and expected impact"] },
    ],
  },
  {
    eyebrow: "Optional expert support",
    title: "Request human assistance",
    description: "Ask for suitable support from a mentor, CA, lender, or institution. A connection is not guaranteed.",
    sections: [
      { title: "Your request", items: ["Choose the type of assistance", "Explain why support would help", "Review information proposed for sharing"] },
      { title: "Consent and status", items: ["Consent is required before sharing", "You can review the sharing scope", "Referral status will appear here"] },
    ],
  },
  {
    eyebrow: "Final checkpoint",
    title: "Review and save your journey",
    description: "Review completed steps, outstanding gaps, and your current progress before saving this version.",
    sections: [
      { title: "Journey summary", items: ["Completed required steps", "Outstanding information gaps", "Current readiness progress"] },
      { title: "What happens next", items: ["Revisit supported steps", "Download available artefacts", "Continue outstanding actions later"] },
    ],
  },
];

function CreditReadyPage({
  onBack,
  onNotice,
}: {
  onBack: () => void;
  onNotice: (message: string) => void;
}) {
  const [activeStep, setActiveStep] = useState(2);
  const [fundingUse, setFundingUse] = useState("Working capital");
  const [inputMode, setInputMode] = useState("Guided form");
  const detail = stepDetails[activeStep];

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 lg:py-8">
      <button className="mb-5 flex items-center gap-2 text-xs font-bold text-[#68736e] transition hover:text-[#24594d]" onClick={onBack}>
        <span className="rotate-180"><Icon name="arrow" className="size-4" /></span>
        Back to dashboard
      </button>

      <section className="relative overflow-hidden rounded-[22px] bg-[#183d35] px-6 py-6 text-white sm:px-8 sm:py-7">
        <div className="absolute -right-12 -top-24 size-64 rounded-full border border-white/10" />
        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-white/10"><Icon name="credit" className="size-4" /></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b9d0c9]">Journey A</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold text-white/80">In progress</span>
            </div>
            <h1 className="text-[29px] font-semibold tracking-[-0.04em] sm:text-[34px]">Credit Ready</h1>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[#c7d7d2]">
              Build a preliminary funding-readiness view, identify important gaps, and prepare for a more useful funding discussion.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-2xl bg-white/[0.08] p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between text-[10px]">
              <span className="font-semibold text-[#d2dfdb]">Journey progress</span>
              <span className="font-bold">64%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[64%] rounded-full bg-[#b9d9c8]" /></div>
            <div className="mt-3 flex items-center justify-between text-[9px] text-[#aec5be]">
              <span>Last saved today, 10:42 AM</span>
              <span className="flex items-center gap-1 text-[#dce8e4]"><Icon name="check" className="size-3" /> Saved</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[270px_minmax(0,1fr)_280px]">
        <aside className="self-start rounded-[20px] border border-[#dfe3de] bg-white p-3 xl:sticky xl:top-[90px]">
          <div className="px-3 pb-3 pt-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#929a96]">Journey steps</p>
            <p className="mt-1 text-[11px] text-[#7d8682]">Complete required steps in order.</p>
          </div>
          <div className="space-y-1">
            {creditSteps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${activeStep === index ? "bg-[#e8f0eb]" : "hover:bg-[#f5f6f3]"}`}
              >
                <span className={`grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${step.state === "complete" ? "bg-[#2c6b5c] text-white" : activeStep === index ? "border border-[#2c6b5c] bg-white text-[#24594d]" : "border border-[#dfe3df] bg-white text-[#8d9691]"}`}>
                  {step.state === "complete" ? <Icon name="check" className="size-3.5" /> : index + 1}
                </span>
                <span className="min-w-0">
                  <span className={`block truncate text-[11px] font-bold ${activeStep === index ? "text-[#204d42]" : "text-[#46524d]"}`}>{step.title}</span>
                  <span className="block truncate text-[9px] text-[#929a96]">{step.detail}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="overflow-hidden rounded-[20px] border border-[#dfe3de] bg-white">
          <div className="border-b border-[#e9ece8] px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2c6b5c]">Step {activeStep + 1} of 9 · {detail.eyebrow}</span>
              <span className="hidden rounded-full bg-[#f2f4f1] px-2.5 py-1 text-[9px] font-semibold text-[#747e79] sm:block">Required step</span>
            </div>
            <h2 className="mt-2 text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">{detail.title}</h2>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">{detail.description}</p>
          </div>

          {activeStep === 0 ? (
            <div className="space-y-7 p-6 sm:p-8">
              <label className="block">
                <span className="mb-2 block text-[11px] font-bold text-[#34423c]">How much funding are you looking for?</span>
                <span className="flex overflow-hidden rounded-xl border border-[#dce1dc] bg-[#fafbf9] focus-within:border-[#4c7b6f] focus-within:ring-2 focus-within:ring-[#dce9e3]">
                  <span className="flex items-center border-r border-[#e0e4df] px-4 text-sm font-semibold text-[#63706a]">₹</span>
                  <input className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm font-semibold outline-none placeholder:text-[#afb5b1]" defaultValue="12,00,000" placeholder="Enter an amount" />
                  <span className="flex items-center px-4 text-[10px] font-semibold text-[#8b938f]">INR</span>
                </span>
                <span className="mt-1.5 block text-[9px] text-[#929a96]">An estimate is fine. You can update this later.</span>
              </label>

              <div>
                <p className="mb-2.5 text-[11px] font-bold text-[#34423c]">What will the funding be used for?</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {["Working capital", "Machinery & equipment", "Business expansion", "Other purpose"].map((use) => (
                    <button key={use} onClick={() => setFundingUse(use)} className={`flex items-center gap-3 rounded-xl border p-3 text-left text-[11px] font-semibold transition ${fundingUse === use ? "border-[#4b796d] bg-[#eef5f1] text-[#24594d]" : "border-[#e1e5e0] hover:border-[#cbd2cd]"}`}>
                      <span className={`grid size-4 place-items-center rounded-full border ${fundingUse === use ? "border-[#2c6b5c] bg-[#2c6b5c] text-white" : "border-[#bdc4c0]"}`}>{fundingUse === use && <Icon name="check" className="size-2.5" />}</span>
                      {use}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Tell us a little more about your purpose</span>
                <textarea className="min-h-24 w-full resize-none rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-xs leading-5 outline-none transition placeholder:text-[#a1a9a5] focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]" defaultValue="Purchase raw materials and support seasonal production for upcoming wholesale orders." />
              </label>

              <div>
                <p className="mb-2.5 text-[11px] font-bold text-[#34423c]">How would you like to provide information?</p>
                <div className="flex flex-wrap gap-2">
                  {["Guided form", "Write in my own words", "Voice input"].map((mode) => (
                    <button key={mode} onClick={() => setInputMode(mode)} className={`rounded-full border px-3.5 py-2 text-[10px] font-bold transition ${inputMode === mode ? "border-[#2c6b5c] bg-[#2c6b5c] text-white" : "border-[#dce1dc] text-[#68736e] hover:border-[#aebbb5]"}`}>{mode}</button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                {detail.sections.map((section, sectionIndex) => (
                  <div key={section.title} className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs font-bold text-[#2d3b35]">{section.title}</p>
                      <span className={`grid size-7 place-items-center rounded-lg ${sectionIndex === 0 ? "bg-[#e4f0ea] text-[#2c6b5c]" : "bg-[#f7ead7] text-[#aa742c]"}`}>
                        <Icon name={sectionIndex === 0 ? "check" : "clock"} className="size-3.5" />
                      </span>
                    </div>
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
                          <span className={`mt-1 size-1.5 shrink-0 rounded-full ${sectionIndex === 0 ? "bg-[#4f8678]" : "bg-[#d0a155]"}`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {activeStep === 2 && (
                <div className="mt-5 rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]"><Icon name="schemes" className="size-4" /></span>
                    <div>
                      <p className="text-[11px] font-bold">Why these items matter</p>
                      <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">Recent statements can help describe cash flow, while quotations connect your requested amount to a clear business use. They do not determine approval.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#e9ece8] bg-[#fcfdfa] px-6 py-4 sm:flex-row sm:items-center sm:px-8">
            <button disabled={activeStep === 0} onClick={() => setActiveStep((step) => Math.max(0, step - 1))} className="rounded-xl border border-[#dce1dc] px-4 py-2.5 text-[10px] font-bold text-[#64706a] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">Previous step</button>
            <div className="flex gap-2">
              <button onClick={() => onNotice("Your progress has been saved.")} className="flex-1 rounded-xl border border-[#d7ddd8] bg-white px-4 py-2.5 text-[10px] font-bold text-[#52605a] transition hover:border-[#aebbb5] sm:flex-none">Save for later</button>
              <button onClick={() => { onNotice("Step saved successfully."); setActiveStep((step) => Math.min(8, step + 1)); }} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#183d35] px-5 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#24564a] sm:flex-none">
                Save & continue <Icon name="arrow" className="size-3.5" />
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-4 self-start xl:sticky xl:top-[90px]">
          <div className="rounded-[20px] border border-[#dfe3de] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold">Readiness snapshot</p>
              <span className="grid size-8 place-items-center rounded-lg bg-[#edf3ef] text-[#2c6b5c]"><Icon name="progress" className="size-4" /></span>
            </div>
            <div className="mt-5 flex items-end gap-2">
              <span className="text-[30px] font-semibold leading-none tracking-[-0.05em]">64%</span>
              <span className="pb-1 text-[9px] text-[#8b938f]">preliminary progress</span>
            </div>
            <div className="mt-4"><ProgressBar value={64} /></div>
            <div className="mt-5 space-y-3 border-t border-[#edf0ec] pt-4">
              <div className="flex justify-between text-[10px]"><span className="text-[#7f8984]">Confirmed facts</span><span className="font-bold">8</span></div>
              <div className="flex justify-between text-[10px]"><span className="text-[#7f8984]">Information gaps</span><span className="font-bold text-[#a56f28]">3</span></div>
              <div className="flex justify-between text-[10px]"><span className="text-[#7f8984]">Documents added</span><span className="font-bold">2 of 5</span></div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#dfe3de] bg-[#f0f4f1] p-5">
            <span className="grid size-8 place-items-center rounded-lg bg-white text-[#365f54]"><Icon name="sparkles" className="size-4" /></span>
            <p className="mt-4 text-[11px] font-bold">Important to know</p>
            <p className="mt-1.5 text-[10px] leading-4 text-[#65736d]">This journey provides preliminary guidance only. It is not loan underwriting, a credit guarantee, or loan approval.</p>
          </div>

          <button onClick={() => { setActiveStep(7); onNotice("Human assistance options are ready to review."); }} className="flex w-full items-center justify-between rounded-[16px] border border-[#dfe3de] bg-white p-4 text-left transition hover:border-[#b9c8c0]">
            <span><span className="block text-[10px] font-bold">Need help?</span><span className="mt-0.5 block text-[9px] text-[#8b938f]">Explore human assistance</span></span>
            <span className="grid size-7 place-items-center rounded-full bg-[#edf3ef] text-[#2c6b5c]"><Icon name="arrow" className="size-3.5" /></span>
          </button>
        </aside>
      </div>
    </div>
  );
}

export default function App() {
  const [journeys, setJourneys] = useState(initialJourneys);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [page, setPage] = useState<"dashboard" | "credit">("dashboard");

  const startedJourneys = useMemo(() => journeys.filter((journey) => journey.progress > 0), [journeys]);
  const averageProgress = Math.round(journeys.reduce((total, journey) => total + journey.progress, 0) / journeys.length);

  const openJourney = (journey: Journey) => {
    if (journey.id === "credit") {
      setPage("credit");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (journey.status === "Not started") {
      setJourneys((current) =>
        current.map((item) =>
          item.id === journey.id
            ? { ...item, progress: 8, status: "In progress", updated: "Saved just now" }
            : item,
        ),
      );
      setNotice(`${journey.title} started at ${journey.checkpoint}.`);
    } else {
      setNotice(`Resuming ${journey.title} at ${journey.checkpoint}.`);
    }
    window.setTimeout(() => setNotice(null), 3600);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f2] text-[#17231f]">
      {notice && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-[#dce6df] bg-white px-4 py-3 text-sm font-medium shadow-[0_12px_30px_rgba(23,35,31,0.12)]">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e1f0e9] text-[#2c6b5c]"><Icon name="check" className="size-4" /></span>
          {notice}
        </div>
      )}

      {mobileOpen && <div className="fixed inset-0 z-30 bg-[#17231f]/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-[#e3e6e1] bg-[#fbfcf9] transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[82px] items-center justify-between px-7">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-[10px] bg-[#183d35] text-white">
              <svg viewBox="0 0 32 32" className="size-5" fill="none" aria-hidden="true">
                <path d="M7 22V10l9 7 9-7v12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[21px] font-bold tracking-[-0.04em]">mialo</span>
          </div>
          <button className="rounded-lg p-2 text-[#6f7974] hover:bg-[#eef0ec] lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation">
            <Icon name="close" />
          </button>
        </div>

        <nav className="flex-1 px-3.5 py-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa19d]">Workspace</p>
          <div className="space-y-1">
            {navItems.slice(0, 4).map((item, index) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition ${(index === 0 && page === "dashboard") || (index === 1 && page === "credit") ? "bg-[#e7efe9] text-[#1d5145]" : "text-[#68716d] hover:bg-[#f0f2ee] hover:text-[#24332e]"}`}
                onClick={() => {
                  if (index === 0) {
                    setPage("dashboard");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else if (index === 1) {
                    setPage("credit");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    setNotice(`${item.label} journey selected.`);
                  }
                  setMobileOpen(false);
                  window.setTimeout(() => setNotice(null), 3000);
                }}
              >
                <Icon name={item.icon} className="size-[18px]" />
                {item.label}
                {index > 0 && index < 3 && <span className="ml-auto size-1.5 rounded-full bg-[#d0a155]" />}
              </button>
            ))}
          </div>

          <p className="px-3 pb-2 pt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9aa19d]">Manage</p>
          <div className="space-y-1">
            {navItems.slice(4).map((item) => (
              <button key={item.label} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-[#68716d] transition hover:bg-[#f0f2ee] hover:text-[#24332e]" onClick={() => setNotice(`${item.label} will open here.`)}>
                <Icon name={item.icon} className="size-[18px]" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-[#e7e9e5] p-3.5">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-[#f0f2ee]">
            <span className="grid size-9 place-items-center rounded-full bg-[#dce9e3] text-xs font-bold text-[#28574c]">AS</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-bold text-[#26332f]">Ananya Sharma</span>
              <span className="block truncate text-[10px] text-[#8a928e]">Sharma Handlooms</span>
            </span>
            <Icon name="settings" className="size-4 text-[#8a928e]" />
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-[#e5e7e3] bg-[#f5f6f2]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-[#47534e] hover:bg-white lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
              <Icon name="menu" />
            </button>
            <div>
              <p className="text-sm font-bold tracking-[-0.01em]">{page === "dashboard" ? "Dashboard" : "Credit Ready"}</p>
              <p className="hidden text-[11px] text-[#8a928e] sm:block">{page === "dashboard" ? "Your business growth workspace" : "Journey A · Funding readiness"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-xl border border-[#dfe2dd] bg-white px-3.5 py-2 text-xs font-medium text-[#7d8581] shadow-sm transition hover:border-[#cbd1cc] sm:flex">
              <Icon name="search" className="size-4" />
              Search
              <span className="ml-5 rounded border border-[#e2e5e1] bg-[#f7f8f5] px-1.5 py-0.5 text-[9px] text-[#929a96]">⌘ K</span>
            </button>
            <button className="relative rounded-xl border border-[#dfe2dd] bg-white p-2.5 text-[#59645f] shadow-sm transition hover:border-[#cbd1cc]" aria-label="Notifications">
              <Icon name="bell" className="size-[18px]" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#c58a35] ring-2 ring-white" />
            </button>
          </div>
        </header>

        {page === "dashboard" ? (
        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <section className="mb-8 grid gap-5 xl:grid-cols-[1fr_330px]">
            <div className="relative overflow-hidden rounded-[22px] bg-[#183d35] px-7 py-7 text-white shadow-[0_18px_44px_rgba(24,61,53,0.13)] sm:px-9 sm:py-8">
              <div className="absolute -right-9 -top-16 size-56 rounded-full border border-white/10" />
              <div className="absolute -right-4 top-2 size-32 rounded-full border border-white/10" />
              <div className="relative">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.04em] text-white/85">
                  <Icon name="sparkles" className="size-3.5" />
                  MSME NAVIGATOR
                </span>
                <h1 className="max-w-xl text-[29px] font-semibold leading-[1.15] tracking-[-0.035em] sm:text-[34px]">Good morning, Ananya.</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#c9d9d4]">You’re making steady progress. Continue your journey or explore the next step for Sharma Handlooms.</p>
              </div>
            </div>

            <div className="rounded-[22px] border border-[#e0e4df] bg-white p-5 shadow-[0_8px_28px_rgba(30,45,39,0.04)]">
              <div className="flex items-start justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-[#edf3ef] text-[#2d6356]"><Icon name="building" className="size-5" /></span>
                <span className="text-xs font-bold text-[#2c6b5c]">72%</span>
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#949c98]">Business profile</p>
              <h2 className="mt-1 text-base font-bold tracking-[-0.02em]">Sharma Handlooms</h2>
              <ProgressBar value={72} />
              <button className="mt-4 flex items-center gap-2 text-xs font-bold text-[#2b6255] transition hover:gap-3" onClick={() => setNotice("Opening your business profile.")}>
                Complete profile <Icon name="arrow" className="size-4" />
              </button>
            </div>
          </section>

          <section className="mb-9">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2c6b5c]">Guided pathways</p>
                <h2 className="mt-1 text-[22px] font-bold tracking-[-0.035em]">Your business journeys</h2>
              </div>
              <p className="hidden max-w-xs text-right text-xs leading-5 text-[#7d8682] md:block">Move at your own pace. Your progress is saved at every checkpoint.</p>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {journeys.map((journey) => (
                <article key={journey.id} className="group flex min-h-[290px] flex-col rounded-[20px] border border-[#dfe3de] bg-white p-5 shadow-[0_6px_24px_rgba(30,45,39,0.035)] transition duration-300 hover:-translate-y-1 hover:border-[#cbd4ce] hover:shadow-[0_16px_34px_rgba(30,45,39,0.08)]">
                  <div className="flex items-start justify-between">
                    <span className={`grid size-11 place-items-center rounded-[13px] ${journey.iconBg}`}><Icon name={journey.icon} className="size-[22px]" /></span>
                    <StatusPill status={journey.status} />
                  </div>
                  <div className="mt-5 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#9aa19d]">Journey {journey.letter}</p>
                    <h3 className="mt-1 text-[18px] font-bold tracking-[-0.025em]">{journey.title}</h3>
                    <p className="mt-2 text-xs leading-[1.65] text-[#727c77]">{journey.description}</p>
                  </div>
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-[10px]">
                      <span className="font-medium text-[#8c9490]">{journey.progress ? `${journey.progress}% complete` : "Ready when you are"}</span>
                      {journey.progress > 0 && <span className="font-bold text-[#47534e]">{journey.progress}%</span>}
                    </div>
                    <ProgressBar value={journey.progress} accent={journey.accent} />
                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#182f29] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#245045]" onClick={() => openJourney(journey)}>
                      {journey.status === "Not started" ? "Start journey" : journey.status === "Completed" ? "Review journey" : "Continue journey"}
                      <Icon name="arrow" className="size-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="grid gap-5 xl:grid-cols-[1.55fr_0.85fr]">
            <section className="rounded-[20px] border border-[#dfe3de] bg-white p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold tracking-[-0.025em]">Resume your progress</h2>
                  <p className="mt-1 text-[11px] text-[#89918d]">Pick up from your latest saved checkpoint.</p>
                </div>
                <button className="text-[11px] font-bold text-[#2c6b5c]" onClick={() => setNotice("All journey progress is visible here.")}>View all</button>
              </div>
              <div className="space-y-2.5">
                {startedJourneys.map((journey) => (
                  <button key={journey.id} onClick={() => openJourney(journey)} className="group flex w-full flex-col gap-4 rounded-[15px] border border-[#e7eae6] p-4 text-left transition hover:border-[#cdd7d1] hover:bg-[#fafbf9] sm:flex-row sm:items-center">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${journey.iconBg}`}><Icon name={journey.icon} className="size-5" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="truncate text-xs font-bold">{journey.title}</span>
                        <span className="text-[10px] font-bold text-[#66706b]">{journey.progress}%</span>
                      </span>
                      <span className="mt-1.5 block"><ProgressBar value={journey.progress} accent={journey.accent} /></span>
                      <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[#8a928e]">
                        <span className="font-semibold text-[#5c6762]">{journey.checkpoint}</span>
                        <span className="size-0.5 rounded-full bg-[#a8aeab]" />
                        <span>{journey.updated}</span>
                      </span>
                    </span>
                    <span className="flex size-8 shrink-0 items-center justify-center self-end rounded-full border border-[#dde2de] text-[#46645b] transition group-hover:border-[#2c6b5c] group-hover:bg-[#2c6b5c] group-hover:text-white sm:self-auto"><Icon name="arrow" className="size-4" /></span>
                  </button>
                ))}
              </div>
            </section>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
              <section className="rounded-[20px] border border-[#dfe3de] bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold tracking-[-0.02em]">Overall progress</h2>
                  <span className="grid size-8 place-items-center rounded-lg bg-[#edf3ef] text-[#2c6b5c]"><Icon name="progress" className="size-4" /></span>
                </div>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-[34px] font-semibold leading-none tracking-[-0.05em]">{averageProgress}%</span>
                  <span className="pb-1 text-[10px] text-[#8b938f]">across all journeys</span>
                </div>
                <div className="mt-4"><ProgressBar value={averageProgress} /></div>
                <div className="mt-5 grid grid-cols-3 divide-x divide-[#e8ebe7]">
                  <div><p className="text-base font-bold">{startedJourneys.length}</p><p className="text-[9px] text-[#8b938f]">Started</p></div>
                  <div className="pl-4"><p className="text-base font-bold">{journeys.filter((j) => j.status === "In progress").length}</p><p className="text-[9px] text-[#8b938f]">In progress</p></div>
                  <div className="pl-4"><p className="text-base font-bold">{journeys.filter((j) => j.status === "Completed").length}</p><p className="text-[9px] text-[#8b938f]">Completed</p></div>
                </div>
              </section>

              <section className="rounded-[20px] border border-[#dfe3de] bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-bold tracking-[-0.02em]">Next actions</h2>
                  <span className="rounded-full bg-[#f3f4f1] px-2 py-1 text-[9px] font-bold text-[#7c8580]">2 pending</span>
                </div>
                <div className="space-y-3">
                  <button className="flex w-full items-start gap-3 text-left" onClick={() => setNotice("Opening document checklist.")}>
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-[#d9ded9] text-[#7c8681]"><Icon name="check" className="size-3" /></span>
                    <span><span className="block text-[11px] font-bold leading-4">Add latest bank statement</span><span className="mt-0.5 flex items-center gap-1 text-[9px] text-[#9aa19d]"><Icon name="clock" className="size-3" /> Credit Ready</span></span>
                  </button>
                  <button className="flex w-full items-start gap-3 border-t border-[#edf0ec] pt-3 text-left" onClick={() => setNotice("Opening eligibility assessment.")}>
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-[#e6d6bd] bg-[#fff8ec] text-[#b17a2d]"><Icon name="clock" className="size-3" /></span>
                    <span><span className="block text-[11px] font-bold leading-4">Confirm Udyam registration</span><span className="mt-0.5 flex items-center gap-1 text-[9px] text-[#9aa19d]"><Icon name="clock" className="size-3" /> Schemes & Compliance</span></span>
                  </button>
                </div>
              </section>
            </div>
          </div>

          <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-[#e1e4df] py-5 text-[9px] text-[#959d99] sm:flex-row">
            <p>Mialo provides preliminary guidance, not lending or official eligibility decisions.</p>
            <p>Your progress was saved just now</p>
          </footer>
        </div>
        ) : (
          <CreditReadyPage
            onBack={() => {
              setPage("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNotice={(message) => {
              setNotice(message);
              window.setTimeout(() => setNotice(null), 3200);
            }}
          />
        )}
      </main>
    </div>
  );
}
