'use client'

import React from 'react'
import { useSchemes } from '../../context/SchemesContext'
import Icon from '../Icon'

export default function StepNextActionPlan() {
  const { nextActions, setNextActions } = useSchemes()

  const updateActionStatus = (actionId: string, newStatus: typeof nextActions[0]['status']) => {
    setNextActions(
      nextActions.map(action =>
        action.id === actionId ? { ...action, status: newStatus } : action
      )
    )
  }

  const groupedActions = nextActions.reduce((groups, action) => {
    const scheme = action.schemeId
    if (!groups[scheme]) groups[scheme] = []
    groups[scheme].push(action)
    return groups
  }, {} as Record<string, typeof nextActions>)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#e4f0ea] text-[#2c6b5c]'
      case 'in-progress':
        return 'bg-[#e9eaf7] text-[#5a4fb3]'
      case 'pending':
        return 'bg-[#f7ead7] text-[#aa742c]'
      case 'blocked':
        return 'bg-[#f8d8d6] text-[#c64536]'
      default:
        return 'bg-[#f0f2ee] text-[#68736e]'
    }
  }

  const getTypeIcon = (type: string): keyof typeof Icon extends string ? any : never => {
    switch (type) {
      case 'confirm-field':
        return 'info'
      case 'gather-document':
        return 'document'
      case 'verify-condition':
        return 'check'
      case 'review-process':
        return 'refresh'
      default:
        return 'info'
    }
  }

  return (
    <>
      <div className="px-6 py-6 sm:px-8">
        <h2 className="text-[23px] font-bold tracking-[-0.035em] text-[#18251f]">Plan your next actions</h2>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-[#727c77]">
          Actions generated based on eligibility gaps and requirements. Complete these to strengthen your application.
        </p>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        {Object.entries(groupedActions).map(([schemeId, actions]) => (
          <div key={schemeId}>
            <p className="mb-3 text-[11px] font-bold text-[#34423c]">Actions for {schemeId}</p>
            <div className="space-y-3">
              {actions.map((action) => (
                <div key={action.id} className="rounded-2xl border border-[#e4e8e3] bg-white p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#fafbf9] text-[#2c6b5c]">
                      <Icon name={getTypeIcon(action.type)} className="size-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-bold text-[#2d3b35]">{action.action}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-[9px] text-[#8a928e]">
                            <span className="capitalize">{action.type.replace('-', ' ')}</span>
                            {action.linkedCheckpoint && (
                              <>
                                <span>•</span>
                                <span>Linked to checklist</span>
                              </>
                            )}
                          </div>
                        </div>

                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${getStatusColor(action.status)}`}>
                          {action.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
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
        ))}

        {nextActions.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-[#e4e8e3] bg-[#fafbf9] p-8 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e8ebe8] text-[#8a928e]">
              <Icon name="check" className="size-5" />
            </span>
            <h3 className="mt-4 text-sm font-bold text-[#2d3b35]">No Actions Required</h3>
            <p className="mt-1 text-[11px] text-[#7d8682]">
              All eligibility criteria are clear and no additional actions are needed.
            </p>
          </div>
        )}

        {/* Progress Summary */}
        {nextActions.length > 0 && (
          <div className="rounded-2xl border border-[#e4e8e3] bg-gradient-to-br from-[#fafbf9] to-white p-5">
            <p className="mb-4 text-xs font-bold text-[#2d3b35]">Action Progress</p>
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-[26px] font-bold text-[#2c6b5c]">
                  {nextActions.filter(a => a.status === 'completed').length}
                </div>
                <div className="text-[9px] text-[#8a928e]">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-[26px] font-bold text-[#5a4fb3]">
                  {nextActions.filter(a => a.status === 'in-progress').length}
                </div>
                <div className="text-[9px] text-[#8a928e]">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-[26px] font-bold text-[#aa742c]">
                  {nextActions.filter(a => a.status === 'pending').length}
                </div>
                <div className="text-[9px] text-[#8a928e]">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-[26px] font-bold text-[#c64536]">
                  {nextActions.filter(a => a.status === 'blocked').length}
                </div>
                <div className="text-[9px] text-[#8a928e]">Blocked</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
