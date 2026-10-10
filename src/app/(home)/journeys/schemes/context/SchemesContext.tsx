'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { 
  Step, 
  BusinessObjective, 
  Scheme, 
  EligibilityCriterion, 
  EvidenceSource,
  DocumentRequirement,
  RegistrationRequirement,
  ChecklistItem,
  NextAction,
  HumanAssistanceRequest,
  ProgressSummary
} from '../types'

type SchemesContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  steps: Step[]
  updateStepState: (stepId: string, state: Step['state']) => void
  businessObjective: BusinessObjective
  setBusinessObjective: (objective: BusinessObjective) => void
  schemes: Scheme[]
  setSchemes: (schemes: Scheme[]) => void
  selectedScheme: string | null
  setSelectedScheme: (schemeId: string | null) => void
  eligibilityCriteria: EligibilityCriterion[]
  setEligibilityCriteria: (criteria: EligibilityCriterion[]) => void
  evidenceSources: EvidenceSource[]
  setEvidenceSources: (sources: EvidenceSource[]) => void
  documentRequirements: DocumentRequirement[]
  setDocumentRequirements: (requirements: DocumentRequirement[]) => void
  registrationRequirements: RegistrationRequirement[]
  setRegistrationRequirements: (requirements: RegistrationRequirement[]) => void
  checklistItems: ChecklistItem[]
  setChecklistItems: (items: ChecklistItem[]) => void
  nextActions: NextAction[]
  setNextActions: (actions: NextAction[]) => void
  humanAssistance: HumanAssistanceRequest | null
  setHumanAssistance: (request: HumanAssistanceRequest | null) => void
  progressSummary: ProgressSummary
  updateProgressSummary: () => void
  showNotice: (message: string) => void
}

const SchemesContext = createContext<SchemesContextType | undefined>(undefined)

const initialSteps: Step[] = [
  { id: 'business-objective', number: 1, title: 'Business & Objective', detail: 'Profile and support needs', state: 'complete', required: true },
  { id: 'find-schemes', number: 2, title: 'Find Schemes & Support', detail: 'Discover relevant programs', state: 'complete', required: true },
  { id: 'eligibility-assessment', number: 3, title: 'Eligibility Assessment', detail: 'Check eligibility criteria', state: 'current', required: true },
  { id: 'evidence-sources', number: 4, title: 'Evidence & Sources', detail: 'Review supporting evidence', state: 'upcoming', required: true },
  { id: 'document-checklist', number: 5, title: 'Document & Registration', detail: 'Requirements checklist', state: 'upcoming', required: true },
  { id: 'next-action-plan', number: 6, title: 'Next-Action Plan', detail: 'Plan your next steps', state: 'upcoming', required: true },
  { id: 'human-assistance', number: 7, title: 'Human Assistance', detail: 'Get institutional support', state: 'upcoming', required: false },
  { id: 'review-save', number: 8, title: 'Review & Save', detail: 'Save your progress', state: 'upcoming', required: true },
]

export function SchemesProvider({ children }: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(2)
  const [steps, setSteps] = useState<Step[]>(initialSteps)
  const [notice, setNotice] = useState<string | null>(null)

  const [businessObjective, setBusinessObjective] = useState<BusinessObjective>({
    businessName: 'Sharma Handlooms',
    location: 'Jaipur, Rajasthan',
    sector: 'Textiles & handloom manufacturing',
    businessStage: 'Established (5+ years)',
    objective: 'Technology upgrade and market expansion',
    supportNeed: 'Subsidy for new machinery and export certification support',
    registrations: [
      { type: 'Udyam registration', status: 'Confirmed', confirmed: true, details: 'UDYAM-RJ-06-0012345' },
      { type: 'GST registration', status: 'Confirmed', confirmed: true, details: '08XXXXX1234X1ZX' }
    ],
    relevantDetails: [
      { label: 'Annual turnover', value: '₹48,50,000', category: 'financial' },
      { label: 'Number of employees', value: '12', category: 'operational' },
      { label: 'Export experience', value: 'None', category: 'market' }
    ]
  })

  const [schemes, setSchemes] = useState<Scheme[]>([
    {
      id: 'scheme1',
      name: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
      provider: 'SIDBI / Ministry of MSME',
      type: 'Credit guarantee',
      relevanceScore: 88,
      shortDescription: 'Collateral-free credit guarantee for MSMEs seeking term loans and working capital',
      relevanceExplanation: 'Your business qualifies as MSME under Udyam registration and can access collateral-free loans up to ₹5 crore',
      sourceTitle: 'CGTMSE Official Scheme Guidelines',
      sourceLink: 'https://www.cgtmse.in/scheme-overview',
      lastUpdated: 'March 2024',
      lastRetrieved: 'Today, 9:30 AM',
      eligibilityStatus: 'likely-relevant'
    },
    {
      id: 'scheme2',
      name: 'Technology Upgradation Fund Scheme (TUFS)',
      provider: 'Ministry of Textiles',
      type: 'Subsidy',
      relevanceScore: 92,
      shortDescription: 'Capital investment subsidy for technology upgradation in textile sector',
      relevanceExplanation: 'Directly applicable to handloom manufacturing businesses investing in modern machinery',
      sourceTitle: 'Ministry of Textiles TUFS Guidelines',
      sourceLink: 'https://texmin.nic.in/tufs',
      lastUpdated: 'January 2024',
      lastRetrieved: 'Today, 9:32 AM',
      eligibilityStatus: 'likely-relevant'
    },
    {
      id: 'scheme3',
      name: 'Stand Up India Scheme',
      provider: 'Department of Financial Services',
      type: 'Loan facility',
      relevanceScore: 45,
      shortDescription: 'Bank loans for SC/ST and women entrepreneurs',
      relevanceExplanation: 'Eligibility depends on entrepreneur category which was not specified',
      sourceTitle: 'Stand Up India Portal',
      sourceLink: 'https://www.standupmitra.in/',
      lastRetrieved: 'Today, 9:35 AM',
      eligibilityStatus: 'insufficient-information'
    }
  ])

  const [selectedScheme, setSelectedScheme] = useState<string | null>('scheme1')

  const [eligibilityCriteria, setEligibilityCriteria] = useState<EligibilityCriterion[]>([
    {
      id: 'crit1',
      schemeId: 'scheme1',
      criterion: 'Business registration',
      requirement: 'Valid Udyam registration',
      userInfo: 'Udyam registration confirmed: UDYAM-RJ-06-0012345',
      result: 'matches',
      explanation: 'Your business has valid Udyam registration which satisfies this requirement',
      evidenceSource: 'User profile'
    },
    {
      id: 'crit2',
      schemeId: 'scheme1',
      criterion: 'Business category',
      requirement: 'Micro or Small Enterprise',
      userInfo: 'Annual turnover: ₹48,50,000',
      result: 'matches',
      explanation: 'Turnover falls within micro enterprise limits (below ₹5 crore)',
      evidenceSource: 'MSME classification criteria',
      confidence: 0.95
    },
    {
      id: 'crit3',
      schemeId: 'scheme1',
      criterion: 'Loan amount',
      requirement: 'Credit facility up to ₹5 crore',
      userInfo: 'Not yet specified',
      result: 'unknown',
      explanation: 'Loan amount needs to be confirmed during application',
      evidenceSource: ''
    },
    {
      id: 'crit4',
      schemeId: 'scheme1',
      criterion: 'Collateral',
      requirement: 'No collateral required',
      userInfo: 'N/A',
      result: 'matches',
      explanation: 'This scheme provides collateral-free guarantee',
      evidenceSource: 'CGTMSE scheme guidelines'
    }
  ])

  const [evidenceSources, setEvidenceSources] = useState<EvidenceSource[]>([
    {
      id: 'source1',
      sourceName: 'CGTMSE Scheme Guidelines 2024',
      sourceLink: 'https://www.cgtmse.in/scheme-overview',
      relevantExcerpt: 'The scheme covers both term loan and/or working capital facility up to ₹5 crore per borrowing unit. No collateral security and no third party guarantee are required.',
      publicationDate: 'March 2024',
      retrievalTimestamp: 'Today, 9:30 AM',
      sourceMetadata: {
        version: '2024-v1',
        authority: 'CGTMSE / SIDBI',
        reliability: 'Official government source'
      },
      caveats: []
    },
    {
      id: 'source2',
      sourceName: 'MSME Classification Notification',
      sourceLink: 'https://msme.gov.in/classification',
      relevantExcerpt: 'Micro Enterprise: Investment in plant & machinery up to ₹1 crore and turnover up to ₹5 crore',
      publicationDate: 'June 2020',
      retrievalTimestamp: 'Today, 9:31 AM',
      sourceMetadata: {
        authority: 'Ministry of MSME',
        reliability: 'Official gazette notification'
      },
      caveats: ['Classification criteria revised as per latest notification']
    }
  ])

  const [documentRequirements, setDocumentRequirements] = useState<DocumentRequirement[]>([
    {
      id: 'doc1',
      schemeId: 'scheme1',
      documentName: 'Udyam registration certificate',
      required: true,
      status: 'available',
      description: 'Valid Udyam registration for MSME classification'
    },
    {
      id: 'doc2',
      schemeId: 'scheme1',
      documentName: 'KYC documents',
      required: true,
      status: 'available',
      description: 'PAN, Aadhaar, and address proof of proprietor'
    },
    {
      id: 'doc3',
      schemeId: 'scheme1',
      documentName: 'Project report',
      required: true,
      status: 'needed',
      description: 'Detailed project report for the loan purpose'
    },
    {
      id: 'doc4',
      schemeId: 'scheme1',
      documentName: 'Financial statements',
      required: true,
      status: 'pending-verification',
      description: 'Last 2 years audited balance sheet and P&L',
      notes: 'May be waived for micro enterprises based on bank discretion'
    }
  ])

  const [registrationRequirements, setRegistrationRequirements] = useState<RegistrationRequirement[]>([
    {
      id: 'reg1',
      schemeId: 'scheme1',
      registrationType: 'Udyam registration',
      required: true,
      status: 'verified',
      details: 'UDYAM-RJ-06-0012345'
    },
    {
      id: 'reg2',
      schemeId: 'scheme1',
      registrationType: 'Bank account',
      required: true,
      status: 'unverified',
      details: 'Active current account with participating bank',
      verificationLink: 'Link to banking profile section'
    }
  ])

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: 'check1',
      schemeId: 'scheme1',
      title: 'Udyam registration certificate',
      type: 'document',
      status: 'completed',
      linkToProfile: '/dashboard/profile',
      priority: 'high'
    },
    {
      id: 'check2',
      schemeId: 'scheme1',
      title: 'Project report for loan purpose',
      type: 'document',
      status: 'pending',
      linkToUpload: '/dashboard/documents',
      priority: 'high'
    },
    {
      id: 'check3',
      schemeId: 'scheme1',
      title: 'Verify bank account details',
      type: 'verification',
      status: 'pending',
      linkToProfile: '/dashboard/banking',
      priority: 'medium'
    },
    {
      id: 'check4',
      schemeId: 'scheme1',
      title: 'Financial statements',
      type: 'document',
      status: 'not-started',
      priority: 'medium'
    }
  ])

  const [nextActions, setNextActions] = useState<NextAction[]>([
    {
      id: 'action1',
      schemeId: 'scheme1',
      action: 'Prepare detailed project report',
      type: 'gather-document',
      status: 'pending',
      linkedCheckpoint: 'check2',
      notes: 'Include machinery details, cost breakdown, and expected ROI'
    },
    {
      id: 'action2',
      schemeId: 'scheme1',
      action: 'Verify bank account with participating CGTMSE bank',
      type: 'verify-condition',
      status: 'pending',
      linkedCheckpoint: 'check3'
    },
    {
      id: 'action3',
      schemeId: 'scheme1',
      action: 'Review official CGTMSE application process',
      type: 'review-process',
      status: 'pending',
      notes: 'Application is made through lending bank, not directly to CGTMSE'
    },
    {
      id: 'action4',
      schemeId: 'scheme2',
      action: 'Confirm loan amount requirement',
      type: 'confirm-field',
      status: 'pending'
    }
  ])

  const [humanAssistance, setHumanAssistance] = useState<HumanAssistanceRequest | null>(null)

  const [progressSummary, setProgressSummary] = useState<ProgressSummary>({
    totalSchemesFound: 3,
    likelyRelevant: 2,
    assessmentComplete: 1,
    eligibilityUnknowns: 2,
    documentsNeeded: 3,
    actionsCompleted: 0,
    actionsPending: 4
  })

  const updateStepState = (stepId: string, state: Step['state']) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, state } : step
    ))
  }

  const updateProgressSummary = () => {
    const likelyRelevant = schemes.filter(s => s.eligibilityStatus === 'likely-relevant').length
    const assessmentComplete = schemes.filter(s => 
      s.eligibilityStatus === 'likely-relevant' || s.eligibilityStatus === 'does-not-match'
    ).length
    const eligibilityUnknowns = eligibilityCriteria.filter(c => c.result === 'unknown').length
    const documentsNeeded = documentRequirements.filter(d => d.status === 'needed').length
    const actionsCompleted = nextActions.filter(a => a.status === 'completed').length
    const actionsPending = nextActions.filter(a => a.status === 'pending' || a.status === 'in-progress').length

    setProgressSummary({
      totalSchemesFound: schemes.length,
      likelyRelevant,
      assessmentComplete,
      eligibilityUnknowns,
      documentsNeeded,
      actionsCompleted,
      actionsPending
    })
  }

  const showNotice = (message: string) => {
    setNotice(message)
    setTimeout(() => setNotice(null), 3600)
  }

  return (
    <SchemesContext.Provider
      value={{
        activeStep,
        setActiveStep,
        steps,
        updateStepState,
        businessObjective,
        setBusinessObjective,
        schemes,
        setSchemes,
        selectedScheme,
        setSelectedScheme,
        eligibilityCriteria,
        setEligibilityCriteria,
        evidenceSources,
        setEvidenceSources,
        documentRequirements,
        setDocumentRequirements,
        registrationRequirements,
        setRegistrationRequirements,
        checklistItems,
        setChecklistItems,
        nextActions,
        setNextActions,
        humanAssistance,
        setHumanAssistance,
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
    </SchemesContext.Provider>
  )
}

export function useSchemes() {
  const context = useContext(SchemesContext)
  if (context === undefined) {
    throw new Error('useSchemes must be used within a SchemesProvider')
  }
  return context
}
