'use client'

import React from 'react'
import { useSchemes } from '../../context/SchemesContext'
import Icon from '../Icon'

export default function StepEligibilityAssessment() {
  const { schemes, selectedScheme, setSelectedScheme, eligibilityCriteria } = useSchemes()

  const currentScheme = schemes.find(s => s.id === selectedScheme) || schemes[0]
  const schemeCriteria = eligibilityCriteria.filter(c => c.schemeId === currentScheme.id)

  const matchCount = schemeCriteria.filter(c => c.result === 'matches').length
  const unknownCount = schemeCriteria.filter(c => c.result === 'unknown').length
  const noMatchCount = schemeCriteria.filter(c => c.result === 'does-not-match').length

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Check eligibility criteria</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Review detailed eligibility assessment for each scheme. This is preliminary guidance based on available information.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Select scheme to review</span>
          <select
            className="w-full rounded-xl border border-[#dce1dc] bg-[#fafbf9] px-4 py-3 text-sm outline-none transition focus:border-[#4c7b6f] focus:ring-2 focus:ring-[#dce9e3]"
            value={currentScheme.id}
            onChange={(e) => setSelectedScheme(e.target.value)}
          >
            {schemes.map((scheme) => (
              <option key={scheme.id} value={scheme.id}>
                {scheme.name}
              </option>
            ))}
          </select>
        </label>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Matches</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#e4f0ea] text-[#2c6b5c]">
                <Icon name="check" className="size-3.5" />
              </span>
            </div>
            <div className="mt-3 text-[30px] font-semibold leading-none tracking-tighter text-[#2c6b5c]">{matchCount}</div>
          </div>

          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Unknown</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#f7ead7] text-[#aa742c]">
                <Icon name="info" className="size-3.5" />
              </span>
            </div>
            <div className="mt-3 text-[30px] font-semibold leading-none tracking-tighter text-[#aa742c]">{unknownCount}</div>
          </div>

          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">No match</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#f8d8d6] text-[#c64536]">
                <Icon name="close" className="size-3.5" />
              </span>
            </div>
            <div className="mt-3 text-[30px] font-semibold leading-none tracking-tighter text-[#c64536]">{noMatchCount}</div>
          </div>
        </div>

        {/* Criteria List */}
        <div className="space-y-3">
          {schemeCriteria.map((criterion) => (
            <div key={criterion.id} className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#2d3b35]">{criterion.criterion}</h3>
                  <p className="mt-1 text-[10px] text-[#8a928e]">Requirement: {criterion.requirement}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                  criterion.result === 'matches' ? 'bg-[#e4f0ea] text-[#2c6b5c]' :
                  criterion.result === 'does-not-match' ? 'bg-[#f8d8d6] text-[#c64536]' :
                  'bg-[#f7ead7] text-[#aa742c]'
                }`}>
                  {criterion.result === 'matches' ? 'Matches' : criterion.result === 'does-not-match' ? 'No match' : 'Unknown'}
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-[#fafbf9] p-3">
                <p className="text-[10px] font-semibold text-[#8a928e]">Your information</p>
                <p className="mt-1 text-[11px] text-[#2d3b35]">{criterion.userInfo}</p>
              </div>

              <div className="mt-3">
                <p className="text-[10px] font-semibold text-[#8a928e]">Assessment</p>
                <p className="mt-1 text-[11px] leading-5 text-[#616c67]">{criterion.explanation}</p>
              </div>

              {criterion.evidenceSource && (
                <div className="mt-3 flex items-center gap-2 text-[9px] text-[#8a928e]">
                  <Icon name="document" className="size-3" />
                  <span>Source: {criterion.evidenceSource}</span>
                  {criterion.confidence && (
                    <>
                      <span>•</span>
                      <span>Confidence: {Math.round(criterion.confidence * 100)}%</span>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="alert" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold text-[#926116]">Preliminary Assessment Only</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                This is preliminary guidance based on available information and is not an official eligibility decision. 
                Final eligibility must be confirmed by the scheme authority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
