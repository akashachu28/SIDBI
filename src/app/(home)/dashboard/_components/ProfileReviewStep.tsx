import React, { useMemo, useState } from "react"

/* -------------------------------------------------------------------------- */
/*  Payload types                                                              */
/* -------------------------------------------------------------------------- */

export interface BusinessPayload {
  business: {
    name: string | null
    type: string | null
    location: {
      city: string | null
      state: string | null
      country: string | null
      pincode: string | null
    }
    turnover: {
      amount: number | null
      currency: string
      financialYear: string | null
    }
    employees: number | null
    yearOfEstablishment: number | null
    msmeRegistration: {
      registered: boolean
      registrationNumber: string | null
    }
    gstRegistration: {
      registered: boolean
      gstin: string | null
    }
    exporting: {
      enabled: boolean
      countries: string[]
    }
  }
}

type DeepPartial<T> = T extends (infer U)[]
  ? U[]
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T

interface ProfileReviewStepProps {
  /** Optional prefilled data (e.g. extracted from steps 2 and 3). Missing values show up as empty fields. */
  initialData?: DeepPartial<BusinessPayload>
  onBack: () => void
  /** Called with the final payload when the user completes setup */
  onNext: (payload: BusinessPayload) => void
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

// Demo data used when no initialData is passed. Some fields are intentionally empty.
const DEFAULT_PROFILE: DeepPartial<BusinessPayload> = {
  business: {
    name: "Shakti Auto Components Pvt. Ltd.",
    type: "private_limited",
    location: { city: "Pune", state: "Maharashtra", country: "India", pincode: "" },
    turnover: { amount: 120000000, currency: "INR", financialYear: "2023-2024" },
    employees: 35,
    yearOfEstablishment: 2018,
    msmeRegistration: { registered: true, registrationNumber: "" },
    gstRegistration: { registered: true, gstin: "27ABCDE1234F1Z5" },
    exporting: { enabled: true, countries: [] },
  },
}

const BUSINESS_TYPES = [
  { value: "proprietorship", label: "Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "llp", label: "LLP" },
  { value: "private_limited", label: "Private Limited" },
  { value: "public_limited", label: "Public Limited" },
  { value: "one_person_company", label: "One Person Company" },
]

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry",
].map(s => ({ value: s, label: s }))

const CURRENT_YEAR = new Date().getFullYear()

// Last 5 completed financial years, newest first (FY starts in April)
const FY_OPTIONS = (() => {
  const now = new Date()
  const startYear = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1
  return Array.from({ length: 5 }, (_, i) => {
    const y = startYear - 1 - i
    return `${y}-${y + 1}`
  })
})()

const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
const UDYAM_REGEX = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/
const PINCODE_REGEX = /^[1-9]\d{5}$/

/* -------------------------------------------------------------------------- */
/*  Form state helpers                                                         */
/* -------------------------------------------------------------------------- */

interface FormState {
  name: string
  type: string
  city: string
  state: string
  country: string
  pincode: string
  turnoverAmount: string
  financialYear: string
  employees: string
  yearOfEstablishment: string
  msmeRegistered: boolean
  msmeNumber: string
  gstRegistered: boolean
  gstin: string
  exporting: boolean
  exportCountries: string[]
}

function toForm(initial: DeepPartial<BusinessPayload>): FormState {
  const b = initial.business
  return {
    name: b?.name ?? "",
    type: b?.type ?? "",
    city: b?.location?.city ?? "",
    state: b?.location?.state ?? "",
    country: b?.location?.country ?? "India",
    pincode: b?.location?.pincode ?? "",
    turnoverAmount: b?.turnover?.amount != null ? String(b.turnover.amount) : "",
    financialYear: b?.turnover?.financialYear ?? "",
    employees: b?.employees != null ? String(b.employees) : "",
    yearOfEstablishment: b?.yearOfEstablishment != null ? String(b.yearOfEstablishment) : "",
    msmeRegistered: b?.msmeRegistration?.registered ?? false,
    msmeNumber: b?.msmeRegistration?.registrationNumber ?? "",
    gstRegistered: b?.gstRegistration?.registered ?? false,
    gstin: b?.gstRegistration?.gstin ?? "",
    exporting: b?.exporting?.enabled ?? false,
    exportCountries: b?.exporting?.countries ?? [],
  }
}

const orNull = (s: string) => (s.trim() === "" ? null : s.trim())
const numOrNull = (s: string) => (s.trim() === "" ? null : Number(s))

function buildPayload(f: FormState): BusinessPayload {
  return {
    business: {
      name: orNull(f.name),
      type: orNull(f.type),
      location: {
        city: orNull(f.city),
        state: orNull(f.state),
        country: orNull(f.country),
        pincode: orNull(f.pincode),
      },
      turnover: {
        amount: numOrNull(f.turnoverAmount),
        currency: "INR",
        financialYear: orNull(f.financialYear),
      },
      employees: numOrNull(f.employees),
      yearOfEstablishment: numOrNull(f.yearOfEstablishment),
      msmeRegistration: {
        registered: f.msmeRegistered,
        registrationNumber: f.msmeRegistered ? orNull(f.msmeNumber) : null,
      },
      gstRegistration: {
        registered: f.gstRegistered,
        gstin: f.gstRegistered ? orNull(f.gstin) : null,
      },
      exporting: {
        enabled: f.exporting,
        countries: f.exporting ? f.exportCountries : [],
      },
    },
  }
}

function validate(f: FormState): Record<string, string> {
  const errors: Record<string, string> = {}
  if (f.pincode && !PINCODE_REGEX.test(f.pincode)) errors.pincode = "Enter a valid 6-digit pincode"
  if (f.yearOfEstablishment) {
    const y = Number(f.yearOfEstablishment)
    if (f.yearOfEstablishment.length !== 4 || y < 1800 || y > CURRENT_YEAR) {
      errors.yearOfEstablishment = `Enter a year between 1800 and ${CURRENT_YEAR}`
    }
  }
  if (f.msmeRegistered && f.msmeNumber && !UDYAM_REGEX.test(f.msmeNumber)) {
    errors.msmeNumber = "Use the format UDYAM-XX-00-0000000"
  }
  if (f.gstRegistered && f.gstin && !GSTIN_REGEX.test(f.gstin)) {
    errors.gstin = "Enter a valid 15-character GSTIN"
  }
  return errors
}

function countEmpty(f: FormState): number {
  const checks = [
    f.name, f.type, f.city, f.state, f.country, f.pincode,
    f.turnoverAmount, f.financialYear, f.employees, f.yearOfEstablishment,
  ]
  let n = checks.filter(v => v.trim() === "").length
  if (f.msmeRegistered && !f.msmeNumber.trim()) n++
  if (f.gstRegistered && !f.gstin.trim()) n++
  if (f.exporting && f.exportCountries.length === 0) n++
  return n
}

function formatInr(n: number): string {
  if (n >= 1e7) return `₹${Number((n / 1e7).toFixed(2))} crore`
  if (n >= 1e5) return `₹${Number((n / 1e5).toFixed(2))} lakh`
  return `₹${n.toLocaleString("en-IN")}`
}

/* -------------------------------------------------------------------------- */
/*  Small UI building blocks (defined outside to keep input focus stable)      */
/* -------------------------------------------------------------------------- */

function inputClass(empty: boolean, error?: string, extra = "") {
  const state = error
    ? "border-red-300 bg-white"
    : empty
    ? "border-[#fde68a] bg-[#fffdf5]"
    : "border-[#e2e8f0] bg-white"
  return `w-full rounded-xl border px-4 py-3 text-[15px] text-[#0f172a] placeholder:text-[#cbd5e1] transition-all focus:border-[#3b82f6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20 ${state} ${extra}`
}

interface FieldShellProps {
  label: string
  htmlFor: string
  empty?: boolean
  error?: string
  hint?: string
  className?: string
  children: React.ReactNode
}

function FieldShell({ label, htmlFor, empty, error, hint, className = "", children }: FieldShellProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-xs font-medium text-[#64748b]">
          {label}
        </label>
        {empty && !error && <span className="text-[11px] text-[#b45309]">Not added</span>}
      </div>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-red-500">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-[#94a3b8]">{hint}</p>
      ) : null}
    </div>
  )
}

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  maxLength?: number
  prefix?: string
  error?: string
  hint?: string
  className?: string
  autoCapitalize?: string
}

function TextField({
  id, label, value, onChange, onBlur, placeholder, inputMode, maxLength,
  prefix, error, hint, className, autoCapitalize,
}: TextFieldProps) {
  const empty = value.trim() === ""
  return (
    <FieldShell label={label} htmlFor={id} empty={empty} error={error} hint={hint} className={className}>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#94a3b8]">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          aria-invalid={!!error}
          className={inputClass(empty, error, prefix ? "pl-9" : "")}
        />
      </div>
    </FieldShell>
  )
}

interface SelectFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
  className?: string
}

function SelectField({ id, label, value, onChange, options, placeholder, className }: SelectFieldProps) {
  const empty = value === ""
  return (
    <FieldShell label={label} htmlFor={id} empty={empty} className={className}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass(empty, undefined, `appearance-none pr-10 ${empty ? "text-[#94a3b8]" : ""}`)}
        >
          <option value="">{placeholder}</option>
          {options.map(o => (
            <option key={o.value} value={o.value} className="text-[#0f172a]">{o.label}</option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#94a3b8]"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  )
}

function YesNo({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  const base = "rounded-full px-4 py-1.5 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
  return (
    <div role="group" aria-label={label} className="inline-flex shrink-0 rounded-full bg-[#f1f5f9] p-1">
      <button
        type="button"
        aria-pressed={value}
        onClick={() => onChange(true)}
        className={`${base} ${value ? "bg-white text-[#2563eb] shadow-sm" : "text-[#64748b] hover:text-[#0f172a]"}`}
      >
        Yes
      </button>
      <button
        type="button"
        aria-pressed={!value}
        onClick={() => onChange(false)}
        className={`${base} ${!value ? "bg-white text-[#0f172a] shadow-sm" : "text-[#64748b] hover:text-[#0f172a]"}`}
      >
        No
      </button>
    </div>
  )
}

function TagInput({
  id, tags, onChange, placeholder,
}: { id: string; tags: string[]; onChange: (tags: string[]) => void; placeholder: string }) {
  const [draft, setDraft] = useState("")
  const empty = tags.length === 0

  const addMany = (items: string[]) => {
    const next = [...tags]
    items.forEach(raw => {
      const v = raw.trim()
      if (v && !next.some(t => t.toLowerCase() === v.toLowerCase())) next.push(v)
    })
    if (next.length !== tags.length) onChange(next)
  }

  return (
    <FieldShell label="Countries you export to" htmlFor={id} empty={empty && draft.trim() === ""} hint="Press Enter or comma to add a country">
      <div
        className={`flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#3b82f6] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3b82f6]/20 ${
          empty ? "border-[#fde68a] bg-[#fffdf5]" : "border-[#e2e8f0] bg-white"
        }`}
      >
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1.5 rounded-full bg-[#eff6ff] py-1 pl-3 pr-1.5 text-sm text-[#1e40af]">
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter(t => t !== tag))}
              aria-label={`Remove ${tag}`}
              className="grid size-5 place-items-center rounded-full text-[#60a5fa] transition-colors hover:bg-[#dbeafe] hover:text-[#1e40af] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
            >
              <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          value={draft}
          onChange={(e) => {
            const parts = e.target.value.split(",")
            if (parts.length > 1) {
              addMany(parts.slice(0, -1))
              setDraft(parts[parts.length - 1])
            } else {
              setDraft(e.target.value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addMany([draft])
              setDraft("")
            } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
              onChange(tags.slice(0, -1))
            }
          }}
          onBlur={() => {
            addMany([draft])
            setDraft("")
          }}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="min-w-[140px] flex-1 bg-transparent py-1 text-[15px] text-[#0f172a] placeholder:text-[#cbd5e1] focus:outline-none"
        />
      </div>
    </FieldShell>
  )
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold text-[#0f172a]">{title}</h2>
      {description && <p className="mt-1 text-sm text-[#64748b]">{description}</p>}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export function ProfileReviewStep({ initialData, onBack, onNext }: ProfileReviewStepProps) {
  const [f, setF] = useState<FormState>(() => toForm(initialData ?? DEFAULT_PROFILE))
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setF(prev => ({ ...prev, [key]: value }))
  }
  const touch = (key: string) => setTouched(prev => ({ ...prev, [key]: true }))
  const digits = (s: string) => s.replace(/\D/g, "")

  const errors = useMemo(() => validate(f), [f])
  const emptyCount = useMemo(() => countEmpty(f), [f])
  const err = (key: string) => (submitted || touched[key] ? errors[key] : undefined)
  const hasErrors = Object.keys(errors).length > 0

  const fyOptions = useMemo(() => {
    const list = [...FY_OPTIONS]
    if (f.financialYear && !list.includes(f.financialYear)) list.push(f.financialYear)
    return list.map(v => ({ value: v, label: `FY ${v}` }))
  }, [f.financialYear])

  const turnoverHint =
    f.turnoverAmount !== "" && Number(f.turnoverAmount) > 0
      ? `About ${formatInr(Number(f.turnoverAmount))}`
      : "Enter the full amount in rupees"

  const handleComplete = () => {
    setSubmitted(true)
    if (hasErrors) return
    onNext(buildPayload(f))
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f8ff]">
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className="rounded-full bg-[#eff6ff] px-3.5 py-1.5 text-xs font-semibold text-[#1e40af]">
          Step 4 of 4
        </span>
        <button
            onClick={handleComplete}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/40"
          >
            Complete setup
            <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-8">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Heading */}
          <div className="mb-8 mt-2">
            <h1 className="text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
              Review your business profile
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#64748b]">
              We built this from what you shared. Fix anything that looks off and fill in what is missing.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm" aria-live="polite">
              {emptyCount > 0 ? (
                <>
                  <span className="size-2 rounded-full bg-[#f59e0b]" />
                  <span className="text-[#b45309]">
                    {emptyCount} {emptyCount === 1 ? "field is" : "fields are"} empty
                  </span>
                </>
              ) : (
                <>
                  <span className="size-2 rounded-full bg-[#10b981]" />
                  <span className="text-[#059669]">All fields are filled</span>
                </>
              )}
            </p>
          </div>

          <div className="divide-y divide-[#eef2f6] rounded-3xl border border-[#e2e8f0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            {/* Business details */}
            <section className="p-6 sm:p-8">
              <SectionHeading title="Business details" />
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  id="business-name"
                  label="Business name"
                  value={f.name}
                  onChange={(v) => set("name", v)}
                  placeholder="e.g. ABC Technologies Pvt Ltd"
                  className="md:col-span-2"
                />
                <SelectField
                  id="business-type"
                  label="Business type"
                  value={f.type}
                  onChange={(v) => set("type", v)}
                  options={BUSINESS_TYPES}
                  placeholder="Select type"
                />
                <TextField
                  id="year-established"
                  label="Year of establishment"
                  value={f.yearOfEstablishment}
                  onChange={(v) => set("yearOfEstablishment", digits(v).slice(0, 4))}
                  onBlur={() => touch("yearOfEstablishment")}
                  placeholder="e.g. 2019"
                  inputMode="numeric"
                  maxLength={4}
                  error={err("yearOfEstablishment")}
                />
                <TextField
                  id="employees"
                  label="Number of employees"
                  value={f.employees}
                  onChange={(v) => set("employees", digits(v).slice(0, 7))}
                  placeholder="e.g. 25"
                  inputMode="numeric"
                />
              </div>
            </section>

            {/* Location */}
            <section className="p-6 sm:p-8">
              <SectionHeading title="Location" />
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  id="city"
                  label="City"
                  value={f.city}
                  onChange={(v) => set("city", v)}
                  placeholder="e.g. Bengaluru"
                />
                <SelectField
                  id="state"
                  label="State"
                  value={f.state}
                  onChange={(v) => set("state", v)}
                  options={INDIAN_STATES}
                  placeholder="Select state"
                />
                <TextField
                  id="country"
                  label="Country"
                  value={f.country}
                  onChange={(v) => set("country", v)}
                  placeholder="e.g. India"
                />
                <TextField
                  id="pincode"
                  label="Pincode"
                  value={f.pincode}
                  onChange={(v) => set("pincode", digits(v).slice(0, 6))}
                  onBlur={() => touch("pincode")}
                  placeholder="e.g. 560001"
                  inputMode="numeric"
                  maxLength={6}
                  error={err("pincode")}
                />
              </div>
            </section>

            {/* Turnover */}
            <section className="p-6 sm:p-8">
              <SectionHeading title="Turnover" />
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  id="turnover"
                  label="Annual turnover"
                  value={f.turnoverAmount}
                  onChange={(v) => set("turnoverAmount", digits(v).slice(0, 14))}
                  placeholder="e.g. 5000000"
                  inputMode="numeric"
                  prefix="₹"
                  hint={turnoverHint}
                />
                <SelectField
                  id="financial-year"
                  label="Financial year"
                  value={f.financialYear}
                  onChange={(v) => set("financialYear", v)}
                  options={fyOptions}
                  placeholder="Select year"
                />
              </div>
            </section>

            {/* Registrations */}
            <section className="p-6 sm:p-8">
              <SectionHeading title="Registrations" />
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[15px] font-medium text-[#0f172a]">MSME (Udyam) registered</p>
                      <p className="mt-0.5 text-xs text-[#94a3b8]">Do you have an Udyam registration?</p>
                    </div>
                    <YesNo label="MSME registered" value={f.msmeRegistered} onChange={(v) => set("msmeRegistered", v)} />
                  </div>
                  {f.msmeRegistered && (
                    <TextField
                      id="udyam-number"
                      label="Udyam registration number"
                      value={f.msmeNumber}
                      onChange={(v) => set("msmeNumber", v.toUpperCase().slice(0, 19))}
                      onBlur={() => touch("msmeNumber")}
                      placeholder="UDYAM-XX-00-0000000"
                      autoCapitalize="characters"
                      error={err("msmeNumber")}
                      className="mt-4"
                    />
                  )}
                </div>

                <div className="border-t border-[#eef2f6] pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[15px] font-medium text-[#0f172a]">GST registered</p>
                      <p className="mt-0.5 text-xs text-[#94a3b8]">Is your business registered under GST?</p>
                    </div>
                    <YesNo label="GST registered" value={f.gstRegistered} onChange={(v) => set("gstRegistered", v)} />
                  </div>
                  {f.gstRegistered && (
                    <TextField
                      id="gstin"
                      label="GSTIN"
                      value={f.gstin}
                      onChange={(v) => set("gstin", v.toUpperCase().slice(0, 15))}
                      onBlur={() => touch("gstin")}
                      placeholder="e.g. 29ABCDE1234F1Z5"
                      autoCapitalize="characters"
                      maxLength={15}
                      error={err("gstin")}
                      className="mt-4"
                    />
                  )}
                </div>
              </div>
            </section>

            {/* Exports */}
            <section className="p-6 sm:p-8">
              <SectionHeading title="Exports" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[15px] font-medium text-[#0f172a]">Exporting</p>
                  <p className="mt-0.5 text-xs text-[#94a3b8]">Do you sell goods or services outside India?</p>
                </div>
                <YesNo label="Exporting" value={f.exporting} onChange={(v) => set("exporting", v)} />
              </div>
              {f.exporting && (
                <div className="mt-4">
                  <TagInput
                    id="export-countries"
                    tags={f.exportCountries}
                    onChange={(tags) => set("exportCountries", tags)}
                    placeholder="e.g. USA, Germany"
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      
    </div>
  )
}