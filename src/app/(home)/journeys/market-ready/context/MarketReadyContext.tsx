'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { 
  Step, 
  BusinessProduct,
  MarketObjectiveType,
  Opportunity,
  ChecklistItem,
  PreparationAction,
  ProgressSummary
} from '../types'

type MarketReadyContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  steps: Step[]
  updateStepState: (stepId: string, state: Step['state']) => void
  businessProduct: BusinessProduct
  setBusinessProduct: (profile: BusinessProduct) => void
  marketObjective: MarketObjectiveType | null
  setMarketObjective: (objective: MarketObjectiveType | null) => void
  opportunities: Opportunity[]
  setOpportunities: (opportunities: Opportunity[]) => void
  selectedOpportunity: string | null
  setSelectedOpportunity: (id: string | null) => void
  checklistItems: ChecklistItem[]
  setChecklistItems: (items: ChecklistItem[]) => void
  preparationActions: PreparationAction[]
  setPreparationActions: (actions: PreparationAction[]) => void
  progressSummary: ProgressSummary
  updateProgressSummary: () => void
  showNotice: (message: string) => void
}

const MarketReadyContext = createContext<MarketReadyContextType | undefined>(undefined)

const initialSteps: Step[] = [
  { id: 'business-product', number: 1, title: 'Business & Product', detail: 'Your profile and offering', state: 'complete', required: true },
  { id: 'market-objective', number: 2, title: 'Market Objective', detail: 'What you\'re looking for', state: 'complete', required: true },
  { id: 'opportunities', number: 3, title: 'Opportunities', detail: 'Relevant matches', state: 'current', required: true },
  { id: 'buyer-checklist', number: 4, title: 'Buyer/Proposal Checklist', detail: 'Preparation steps', state: 'upcoming', required: true },
  { id: 'review-save', number: 5, title: 'Review & Save', detail: 'Save your progress', state: 'upcoming', required: true }
]

export function MarketReadyProvider({ children }: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(2)
  const [steps, setSteps] = useState<Step[]>(initialSteps)
  const [notice, setNotice] = useState<string | null>(null)

  const [businessProduct, setBusinessProduct] = useState<BusinessProduct>({
    businessName: 'Sharma Handlooms',
    productService: 'Handwoven textiles and traditional fabrics',
    sector: 'Textiles & handloom manufacturing',
    location: 'Jaipur, Rajasthan',
    marketObjective: 'Expand to export markets',
    description: 'Traditional handloom products with authentic Rajasthani designs, suitable for both domestic and international markets.'
  })

  const [marketObjective, setMarketObjective] = useState<MarketObjectiveType | null>('buyer-export')

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 'opp1',
      title: 'International Textile Buyer Network - India Pavilion',
      type: 'Export opportunity',
      source: 'India Trade Portal',
      sourceLink: 'https://trade.gov.in',
      location: 'New Delhi',
      sector: 'Textiles',
      relevanceScore: 92,
      relevanceExplanation: 'Direct match with handloom textiles sector and export objective. Event focuses on connecting Indian manufacturers with international buyers.',
      caveats: ['Registration deadline approaching', 'Requires GST and export documentation'],
      isPrototype: false,
      publishedDate: 'March 2024',
      deadline: 'April 30, 2024',
      requirements: ['Valid export license', 'Product catalog', 'GST certificate', 'Bank details']
    },
    {
      id: 'opp2',
      title: 'Government e-Marketplace - Textile Products',
      type: 'Tender',
      source: 'GeM Portal',
      sourceLink: 'https://gem.gov.in',
      sector: 'Textiles',
      relevanceScore: 78,
      relevanceExplanation: 'Government procurement opportunity for textile products. Suitable for established manufacturers with quality certifications.',
      caveats: ['Requires GeM registration', 'Quality certification needed', 'Prototype data - verify current tenders'],
      isPrototype: true,
      estimatedValue: '₹25,00,000',
      requirements: ['GeM registration', 'Quality certifications', 'Previous supply records']
    },
    {
      id: 'opp3',
      title: 'Craft Export Promotion Council - Buyer Meet',
      type: 'Market opportunity',
      source: 'CEPC',
      sourceLink: 'https://epch.in',
      location: 'Mumbai',
      sector: 'Handicrafts & Textiles',
      relevanceScore: 85,
      relevanceExplanation: 'Buyer-seller meet specifically for handicraft and textile exporters. Good networking opportunity.',
      caveats: ['Limited seats available', 'Membership may be required'],
      isPrototype: false,
      publishedDate: 'February 2024',
      deadline: 'March 15, 2024',
      requirements: ['Business profile', 'Product samples', 'Export readiness']
    }
  ])

  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null)

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: 'check1',
      title: 'Confirm product/service details',
      description: 'Verify product descriptions, specifications, and pricing',
      status: 'completed',
      category: 'preparation',
      required: true
    },
    {
      id: 'check2',
      title: 'Gather business documents',
      description: 'Collect registration certificates, GST, and trade licenses',
      status: 'completed',
      category: 'documentation',
      required: true
    },
    {
      id: 'check3',
      title: 'Prepare buyer summary',
      description: 'Create a compelling business and product summary for buyers',
      status: 'pending',
      category: 'preparation',
      required: true
    },
    {
      id: 'check4',
      title: 'Review opportunity requirements',
      description: 'Check specific requirements for selected opportunities',
      status: 'pending',
      category: 'verification',
      required: true
    },
    {
      id: 'check5',
      title: 'Prepare product catalog',
      description: 'Digital catalog with images and specifications',
      status: 'not-started',
      category: 'documentation',
      required: false
    },
    {
      id: 'check6',
      title: 'Export documentation ready',
      description: 'IEC code, export licenses, and shipping details',
      status: 'not-started',
      category: 'documentation',
      required: false
    }
  ])

  const [preparationActions, setPreparationActions] = useState<PreparationAction[]>([
    {
      id: 'action1',
      action: 'Create buyer presentation deck',
      type: 'prepare-summary',
      status: 'pending',
      linkedChecklistItem: 'check3',
      notes: 'Include business overview, product range, and competitive advantages'
    },
    {
      id: 'action2',
      action: 'Review export documentation requirements',
      type: 'review-requirement',
      status: 'pending',
      linkedChecklistItem: 'check4'
    },
    {
      id: 'action3',
      action: 'Gather product samples and images',
      type: 'gather-document',
      status: 'pending',
      linkedChecklistItem: 'check5'
    },
    {
      id: 'action4',
      action: 'Verify IEC code and export licenses',
      type: 'verify-detail',
      status: 'pending',
      linkedChecklistItem: 'check6'
    }
  ])

  const [progressSummary, setProgressSummary] = useState<ProgressSummary>({
    opportunitiesFound: 3,
    relevantOpportunities: 3,
    checklistCompleted: 2,
    checklistTotal: 6,
    actionsCompleted: 0,
    actionsPending: 4
  })

  const updateStepState = (stepId: string, state: Step['state']) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, state } : step
    ))
  }

  const updateProgressSummary = () => {
    const relevantOpps = opportunities.filter(o => o.relevanceScore >= 70).length
    const completed = checklistItems.filter(i => i.status === 'completed').length
    const actCompleted = preparationActions.filter(a => a.status === 'completed').length
    const actPending = preparationActions.filter(a => a.status === 'pending' || a.status === 'in-progress').length

    setProgressSummary({
      opportunitiesFound: opportunities.length,
      relevantOpportunities: relevantOpps,
      checklistCompleted: completed,
      checklistTotal: checklistItems.length,
      actionsCompleted: actCompleted,
      actionsPending: actPending
    })
  }

  const showNotice = (message: string) => {
    setNotice(message)
    setTimeout(() => setNotice(null), 3600)
  }

  return (
    <MarketReadyContext.Provider
      value={{
        activeStep,
        setActiveStep,
        steps,
        updateStepState,
        businessProduct,
        setBusinessProduct,
        marketObjective,
        setMarketObjective,
        opportunities,
        setOpportunities,
        selectedOpportunity,
        setSelectedOpportunity,
        checklistItems,
        setChecklistItems,
        preparationActions,
        setPreparationActions,
        progressSummary,
        updateProgressSummary,
        showNotice
      }}
    >
      {children}
      {notice && (
        <div className="fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-[#dce6df] bg-white px-4 py-3 text-sm font-medium shadow-[0_12px_30px_rgba(23,35,31,0.12)]">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e1f0e9] text-[#2c6b5c]">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 4 4L19 6" />
            </svg>
          </span>
          {notice}
        </div>
      )}
    </MarketReadyContext.Provider>
  )
}

export function useMarketReady() {
  const context = useContext(MarketReadyContext)
  if (context === undefined) {
    throw new Error('useMarketReady must be used within a MarketReadyProvider')
  }
  return context
}
