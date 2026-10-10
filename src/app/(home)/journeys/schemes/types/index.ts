export type StepState = 'complete' | 'current' | 'upcoming'

export type Step = {
  id: string
  number: number
  title: string
  detail: string
  state: StepState
  required: boolean
}

export type BusinessObjective = {
  businessName: string
  location: string
  sector: string
  businessStage: string
  objective: string
  supportNeed: string
  registrations: Registration[]
  relevantDetails: RelevantDetail[]
}

export type Registration = {
  type: string
  status: string
  confirmed: boolean
  details?: string
}

export type RelevantDetail = {
  label: string
  value: string
  category: string
}

export type Scheme = {
  id: string
  name: string
  provider: string
  type: string
  relevanceScore: number
  shortDescription: string
  relevanceExplanation: string
  sourceTitle: string
  sourceLink: string
  lastUpdated?: string
  lastRetrieved: string
  eligibilityStatus: EligibilityStatus
}

export type EligibilityStatus = 
  | 'likely-relevant' 
  | 'partially-assessed' 
  | 'does-not-match' 
  | 'insufficient-information'
  | 'not-assessed'

export type EligibilityCriterion = {
  id: string
  schemeId: string
  criterion: string
  requirement: string
  userInfo: string
  result: 'matches' | 'does-not-match' | 'unknown'
  explanation: string
  evidenceSource: string
  confidence?: number
}

export type EvidenceSource = {
  id: string
  sourceName: string
  sourceLink: string
  relevantExcerpt: string
  publicationDate?: string
  retrievalTimestamp: string
  sourceMetadata: {
    version?: string
    authority?: string
    reliability?: string
  }
  caveats: string[]
}

export type DocumentRequirement = {
  id: string
  schemeId: string
  documentName: string
  required: boolean
  status: 'available' | 'needed' | 'pending-verification'
  description: string
  notes?: string
}

export type RegistrationRequirement = {
  id: string
  schemeId: string
  registrationType: string
  required: boolean
  status: 'verified' | 'unverified' | 'not-applicable'
  details: string
  verificationLink?: string
}

export type ChecklistItem = {
  id: string
  schemeId: string
  title: string
  type: 'document' | 'registration' | 'verification'
  status: 'completed' | 'pending' | 'not-started'
  linkToProfile?: string
  linkToUpload?: string
  priority: 'high' | 'medium' | 'low'
}

export type NextAction = {
  id: string
  schemeId: string
  action: string
  type: 'confirm-field' | 'gather-document' | 'verify-condition' | 'review-process'
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  linkedCheckpoint?: string
  notes?: string
  dueDate?: string
}

export type HumanAssistanceRequest = {
  assistanceType: string
  reason: string
  schemes: string[]
  clarificationNeeded: string[]
  infoToShare: string[]
  consentGiven: boolean
  status: 'draft' | 'submitted' | 'pending' | 'connected' | 'declined'
  requestDate?: string
}

export type ProgressSummary = {
  totalSchemesFound: number
  likelyRelevant: number
  assessmentComplete: number
  eligibilityUnknowns: number
  documentsNeeded: number
  actionsCompleted: number
  actionsPending: number
}
