'use client'

import React from 'react'
import { useSchemes } from '../../context/SchemesContext'
import Icon from '../Icon'

export default function StepDocumentChecklist() {
  const { 
    schemes, 
    selectedScheme, 
    setSelectedScheme,
    documentRequirements, 
    registrationRequirements,
    checklistItems 
  } = useSchemes()

  const currentScheme = schemes.find(s => s.id === selectedScheme) || schemes[0]
  const schemeDocuments = documentRequirements.filter(d => d.schemeId === currentScheme.id)
  const schemeRegistrations = registrationRequirements.filter(r => r.schemeId === currentScheme.id)
  const schemeChecklist = checklistItems.filter(c => c.schemeId === currentScheme.id)

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Document & registration requirements</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Track document requirements and verify registrations needed for scheme applications.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold text-[#34423c]">Select scheme</span>
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

        <div className="grid gap-4 md:grid-cols-2">
          {/* Documents */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Document Requirements</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#f7ead7] text-[#aa742c]">
                <Icon name="document" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              {schemeDocuments.map((doc) => (
                <div key={doc.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-semibold text-[#2d3b35]">{doc.documentName}</p>
                    {doc.required && (
                      <span className="rounded-full bg-[#f8d8d6] px-2 py-0.5 text-[8px] font-bold text-[#c64536]">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#8a928e]">{doc.description}</p>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                    doc.status === 'available' ? 'bg-[#e4f0ea] text-[#2c6b5c]' :
                    doc.status === 'needed' ? 'bg-[#f8d8d6] text-[#c64536]' :
                    'bg-[#f7ead7] text-[#aa742c]'
                  }`}>
                    {doc.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                  {doc.notes && (
                    <p className="mt-1 rounded-lg border border-[#eadcc7] bg-[#fffaf1] px-2 py-1 text-[9px] text-[#7b6c57]">
                      {doc.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Registrations */}
          <div className="rounded-2xl border border-[#e4e8e3] bg-[#fafbf9] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold text-[#2d3b35]">Registrations</p>
              <span className="grid size-7 place-items-center rounded-lg bg-[#e4f0ea] text-[#2c6b5c]">
                <Icon name="check" className="size-3.5" />
              </span>
            </div>
            <div className="space-y-3">
              {schemeRegistrations.map((reg) => (
                <div key={reg.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-semibold text-[#2d3b35]">{reg.registrationType}</p>
                    {reg.required && (
                      <span className="rounded-full bg-[#f8d8d6] px-2 py-0.5 text-[8px] font-bold text-[#c64536]">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#8a928e]">{reg.details}</p>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                    reg.status === 'verified' ? 'bg-[#e4f0ea] text-[#2c6b5c]' :
                    reg.status === 'unverified' ? 'bg-[#f7ead7] text-[#aa742c]' :
                    'bg-[#f0f2ee] text-[#68736e]'
                  }`}>
                    {reg.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                  {reg.verificationLink && (
                    <a href={reg.verificationLink} className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#2c6b5c] hover:underline">
                      Verify details <Icon name="arrow" className="size-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
          <p className="mb-4 text-xs font-bold text-[#2d3b35]">Consolidated Checklist</p>
          <div className="space-y-2">
            {schemeChecklist.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-xl border border-[#e4e8e3] bg-[#fafbf9] p-3 transition hover:bg-white">
                <span className={`grid size-5 shrink-0 place-items-center rounded border-2 ${
                  item.status === 'completed' 
                    ? 'border-[#2c6b5c] bg-[#2c6b5c]' 
                    : 'border-[#c6d6cd] bg-white'
                }`}>
                  {item.status === 'completed' && <Icon name="check" className="size-3 text-white" />}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#2d3b35]">{item.title}</span>
                    <span className={`text-[9px] font-semibold ${
                      item.priority === 'high' ? 'text-[#c64536]' :
                      item.priority === 'medium' ? 'text-[#aa742c]' :
                      'text-[#2c6b5c]'
                    }`}>
                      ({item.priority})
                    </span>
                  </div>
                  <p className="mt-0.5 text-[9px] text-[#8a928e] capitalize">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-[#eadcc7] bg-[#fffaf1] p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5e7ce] text-[#a87027]">
              <Icon name="info" className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold text-[#926116]">Indicative Requirements Only</p>
              <p className="mt-1 text-[10px] leading-4 text-[#7b6c57]">
                Requirements shown are based on available scheme guidelines. Specific requirements may vary. 
                Not claiming any document is mandatory unless explicitly supported by official documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
