import React, { useState } from "react";

interface ProfileData {
  businessTitle: string;
  companyDescription: string;
  companyType: string;
  employeeCount: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
  gstNumber: string;
  yearOfEstablishment: string;
}

interface DocumentsStepProps {
  uploadedDocs: string[];
  setUploadedDocs: (docs: string[]) => void;
  // Kept so the parent doesn't need to change; this step no longer edits profile data
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  onBack: () => void;
  onNext: () => void;
}

interface DocItem {
  id: string;
  label: string;
  hint?: string;
}

const MAIN_DOCS: DocItem[] = [
  {
    id: "bank",
    label: "Bank statements",
    hint: "Choose how far back you can share",
  },
  { id: "balance", label: "Latest balance sheet" },
  { id: "itr", label: "Income tax returns" },
  { id: "gst-returns", label: "GST returns" },
  { id: "udyam", label: "Udyam registration certificate" },
];

const SUPPORTING_DOCS: DocItem[] = [
  { id: "gst-cert", label: "GST registration certificate" },
  { id: "loans", label: "Existing loan statements or sanction letters" },
  {
    id: "export",
    label: "Export documents",
    hint: "Shipping bills or export invoices",
  },
];

const ALL_DOCS = [...MAIN_DOCS, ...SUPPORTING_DOCS];
const BANK_PERIODS = [3, 6, 12, 36];
const ACCEPTED_TYPES = ".pdf,.jpg,.jpeg,.png,.xls,.xlsx,.csv";

export function DocumentsStep({
  uploadedDocs,
  setUploadedDocs,
  onBack,
  onNext,
}: DocumentsStepProps) {
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [bankMonths, setBankMonths] = useState<number>(6);

  const uploadedCount = ALL_DOCS.filter((d) =>
    uploadedDocs.includes(d.id),
  ).length;

  const handleFiles = (id: string, list: FileList | null) => {
    if (!list || list.length === 0) return;
    const added = Array.from(list);
    setFiles((prev) => ({ ...prev, [id]: [...(prev[id] || []), ...added] }));
    if (!uploadedDocs.includes(id)) {
      setUploadedDocs([...uploadedDocs, id]);
    }
  };

  const removeFile = (id: string, index: number) => {
    const remaining = (files[id] || []).filter((_, i) => i !== index);
    setFiles((prev) => {
      const next = { ...prev };
      if (remaining.length === 0) delete next[id];
      else next[id] = remaining;
      return next;
    });
    if (remaining.length === 0) {
      setUploadedDocs(uploadedDocs.filter((d) => d !== id));
    }
  };

  const removeDoc = (id: string) => {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setUploadedDocs(uploadedDocs.filter((d) => d !== id));
  };

  const renderRow = (doc: DocItem) => {
    const isUploaded = uploadedDocs.includes(doc.id);
    const docFiles = files[doc.id] || [];

    return (
      <div
        key={doc.id}
        className={`rounded-2xl border bg-white p-4 transition-all sm:p-5 ${
          isUploaded
            ? "border-[#3b82f6]/40 shadow-[0_4px_20px_rgba(59,130,246,0.08)]"
            : "border-[#e2e8f0] hover:border-[#cbd5e1]"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
              isUploaded
                ? "bg-[#3b82f6] text-white"
                : "bg-[#f1f5f9] text-[#64748b]"
            }`}
          >
            {isUploaded ? (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            ) : (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
              </svg>
            )}
          </div>

          {/* Label */}
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold leading-snug text-[#0f172a]">
              {doc.label}
            </p>
            {doc.hint && !isUploaded && (
              <p className="mt-0.5 text-xs text-[#94a3b8]">{doc.hint}</p>
            )}
            {isUploaded && docFiles.length === 0 && (
              <p className="mt-0.5 text-xs text-[#64748b]">Uploaded</p>
            )}
            {isUploaded && docFiles.length > 0 && (
              <p className="mt-0.5 text-xs text-[#64748b]">
                {docFiles.length} {docFiles.length === 1 ? "file" : "files"}{" "}
                added
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {isUploaded && docFiles.length === 0 && (
              <button
                onClick={() => removeDoc(doc.id)}
                className="rounded-full px-3 py-2 text-xs font-medium text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
              >
                Remove
              </button>
            )}
            <label
              className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all focus-within:ring-2 focus-within:ring-[#3b82f6]/40 ${
                isUploaded
                  ? "bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0]"
                  : "bg-[#eff6ff] text-[#2563eb] hover:bg-[#3b82f6] hover:text-white"
              }`}
            >
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 16V4M6 10l6-6 6 6M5 20h14" />
              </svg>
              {isUploaded ? "Add more" : "Upload"}
              <input
                type="file"
                multiple
                accept={ACCEPTED_TYPES}
                className="sr-only"
                onChange={(e) => {
                  handleFiles(doc.id, e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        </div>

        {/* Bank statement period */}
        {doc.id === "bank" && (
          <div className="mt-4 flex flex-wrap items-center gap-2 pl-0 sm:pl-[60px]">
            <span className="mr-1 text-xs text-[#64748b]">Period</span>
            {BANK_PERIODS.map((months) => (
              <button
                key={months}
                onClick={() => setBankMonths(months)}
                aria-pressed={bankMonths === months}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 ${
                  bankMonths === months
                    ? "border-[#3b82f6] bg-[#3b82f6] text-white"
                    : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#3b82f6]/40 hover:text-[#2563eb]"
                }`}
              >
                {months} months
              </button>
            ))}
          </div>
        )}

        {/* Uploaded files */}
        {docFiles.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2 pl-0 sm:pl-[60px]">
            {docFiles.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex max-w-full items-center gap-2 rounded-full bg-[#f8fafc] py-1.5 pl-3.5 pr-1.5 text-xs text-[#334155] ring-1 ring-[#e2e8f0]"
              >
                <span className="truncate">{file.name}</span>
                <button
                  onClick={() => removeFile(doc.id, index)}
                  aria-label={`Remove ${file.name}`}
                  className="grid size-5 shrink-0 place-items-center rounded-full text-[#94a3b8] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
                >
                  <svg
                    className="size-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f8ff]">
      {/* <div className="flex w-full h-10 bg-gradient-to-b from-white/90 via-white/80 to-white/40 absolute top-16 z-200"/> */}
      {/* Top bar */}
      <div className="relative z-10  flex items-center justify-between px-6 pt-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className="rounded-full bg-[#eff6ff] px-3.5 py-1.5 text-xs font-semibold text-[#1e40af]">
          Step 3 of 4
        </span>
        <button
          onClick={onNext}
          className={`flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]/40 ${
            uploadedCount > 0
              ? "bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white shadow-[0_4px_14px_rgba(59,130,246,0.35)] hover:scale-[1.02]"
              : "border border-[#e2e8f0] bg-white text-[#334155] hover:border-[#cbd5e1] hover:bg-[#f8fafc]"
          }`}
        >
          {uploadedCount > 0 ? "Continue" : "Skip for now"}
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
              Upload documents{" "}
              <span className="text-sm italic text-[#64748b]" aria-live="polite">
                 ({uploadedCount} of {ALL_DOCS.length} uploaded)
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#64748b]">
              Share what you have. Every document is optional, and more
              documents help us find better matches for your business.
            </p>
          </div>

          {/* Main documents */}
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold text-[#0f172a]">
              Main documents
            </h2>
            <div className="space-y-3">{MAIN_DOCS.map(renderRow)}</div>
          </section>

          {/* Supporting documents */}
          <section>
            <h2 className="mb-3 text-sm font-semibold text-[#0f172a]">
              Supporting documents
            </h2>
            <div className="space-y-3">{SUPPORTING_DOCS.map(renderRow)}</div>
          </section>
        </div>
      </div>

      
    </div>
  );
}
