# Credit Ready Journey

A comprehensive funding readiness assessment journey for MSMEs to prepare for meaningful lender conversations.

## Overview

The Credit Ready journey guides users through 9 structured steps to assess their funding readiness, identify gaps, and prepare necessary documentation for funding discussions.

## Journey Structure

### Steps

1. **A1. Funding Goal** (`StepFundingGoal.tsx`)
   - Collect funding amount and purpose
   - Define intended use (machinery, working capital, expansion)
   - Choose input mode (guided form, text, or voice)

2. **A2. Business Profile** (`StepBusinessProfile.tsx`)
   - Review and confirm business details
   - Verify registrations and sector information
   - Update business context and financial details

3. **A3. Information & Document Gaps** (`StepInfoGaps.tsx`)
   - View available information
   - Identify missing required information
   - Track recommended documents

4. **A4. Upload Documents** (`StepUploadDocuments.tsx`)
   - Upload supporting documents (PDF, images)
   - Track upload and processing status
   - View recommended document list
   - Retry failed uploads

5. **A5. Review Extracted Information** (`StepReviewExtracted.tsx`)
   - Review AI-extracted field values
   - View confidence scores and source documents
   - Confirm or edit extracted information
   - Track verification states

6. **A6. Readiness Assessment** (`StepReadinessAssessment.tsx`)
   - View overall readiness score
   - Review current strengths
   - Identify areas to strengthen
   - See outstanding information gaps
   - Get recommended next actions

7. **A7. Funding Checklist / DPR Outline** (`StepFundingChecklist.tsx`)
   - Track KYC and registration documents
   - Monitor financial document completion
   - Review funding-use evidence
   - Download checklist and DPR outline

8. **A8. Human Assistance** (`StepHumanAssistance.tsx`) - Optional
   - Request mentor, CA, lender, or institution support
   - Explain assistance needs
   - Select information to share
   - Provide consent for referral

9. **A9. Review & Save** (`StepReviewSave.tsx`)
   - Review journey summary
   - View completed steps and outstanding gaps
   - Check current readiness progress
   - Save journey version
   - Download summary

## File Structure

```
credit-ready/
├── page.tsx                      # Main page component
├── README.md                     # This file
├── types/
│   └── index.ts                 # TypeScript type definitions
├── context/
│   └── CreditReadyContext.tsx   # State management and context
└── components/
    ├── Icon.tsx                 # Icon component
    ├── CreditReadyHeader.tsx    # Journey header
    ├── StepSidebar.tsx          # Step navigation sidebar
    ├── StepContent.tsx          # Main content wrapper
    ├── ProgressSidebar.tsx      # Progress tracking sidebar
    └── steps/
        ├── StepFundingGoal.tsx
        ├── StepBusinessProfile.tsx
        ├── StepInfoGaps.tsx
        ├── StepUploadDocuments.tsx
        ├── StepReviewExtracted.tsx
        ├── StepReadinessAssessment.tsx
        ├── StepFundingChecklist.tsx
        ├── StepHumanAssistance.tsx
        └── StepReviewSave.tsx
```

## Key Features

### State Management
- Context-based state management with `CreditReadyContext`
- Persistent journey progress tracking
- Real-time updates across components

### Data Types
- **FundingGoal**: Amount, purpose, description, input mode
- **BusinessProfile**: Name, type, sector, location, registrations
- **Document**: Upload tracking with status management
- **ExtractedField**: AI-extracted data with verification states
- **InformationItem**: Required/optional information tracking
- **ReadinessAssessment**: Score, strengths, gaps, next actions
- **ChecklistItem**: Categorized completion tracking
- **HumanAssistanceRequest**: Referral request management

### Verification States
- `user-confirmed`: User has verified the value
- `needs-review`: Requires user confirmation
- `not-available`: Information not yet provided
- `extracted`: AI-extracted, awaiting review

### Document Status
- `pending`: Awaiting upload
- `uploading`: Upload in progress
- `processing`: Processing document
- `completed`: Successfully processed
- `failed`: Upload/processing failed

### Step States
- `complete`: Step finished
- `current`: Active step
- `upcoming`: Not yet started

## Design Principles

1. **Progressive Disclosure**: Information revealed step-by-step
2. **Clear Verification**: Always distinguish between AI-extracted and user-confirmed data
3. **Transparent Guidance**: Never present as loan approval or guarantee
4. **Flexible Input**: Support unknown/unavailable for non-mandatory fields
5. **Privacy First**: Explicit consent for information sharing
6. **Accessible Actions**: Clear next steps at every stage

## Important Guardrails

- Journey completion ≠ Loan approval
- Readiness score is preliminary guidance only
- Human assistance referrals are not guaranteed
- All extracted information requires user confirmation
- Documents remain private and authorized

## Usage

```tsx
import CreditReadyPage from '@/app/(home)/journeys/credit-ready/page'

// The page is a client component with built-in context
export default CreditReadyPage
```

## Navigation

Users can:
- Click step numbers in sidebar to jump between steps
- Use Previous/Next buttons for linear navigation
- Save progress at any point
- Resume from last checkpoint

## Notifications

Toast notifications appear for:
- Step completion
- Progress saved
- Document upload status
- Field verification
- Human assistance submission
- Download actions

## Responsive Design

- Mobile-first approach
- Tablet: 2-column layouts
- Desktop: 3-column layout with sticky sidebars
- Collapsible sections for mobile

## Accessibility

- Semantic HTML structure
- ARIA labels for progress indicators
- Keyboard navigation support
- Clear focus states
- Screen reader friendly
