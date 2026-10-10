'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Step, FundingGoal, BusinessProfile, Document, ExtractedField, InformationItem, ReadinessAssessment, ChecklistItem, HumanAssistanceRequest } from '../types'

type CreditReadyContextType = {
  activeStep: number
  setActiveStep: (step: number) => void
  steps: Step[]
  updateStepState: (stepId: string, state: Step['state']) => void
  fundingGoal: FundingGoal
  setFundingGoal: (goal: FundingGoal) => void
  businessProfile: BusinessProfile
  setBusinessProfile: (profile: BusinessProfile) => void
  documents: Document[]
  setDocuments: (documents: Document[]) => void
  informationItems: InformationItem[]
  setInformationItems: (items: InformationItem[]) => void
  extractedFields: ExtractedField[]
  setExtractedFields: (fields: ExtractedField[]) => void
  readinessAssessment: ReadinessAssessment
  setReadinessAssessment: (assessment: ReadinessAssessment) => void
  checklistItems: ChecklistItem[]
  setChecklistItems: (items: ChecklistItem[]) => void
  humanAssistance: HumanAssistanceRequest | null
  setHumanAssistance: (request: HumanAssistanceRequest | null) => void
  showNotice: (message: string) => void
}

const CreditReadyContext = createContext<CreditReadyContextType | undefined>(undefined)

const initialSteps: Step[] = [
  { id: 'funding-goal', number: 1, title: 'Funding Goal', detail: 'Amount and intended use', state: 'complete', required: true },
  { id: 'business-profile', number: 2, title: 'Business Profile', detail: 'Confirm business details', state: 'complete', required: true },
  { id: 'info-gaps', number: 3, title: 'Information & Gaps', detail: 'Review missing inputs', state: 'current', required: true },
  { id: 'upload-documents', number: 4, title: 'Upload Documents', detail: 'Add supporting files', state: 'upcoming', required: true },
  { id: 'review-extracted', number: 5, title: 'Review Information', detail: 'Verify extracted details', state: 'upcoming', required: true },
  { id: 'readiness-assessment', number: 6, title: 'Readiness Assessment', detail: 'Understand your position', state: 'upcoming', required: true },
  { id: 'funding-checklist', number: 7, title: 'Funding Checklist', detail: 'Prepare useful artefacts', state: 'upcoming', required: true },
  { id: 'human-assistance', number: 8, title: 'Human Assistance', detail: 'Request expert support', state: 'upcoming', required: false },
  { id: 'review-save', number: 9, title: 'Review & Save', detail: 'Review your journey', state: 'upcoming', required: true },
]

export function CreditReadyProvider({ children }: { children: ReactNode }) {
  const [activeStep, setActiveStep] = useState(2)
  const [steps, setSteps] = useState<Step[]>(initialSteps)
  const [notice, setNotice] = useState<string | null>(null)

  const [fundingGoal, setFundingGoal] = useState<FundingGoal>({
    amount: '1200000',
    currency: 'INR',
    purpose: 'Working capital',
    description: 'Purchase raw materials and support seasonal production for upcoming wholesale orders.',
    inputMode: 'Guided form'
  })

  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    businessName: 'Sharma Handlooms',
    businessType: 'Sole proprietorship',
    sector: 'Textiles & handloom manufacturing',
    location: 'Jaipur, Rajasthan',
    yearsOfOperation: 6,
    registrations: [
      { type: 'Udyam registration', status: 'Confirmed', confirmed: true }
    ],
    financialDetails: [
      { label: 'Last financial year turnover', value: 'Known', verified: false }
    ]
  })

  const [documents, setDocuments] = useState<Document[]>([
    { id: 'doc1', name: 'bank_statement_q1.pdf', type: 'Bank Statement', status: 'completed', uploadDate: 'Today, 10:15 AM', size: '2.4 MB' },
    { id: 'doc2', name: 'gst_return_fy23.pdf', type: 'GST Return', status: 'processing', uploadDate: 'Today, 10:18 AM', size: '1.1 MB' }
  ])

  const [informationItems, setInformationItems] = useState<InformationItem[]>([
    { id: 'info1', label: 'Business registration details', category: 'available', available: true, required: true },
    { id: 'info2', label: 'Funding goal and intended use', category: 'available', available: true, required: true },
    { id: 'info3', label: 'Last financial year turnover', category: 'available', available: true, required: true },
    { id: 'info4', label: 'Latest 6-month bank statement', category: 'needed', available: false, required: true },
    { id: 'info5', label: 'Current outstanding loan details', category: 'needed', available: false, required: true },
    { id: 'info6', label: 'Machinery supplier quotation', category: 'needed', available: false, required: false }
  ])

  const [extractedFields, setExtractedFields] = useState<ExtractedField[]>([
    { id: 'field1', label: 'Annual turnover', value: '₹48,50,000', source: 'GST return', confidence: 0.95, state: 'needs-review' },
    { id: 'field2', label: 'Average monthly balance', value: '₹3,20,000', source: 'Bank statement', confidence: 0.88, state: 'needs-review' },
    { id: 'field3', label: 'Equipment cost', value: 'Not yet available', source: '', state: 'not-available' }
  ])

  const [readinessAssessment, setReadinessAssessment] = useState<ReadinessAssessment>({
    overallScore: 64,
    strengths: [
      'Clear working-capital purpose',
      'Established operating history',
      'Core registration details confirmed'
    ],
    areasToStrengthen: [
      'Add recent banking evidence',
      'Confirm current liabilities',
      'Document expected use of funds'
    ],
    gaps: [
      'Latest 6-month bank statement',
      'Current outstanding loan details',
      'Machinery supplier quotation'
    ],
    unknowns: [],
    nextActions: [
      'Upload recent bank statements',
      'Provide details of existing loans',
      'Add supplier quotation if available'
    ]
  })

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { id: 'check1', title: 'Business KYC documents', completed: true, optional: false, category: 'kyc' },
    { id: 'check2', title: 'Udyam registration certificate', completed: true, optional: false, category: 'kyc' },
    { id: 'check3', title: 'PAN card', completed: true, optional: false, category: 'kyc' },
    { id: 'check4', title: 'GST registration', completed: true, optional: false, category: 'kyc' },
    { id: 'check5', title: 'Bank statements (6 months)', completed: false, optional: false, category: 'financial' },
    { id: 'check6', title: 'Income tax returns', completed: false, optional: true, category: 'financial' },
    { id: 'check7', title: 'Existing loan details', completed: false, optional: false, category: 'financial' },
    { id: 'check8', title: 'Use of funds documentation', completed: false, optional: false, category: 'purpose' }
  ])

  const [humanAssistance, setHumanAssistance] = useState<HumanAssistanceRequest | null>(null)

  const updateStepState = (stepId: string, state: Step['state']) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, state } : step
    ))
  }

  const showNotice = (message: string) => {
    setNotice(message)
    setTimeout(() => setNotice(null), 3600)
  }

  return (
    <CreditReadyContext.Provider
      value={{
        activeStep,
        setActiveStep,
        steps,
        updateStepState,
        fundingGoal,
        setFundingGoal,
        businessProfile,
        setBusinessProfile,
        documents,
        setDocuments,
        informationItems,
        setInformationItems,
        extractedFields,
        setExtractedFields,
        readinessAssessment,
        setReadinessAssessment,
        checklistItems,
        setChecklistItems,
        humanAssistance,
        setHumanAssistance,
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
    </CreditReadyContext.Provider>
  )
}

export function useCreditReady() {
  const context = useContext(CreditReadyContext)
  if (context === undefined) {
    throw new Error('useCreditReady must be used within a CreditReadyProvider')
  }
  return context
}
