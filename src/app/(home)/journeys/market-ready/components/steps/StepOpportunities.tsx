'use client'

import React from 'react'
import { useMarketReady } from '../../context/MarketReadyContext'
import Icon from '../Icon'

export default function StepOpportunities() {
  const { opportunities, selectedOpportunity, setSelectedOpportunity } = useMarketReady()

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Relevant market opportunities</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          {opportunities.length} curated opportunities from agreed sources matching your profile. Click to view details.
        </p>
      </div>

      <div className="space-y-4 p-6 sm:p-8">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className={`rounded-2xl border transition ${
              selectedOpportunity === opp.id 
                ? 'border-[#4c7b6f] bg-[#fafbf9]' 
                : 'border-[#e4e8e3] bg-white hover:border-[#cbd2cd]'
            }`}
          >
            <button
              onClick={() => setSelectedOpportunity(opp.id === selectedOpportunity ? null : opp.id)}
              className="w-full p-5 text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#2d3b35]">{opp.title}</h3>
                    {opp.isPrototype && (
                      <span className="rounded-full bg-[#f7ead7] px-2 py-0.5 text-[8px] font-bold text-[#aa742c]">
                        DEMO DATA
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[10px] text-[#8a928e]">{opp.source} · {opp.type}</p>
                  
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-[#616c67]">
                    {opp.sector && <span>{opp.sector}</span>}
                    {opp.location && (
                      <>
                        {opp.sector && <span>•</span>}
                        <span>{opp.location}</span>
                      </>
                    )}
                    {opp.deadline && (
                      <>
                        <span>•</span>
                        <span className="font-semibold text-[#c64536]">Deadline: {opp.deadline}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#2c6b5c]">{opp.relevanceScore}%</div>
                    <div className="text-[9px] text-[#8a928e]">Match</div>
                  </div>
                  <Icon 
                    name="arrow"
                    className={`size-4 text-[#8a928e] transition ${selectedOpportunity === opp.id ? 'rotate-90' : ''}`}
                  />
                </div>
              </div>
            </button>

            {selectedOpportunity === opp.id && (
              <div className="space-y-4 border-t border-[#e9ece8] p-5">
                <div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-[#8a928e]">Why This is Relevant</p>
                  <p className="text-[11px] leading-5 text-[#616c67]">{opp.relevanceExplanation}</p>
                </div>

                {opp.requirements.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-[#8a928e]">Requirements</p>
                    <ul className="space-y-1 pl-4">
                      {opp.requirements.map((req, idx) => (
                        <li key={idx} className="text-[11px] text-[#616c67] list-disc">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-[#8a928e]">Source</p>
                  <a 
                    href={opp.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="document" className="mt-0.5 size-3.5 text-[#2c6b5c]" />
                    <div>
                      <span className="text-[11px] font-semibold text-[#2c6b5c] group-hover:underline">
                        {opp.source}
                      </span>
                      {opp.publishedDate && (
                        <div className="mt-0.5 text-[9px] text-[#8a928e]">
                          Published: {opp.publishedDate}
                        </div>
                      )}
                    </div>
                  </a>
                </div>

                {opp.caveats.length > 0 && (
                  <div className="rounded-xl border border-[#eadcc7] bg-[#fffaf1] p-3">
                    <div className="flex items-center gap-2">
                      <Icon name="alert" className="size-4 text-[#a87027]" />
                      <span className="text-[10px] font-bold text-[#926116]">Important Notes</span>
                    </div>
                    <ul className="mt-2 space-y-1 pl-6">
                      {opp.caveats.map((caveat, idx) => (
                        <li key={idx} className="text-[10px] text-[#7b6c57]">{caveat}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button 
                  className="w-full rounded-xl bg-[#183d35] px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#24564a]"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  Add to my opportunities
                </button>
              </div>
            )}
          </div>
        ))}

        {opportunities.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-[#e4e8e3] bg-[#fafbf9] p-8 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e8ebe8] text-[#8a928e]">
              <Icon name="info" className="size-5" />
            </span>
            <h3 className="mt-4 text-sm font-bold text-[#2d3b35]">No Opportunities Found</h3>
            <p className="mt-1 text-[11px] text-[#7d8682]">
              No opportunities match your profile from available sources. Try updating your business information or market objective.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
