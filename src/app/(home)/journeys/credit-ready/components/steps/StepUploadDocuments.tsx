'use client'

import React from 'react'
import { useCreditReady } from '../../context/CreditReadyContext'
import Icon from '../Icon'
import type { DocumentStatus } from '../../types'

const statusConfig: Record<DocumentStatus, { label: string; color: string; bgColor: string }> = {
  uploading: { label: 'Uploading...', color: 'text-[#7d8682]', bgColor: 'bg-[#f1f2f3]' },
  processing: { label: 'Processing', color: 'text-[#946322]', bgColor: 'bg-[#fff4e2]' },
  completed: { label: 'Completed', color: 'text-[#296052]', bgColor: 'bg-[#edf5f2]' },
  failed: { label: 'Failed', color: 'text-[#a83232]', bgColor: 'bg-[#fef1f1]' },
  pending: { label: 'Pending', color: 'text-[#7d8682]', bgColor: 'bg-[#f1f2f3]' }
}

export default function StepUploadDocuments() {
  const { documents, showNotice } = useCreditReady()

  const handleUpload = () => {
    showNotice('File upload initiated.')
  }

  const handleRetry = (docName: string) => {
    showNotice(`Retrying upload for ${docName}`)
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Add your supporting documents</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Upload selected files and track their processing status. Extracted information will always require your confirmation.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Upload Area */}
        <div className="rounded-2xl border-2 border-dashed border-[#dce1dc] bg-[#fafbf9] p-8 text-center transition hover:border-[#aebbb5] hover:bg-[#f5f7f3]">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#edf3ef]">
            <Icon name="upload" className="size-8 text-[#2c6b5c]" />
          </div>
          <h3 className="mt-4 text-sm font-bold text-[#2d3b35]">Upload your documents</h3>
          <p className="mt-1 text-[11px] text-[#7d8682]">
            Drag and drop files here, or click to browse
          </p>
          <p className="mt-2 text-[9px] text-[#929a96]">
            Supported formats: PDF, JPG, PNG · Max size: 10MB per file
          </p>
          <button
            onClick={handleUpload}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#183d35] px-5 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#24564a]"
          >
            <Icon name="upload" className="size-3.5" />
            Choose files
          </button>
        </div>

        {/* Recommended Documents */}
        <div className="mt-6 rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <div className="mb-4 flex items-center gap-2">
            <Icon name="document" className="size-4 text-[#2c6b5c]" />
            <p className="text-xs font-bold text-[#2d3b35]">Recommended documents</p>
          </div>
          <div className="space-y-2">
            {['Bank statement (last 6 months)', 'Supplier quotation', 'Latest GST return', 'Udyam certificate', 'PAN card'].map((doc, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-xl border border-[#e8ebe7] p-3 text-[11px]">
                <Icon name="document" className="size-4 text-[#8a928e]" />
                <span className="flex-1 text-[#46524d]">{doc}</span>
                <span className="text-[9px] text-[#929a96]">PDF or image</span>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Documents */}
        {documents.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-xs font-bold text-[#2d3b35]">Uploaded documents ({documents.length})</h3>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-4 rounded-xl border border-[#e4e8e3] bg-white p-4">
                  <div className="grid size-10 place-items-center rounded-lg bg-[#edf3ef]">
                    <Icon name="document" className="size-5 text-[#2c6b5c]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-[11px] font-bold text-[#2d3b35]">{doc.name}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-[9px] text-[#8a928e]">
                      <span>{doc.type}</span>
                      {doc.size && (
                        <>
                          <span className="size-0.5 rounded-full bg-[#a8aeab]" />
                          <span>{doc.size}</span>
                        </>
                      )}
                      {doc.uploadDate && (
                        <>
                          <span className="size-0.5 rounded-full bg-[#a8aeab]" />
                          <span>{doc.uploadDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${statusConfig[doc.status].bgColor} ${statusConfig[doc.status].color}`}>
                    {statusConfig[doc.status].label}
                  </span>
                  {doc.status === 'failed' && (
                    <button
                      onClick={() => handleRetry(doc.name)}
                      className="text-[10px] font-bold text-[#2c6b5c] hover:underline"
                    >
                      Retry
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="mt-6 rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
          <div className="mb-3 flex items-center gap-2">
            <Icon name="info" className="size-4 text-[#2c6b5c]" />
            <p className="text-xs font-bold text-[#2d3b35]">Privacy & security</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#4f8678]" />
              Files stay private and authorised
            </div>
            <div className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#4f8678]" />
              You can retry recoverable upload failures
            </div>
            <div className="flex items-start gap-2.5 text-[11px] leading-4 text-[#616c67]">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#4f8678]" />
              Nothing is marked verified without confirmation
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
