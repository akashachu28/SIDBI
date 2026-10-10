# Schemes & Compliance Journey

## Overview

The Schemes & Compliance Journey helps businesses discover relevant government schemes and programs, assess eligibility criteria, understand requirements, and plan next steps for application.

## Journey Structure

### Step B1: Business & Objective
**Goal:** Collect or reuse business profile and support needs

- Business name, location, sector
- Business stage (startup, growing, established, mature)
- Primary objective (e.g., technology upgrade, market expansion)
- Type of support needed
- Relevant registrations (Udyam, GST, etc.)
- Additional business details

### Step B2: Find Schemes & Support
**Goal:** Discover potentially relevant schemes from curated official sources

Features:
- Display schemes with relevance scores
- Short description and relevance explanation
- Source title, link, and last updated/retrieved information
- Expandable cards for detailed view
- "No supported match found" message when no reliable source exists

### Step B3: Eligibility Assessment
**Goal:** Assess eligibility criteria for each scheme

For each criterion:
- **Criterion/requirement:** What is being checked
- **User information:** Data from profile
- **Result:** `matches`, `does_not_match`, or `unknown`
- **Explanation:** Why this result was determined
- **Evidence/source:** Reference to supporting documentation

Overall status labels:
- `Likely relevant`
- `Partially assessed`
- `Does not appear to match`
- `Insufficient information`

**Important:** These are preliminary guidance, not official eligibility decisions.

### Step B4: Evidence & Sources
**Goal:** Display all sources used in assessment

For each source:
- Source name and link/reference
- Relevant excerpt or criterion
- Publication/update date (when available)
- Retrieval timestamp
- Source/version metadata
- Authority and reliability indicators
- Caveats or missing evidence warnings

### Step B5: Document & Registration Checklist
**Goal:** List requirements and track status

Shows:
- Documents potentially required (with mandatory/optional flags)
- Registrations or details to verify
- Current status of each item (available, needed, pending-verification)
- Links to profile or document upload
- Priority levels (high, medium, low)

**Note:** Avoids claiming a document is mandatory unless source supports the claim.

### Step B6: Next-Action Plan
**Goal:** Generate and track actionable tasks

Action types:
- **Confirm field:** Verify unknown eligibility field
- **Gather document:** Collect required documentation
- **Verify condition:** Check with relevant institution
- **Review process:** Study official application process

Status tracking:
- Pending
- In progress
- Completed
- Blocked

### Step B7: Human / Institution Assistance
**Goal:** Request help when eligibility is unclear

Features:
- Select assistance type (eligibility clarification, application guidance, etc.)
- Describe specific needs
- Choose related schemes
- List clarifications needed
- Select information to share
- Consent checkbox before sharing
- Alternative help options (articles, forum, hotline)

### Step B8: Review & Save
**Goal:** Summary and progress export

Shows:
- Business context summary
- Progress overview (schemes found, assessed, unknowns)
- Discovered schemes with eligibility status
- Next actions summary
- Human assistance status (if requested)
- Export and save functionality

## Key Principles

### No Fabrication
- If no reliable source is found, display "no supported match found"
- Never invent scheme information or eligibility criteria
- Always reference official sources

### Transparency
- Show data sources and retrieval timestamps
- Display confidence levels where available
- Include caveats and uncertainties
- Clear labeling of preliminary vs. official information

### Consent-Based Sharing
- Information only shared with explicit user consent
- Clear explanation of what will be shared and with whom
- User controls information sharing preferences

### No Automatic Submission
- Journey does not submit government applications
- Does not provide unsupported legal/tax advice
- Final eligibility must be confirmed by scheme authority

## Data Models

### Core Types
- `BusinessObjective`: Profile and support needs
- `Scheme`: Program information with relevance scoring
- `EligibilityCriterion`: Individual eligibility check
- `EvidenceSource`: Documentation and references
- `DocumentRequirement`: Required documents
- `RegistrationRequirement`: Registration verifications
- `NextAction`: Actionable tasks
- `HumanAssistanceRequest`: Help requests

### Status Enums
- **Eligibility:** likely-relevant, partially-assessed, does-not-match, insufficient-information
- **Criterion Result:** matches, does-not-match, unknown
- **Document Status:** available, needed, pending-verification
- **Action Status:** pending, in-progress, completed, blocked

## UI Components

### Layout Components
- `SchemesHeader`: Journey header with business context
- `StepSidebar`: Navigation through journey steps
- `StepContent`: Main content area with step routing
- `ProgressSidebar`: Summary and quick actions

### Step Components
- `StepBusinessObjective`: Profile collection
- `StepFindSchemes`: Scheme discovery and listing
- `StepEligibilityAssessment`: Detailed eligibility review
- `StepEvidenceSources`: Source documentation
- `StepDocumentChecklist`: Requirements tracking
- `StepNextActionPlan`: Task management
- `StepHumanAssistance`: Help request form
- `StepReviewSave`: Summary and export

## Context Management

The `SchemesContext` provides:
- Step navigation and state management
- Business objective data
- Schemes and eligibility assessments
- Evidence sources and requirements
- Checklist items and next actions
- Human assistance requests
- Progress summary calculations
- Global notification system

## Future Enhancements

1. **Real-time Scheme Discovery**
   - Integration with government APIs
   - Automatic updates when new schemes are published

2. **Advanced Matching**
   - ML-based relevance scoring
   - Similarity matching with past successful applications

3. **Document Intelligence**
   - Auto-fill from uploaded documents
   - Document validation and completeness checks

4. **Collaboration Features**
   - Share assessment with advisors
   - Multi-user applications
   - Comment and annotation system

5. **Application Tracking**
   - Link to submitted applications
   - Status updates from institutions
   - Timeline and milestone tracking

6. **Localization**
   - Multi-language support
   - Region-specific scheme databases
   - Local institution contacts

## Development Notes

- Built with Next.js App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Context API for state management
- Responsive design (mobile-first)
- Accessibility compliant (WCAG)

## Related Journeys

- **Credit-Ready Journey:** For funding readiness assessment
- **Market-Ready Journey:** For market expansion preparation
