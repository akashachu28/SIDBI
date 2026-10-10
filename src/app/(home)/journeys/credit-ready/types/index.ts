export type StepState = 'complete' | 'current' | 'upcoming'

export type Step = {
  id: string
  number: number
  title: string
  detail: string
  state: StepState
  required: boolean
}

export type InputMode = 'Guided form' | 'Write in my own words' | 'Voice input'

export type VerificationState = 'user-confirmed' | 'needs-review' | 'not-available' | 'extracted'

export type DocumentStatus = 'uploading' | 'processing' | 'completed' | 'failed' | 'pending'

export type Document = {
  id: string
  name: string
  type: string
  status: DocumentStatus
  uploadDate?: string
  size?: string
}

export type ExtractedField = {
  id: string
  label: string
  value: string
  source: string
  confidence?: number
  state: VerificationState
}

export type InformationItem = {
  id: string
  label: string
  category: string
  available: boolean
  required: boolean
}

export type FundingGoal = {
  amount: string
  currency: string
  purpose: string
  description: string
  inputMode: InputMode
}

export type BusinessProfile = {
  businessName: string
  businessType: string
  sector: string
  location: string
  yearsOfOperation: number
  registrations: {
    type: string
    status: string
    confirmed: boolean
  }[]
  financialDetails: {
    label: string
    value: string
    verified: boolean
  }[]
}

export type ReadinessAssessment = {
  overallScore: number
  strengths: string[]
  areasToStrengthen: string[]
  gaps: string[]
  unknowns: string[]
  nextActions: string[]
}

export type ChecklistItem = {
  id: string
  title: string
  completed: boolean
  optional: boolean
  category: string
}

export type HumanAssistanceRequest = {
  assistanceType: string
  reason: string
  infoToShare: string[]
  consentGiven: boolean
  status: 'draft' | 'submitted' | 'pending' | 'connected' | 'declined'
}
