'use client'

import React from 'react'
import { useMarketReady } from '../../context/MarketReadyContext'
import Icon from '../Icon'

export default function StepBuyerChecklist() {
  const { checklistItems, setChecklistItems, preparationActions, setPreparationActions } = useMarketReady()

  const updateChecklistStatus = (id: string, status: typeof checklistItems[0]['status']) => {
    setChecklistItems(
      checklistItems.map(item => item.id === id ? { ...item, status } : item)
    )
  }

  const updateActionStatus = (id: string, status: typeof preparationActions[0]['status']) => {
    setPreparationActions(
      preparationActions.map(action => action.id === id ? { ...action, status } : action)
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'preparation': return 'edit'
      case 'documentation': return 'document'
      case 'verification': return 'check'
      default: return 'info'
    }
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Buyer & proposal preparation</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Complete these preparation steps to be ready for market opportunities and buyer engagements.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        {/* Checklist Items */}
        <div>
          <p className="mb-3 text-[11px] font-bold text-[#34423c]">Preparation Checklist</p>
          <div className="space-y-3">
            {checklistItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#e4e8e3] bg-white p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => {
                      if (item.status === 'completed') {
                        updateChecklistStatus(item.id, 'pending')
                      } else {
                        updateChecklistStatus(item.id, 'completed')
                      }
                    }}
                    className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded border-2 transition ${
                      item.status === 'completed'
                        ? 'border-[#2c6b5c] bg-[#2c6b5c]'
                        : 'border-[#c6d6cd] bg-white hover:border-[#2c6b5c]'
                    }`}
                  >
                    {item.status === 'completed' && <Icon name="check" className="size-3 text-white" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#2d3b35]">{item.title}</h3>
                          {item.required && (
                            <span className="rounded-full bg-[#f8d8d6] px-2 py-0.5 text-[8px] font-bold text-[#c64536]">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[11px] text-[#616c67]">{item.description}</p>
                        <div className="mt-2 flex items-center gap-2 text-[9px] text-[#8a928e]">
                          <Icon name={getCategoryIcon(item.category) as any} className="size-3" />
                          <span className="capitalize">{item.category}</span>
                        </div>
                      </div>

                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                        item.status === 'completed' ? 'bg-[#e4f0ea] text-[#2c6b5c]' :
                        item.status === 'pending' ? 'bg-[#f7ead7] text-[#aa742c]' :
                        'bg-[#f0f2ee] text-[#68736e]'
                      }`}>
                        {item.status === 'not-started' ? 'Not started' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Actions */}
        <div>
          <p className="mb-3 text-[11px] font-bold text-[#34423c]">Preparation Actions</p>
          <div className="space-y-3">
            {preparationActions.map((action) => (
              <div key={action.id} className="rounded-2xl border border-[#e4e8e3] bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#fafbf9] text-[#2c6b5c]">
                    <Icon name="arrow" className="size-4" />
                  </span>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-[#2d3b35]">{action.action}</h3>
                        <div className="mt-1 text-[9px] text-[#8a928e] capitalize">
                          {action.type.replace('-', ' ')}
                        </div>
                      </div>

                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                        action.status === 'completed' ? 'bg-[#e4f0ea] text-[#2c6b5c]' :
                        action.status === 'in-progress' ? 'bg-[#e9eaf7] text-[#5a4fb3]' :
                        'bg-[#f7ead7] text-[#aa742c]'
                      }`}>
                        {action.status === 'in-progress' ? 'In progress' : action.status.charAt(0).toUpperCase() + action.status.slice(1)}
                      </span>
                    </div>

                    {action.notes && (
                      <div className="mt-3 rounded-xl border border-[#e9ece8] bg-[#fafbf9] px-3 py-2">
                        <p className="text-[10px] text-[#616c67]">{action.notes}</p>
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {action.status !== 'completed' && (
                        <button
                          onClick={() => updateActionStatus(action.id, 'completed')}
                          className="rounded-xl border border-[#2c6b5c] bg-white px-3 py-1.5 text-[10px] font-bold text-[#2c6b5c] transition hover:bg-[#2c6b5c] hover:text-white"
                        >
                          Mark complete
                        </button>
                      )}
                      {action.status === 'pending' && (
                        <button
                          onClick={() => updateActionStatus(action.id, 'in-progress')}
                          className="rounded-xl border border-[#dce1dc] bg-white px-3 py-1.5 text-[10px] font-bold text-[#52605a] transition hover:border-[#aebbb5]"
                        >
                          Start working
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
