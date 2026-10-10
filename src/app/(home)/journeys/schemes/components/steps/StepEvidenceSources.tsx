'use client'

import React from 'react'
import { useSchemes } from '../../context/SchemesContext'
import Icon from '../Icon'

export default function StepEvidenceSources() {
  const { evidenceSources } = useSchemes()

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Review evidence & sources</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          All information is retrieved from curated government and institutional sources. Review the evidence used in eligibility assessment.
        </p>
      </div>

      <div className="space-y-4 p-6 sm:p-8">
        {evidenceSources.map((source) => (
          <div key={source.id} className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#edf3ef] text-[#2c6b5c]">
                <Icon name="document" className="size-5" />
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-[#2d3b35]">{source.sourceName}</h3>
                <a
                  href={source.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#2c6b5c] hover:underline"
                >
                  <span>{source.sourceLink}</span>
                  <Icon name="arrow" className="size-2.5" />
                </a>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#e9ece8] bg-[#fafbf9] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon name="info" className="size-4 text-[#8a928e]" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#8a928e]">Relevant Excerpt</span>
              </div>
              <p className="text-[11px] leading-5 text-[#616c67]">{source.relevantExcerpt}</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {source.publicationDate && (
                <div className="flex items-start gap-2">
                  <Icon name="clock" className="mt-0.5 size-4 text-[#8a928e]" />
                  <div>
                    <p className="text-[10px] font-semibold text-[#8a928e]">Publication Date</p>
                    <p className="mt-0.5 text-[11px] text-[#2d3b35]">{source.publicationDate}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Icon name="refresh" className="mt-0.5 size-4 text-[#8a928e]" />
                <div>
                  <p className="text-[10px] font-semibold text-[#8a928e]">Retrieved</p>
                  <p className="mt-0.5 text-[11px] text-[#2d3b35]">{source.retrievalTimestamp}</p>
                </div>
              </div>
            </div>

            {(source.sourceMetadata.version || source.sourceMetadata.authority || source.sourceMetadata.reliability) && (
              <div className="mt-4 space-y-2 border-t border-[#e9ece8] pt-4">
                {source.sourceMetadata.version && (
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-semibold text-[#8a928e]">Version:</span>
                    <span className="text-[#616c67]">{source.sourceMetadata.version}</span>
                  </div>
                )}
                {source.sourceMetadata.authority && (
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-semibold text-[#8a928e]">Authority:</span>
                    <span className="text-[#616c67]">{source.sourceMetadata.authority}</span>
                  </div>
                )}
                {source.sourceMetadata.reliability && (
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-semibold text-[#8a928e]">Reliability:</span>
                    <span className="rounded-full bg-[#e4f0ea] px-2 py-0.5 text-[9px] font-semibold text-[#2c6b5c]">
                      {source.sourceMetadata.reliability}
                    </span>
                  </div>
                )}
              </div>
            )}

            {source.caveats.length > 0 && (
              <div className="mt-4 rounded-xl border border-[#eadcc7] bg-[#fffaf1] p-3">
                <div className="flex items-center gap-2">
                  <Icon name="alert" className="size-4 text-[#a87027]" />
                  <span className="text-[10px] font-bold text-[#926116]">Important Notes</span>
                </div>
                <ul className="mt-2 space-y-1 pl-6">
                  {source.caveats.map((caveat, index) => (
                    <li key={index} className="text-[10px] text-[#7b6c57]">{caveat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {evidenceSources.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-[#e4e8e3] bg-[#fafbf9] p-8 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e8ebe8] text-[#8a928e]">
              <Icon name="document" className="size-5" />
            </span>
            <h3 className="mt-4 text-sm font-bold text-[#2d3b35]">No Evidence Sources Available</h3>
            <p className="mt-1 text-[11px] text-[#7d8682]">
              Evidence sources will appear here once schemes are identified and assessed.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
