export type StepState = 'complete' | 'current' | 'upcoming'

export type Step = {
  id: string
  number: number
  title: string
  detail: string
  state: StepState
  required: boolean
}

export type BusinessProduct = {
  businessName: string
  productService: string
  sector: string
  location: string
  marketObjective: string
  description: string
}

export type MarketObjectiveType = 
  | 'market-opportunities' 
  | 'tenders' 
  | 'buyer-export'

export type Opportunity = {
  id: string
  title: string
  type: string
  source: string
  sourceLink: string
  location?: string
  sector?: string
  relevanceScore: number
  relevanceExplanation: string
  caveats: string[]
  isPrototype: boolean
  publishedDate?: string
  deadline?: string
  estimatedValue?: string
  requirements: string[]
}

export type ChecklistItem = {
  id: string
  title: string
  description: string
  status: 'completed' | 'pending' | 'not-started'
  category: 'preparation' | 'documentation' | 'verification'
  required: boolean
  linkedTo?: string
}

export type PreparationAction = {
  id: string
  action: string
  type: 'gather-document' | 'prepare-summary' | 'review-requirement' | 'verify-detail'
  status: 'pending' | 'in-progress' | 'completed'
  linkedChecklistItem?: string
  notes?: string
}

export type ProgressSummary = {
  opportunitiesFound: number
  relevantOpportunities: number
  checklistCompleted: number
  checklistTotal: number
  actionsCompleted: number
  actionsPending: number
}
