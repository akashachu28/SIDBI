'use client'

import React from 'react'
import { useSchemes } from '../../context/SchemesContext'
import Icon from '../Icon'

export default function StepFindSchemes() {
  const { schemes, selectedScheme, setSelectedScheme } = useSchemes()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'likely-relevant':
        return 'bg-[#e4f0ea] text-[#2c6b5c]'
      case 'partially-assessed':
        return 'bg-[#f7ead7] text-[#aa742c]'
      case 'does-not-match':
        return 'bg-[#f8d8d6] text-[#c64536]'
      case 'insufficient-information':
        return 'bg-[#e9eaf7] text-[#5a4fb3]'
      default:
        return 'bg-[#f0f2ee] text-[#68736e]'
    }
  }

  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Discover relevant schemes & support</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          {schemes.length} scheme{schemes.length !== 1 ? 's' : ''} found from curated official sources matching your business profile. Click to view details.
        </p>
      </div>

      <div className="space-y-4 p-6 sm:p-8">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className={`rounded-2xl border transition ${
              selectedScheme === scheme.id 
                ? 'border-[#4c7b6f] bg-[#fafbf9]' 
                : 'border-[#e4e8e3] bg-white hover:border-[#cbd2cd]'
            }`}
          >
            <button
              onClick={() => setSelectedScheme(scheme.id === selectedScheme ? null : scheme.id)}
              className="w-full p-5 text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#2d3b35]">{scheme.name}</h3>
                  </div>
                  <p className="mt-1 text-[10px] text-[#8a928e]">{scheme.provider}</p>
                  <p className="mt-2 text-[11px] leading-5 text-[#616c67]">{scheme.shortDescription}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#f0f2ee] px-2.5 py-1 text-[9px] font-semibold text-[#68736e]">
                      {scheme.type}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${getStatusColor(scheme.eligibilityStatus)}`}>
                      {formatStatus(scheme.eligibilityStatus)}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#2c6b5c]">{scheme.relevanceScore}%</div>
                    <div className="text-[9px] text-[#8a928e]">Match</div>
                  </div>
                  <Icon 
                    name="arrow"
                    className={`size-4 text-[#8a928e] transition ${selectedScheme === scheme.id ? 'rotate-90' : ''}`}
                  />
                </div>
              </div>
            </button>

            {selectedScheme === scheme.id && (
              <div className="space-y-4 border-t border-[#e9ece8] p-5">
                <div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-[#8a928e]">Why This is Relevant</p>
                  <p className="text-[11px] leading-5 text-[#616c67]">{scheme.relevanceExplanation}</p>
                </div>

                <div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-[#8a928e]">Source</p>
                  <a 
                    href={scheme.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="document" className="mt-0.5 size-3.5 text-[#2c6b5c]" />
                    <div>
                      <span className="text-[11px] font-semibold text-[#2c6b5c] group-hover:underline">
                        {scheme.sourceTitle}
                      </span>
                      <div className="mt-0.5 flex gap-2 text-[9px] text-[#8a928e]">
                        {scheme.lastUpdated && <span>Updated: {scheme.lastUpdated}</span>}
                        {scheme.lastUpdated && <span>•</span>}
                        <span>Retrieved: {scheme.lastRetrieved}</span>
                      </div>
                    </div>
                  </a>
                </div>

                <button 
                  className="w-full rounded-xl bg-[#183d35] px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-[#24564a]"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  View eligibility details
                </button>
              </div>
            )}
          </div>
        ))}

        {schemes.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-[#e4e8e3] bg-[#fafbf9] p-8 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e8ebe8] text-[#8a928e]">
              <Icon name="info" className="size-5" />
            </span>
            <h3 className="mt-4 text-sm font-bold text-[#2d3b35]">No Supported Matches Found</h3>
            <p className="mt-1 text-[11px] text-[#7d8682]">
              We couldn't find schemes matching your profile from our curated sources. Try updating your business information.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
