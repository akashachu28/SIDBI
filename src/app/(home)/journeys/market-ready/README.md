# Market Ready Journey

## Overview

The Market Ready Journey is a Phase 1 demonstrator that helps businesses discover market, tender, buyer, and export opportunities through curated sources. This is a limited implementation showing key workflows without building a full marketplace.

## Journey Structure

### Step C1: Business & Product
**Goal:** Collect or reuse business profile and product/service information

Features:
- Business name and location
- Product/service description
- Sector information
- Market objective
- Detailed offering description
- Profile summary card

### Step C2: Market Objective
**Goal:** Let users identify their intended outcome

Supported options in Phase 1:
- ✅ Find market opportunities
- ✅ Explore tenders
- ✅ Buyer & export opportunities

Features:
- Clear selection of supported objectives
- Explanation of each option
- Phase 1 scope disclaimer
- Visual confirmation of selection

### Step C3: Opportunities
**Goal:** Show curated opportunities from agreed sources

For each opportunity:
- **Title and type** (tender, export, market opportunity)
- **Source and link** to official platform
- **Location and sector** when available
- **Relevance score** and explanation
- **Requirements** list (documents, certifications, etc.)
- **Important caveats** and notes
- **Prototype data labels** for demo content
- **Deadline information** when applicable

Features:
- Expandable opportunity cards
- Relevance matching
- Clear labeling of demo vs. live data
- Source attribution
- Requirement checklists

### Step C4: Buyer / Proposal Checklist
**Goal:** Simple preparation checklist

Example checklist items:
- ✓ Confirm product/service details
- ✓ Gather business documents
- ⏳ Prepare buyer summary
- ⏳ Review opportunity requirements
- ○ Prepare product catalog
- ○ Export documentation ready

Categories:
- **Preparation:** Planning and readiness tasks
- **Documentation:** Required documents and files
- **Verification:** Checks and validations

Preparation Actions:
- Create buyer presentation deck
- Review export documentation
- Gather product samples
- Verify licenses and certifications

### Step C5: Review & Save
**Goal:** Summary and progress management

Shows:
- Business profile summary
- Opportunities discovered
- Checklist completion status
- Outstanding preparation actions
- Progress metrics
- Export and save functionality

## Phase 1 Scope

### What's Included ✅
- Curated opportunity discovery
- Manual opportunity matching
- Basic preparation checklist
- Demo data for illustration
- Source attribution
- Export opportunity examples

### What's Outside Phase 1 ❌
- Complete marketplace integration
- Full tender automation
- Extensive buyer databases
- Real-time opportunity feeds
- Automated matching algorithms
- Comprehensive export workflows
- Payment/transaction features
- Direct application submission

## Data Models

### Core Types
- `BusinessProduct`: Business profile and product info
- `MarketObjectiveType`: Selected market objective
- `Opportunity`: Market/tender/buyer opportunity
- `ChecklistItem`: Preparation checklist item
- `PreparationAction`: Action item for readiness
- `ProgressSummary`: Journey progress metrics

### Status Enums
- **Checklist Status:** completed, pending, not-started
- **Action Status:** pending, in-progress, completed
- **Opportunity Types:** Export opportunity, Tender, Market opportunity

## UI Components

### Layout Components
- `MarketReadyHeader`: Journey header with progress
- `StepSidebar`: Navigation through journey steps
- `StepContent`: Main content area with step routing
- `ProgressSidebar`: Summary and quick actions

### Step Components
- `StepBusinessProduct`: Profile and offering collection
- `StepMarketObjective`: Objective selection
- `StepOpportunities`: Opportunity discovery and listing
- `StepBuyerChecklist`: Preparation checklist and actions
- `StepReviewSave`: Summary and export

## Context Management

The `MarketReadyContext` provides:
- Step navigation and state
- Business and product data
- Market objective selection
- Opportunities list
- Checklist items and actions
- Progress summary calculations
- Global notification system

## Important Notes

### Demo Data
Opportunities marked with `isPrototype: true` are demo data for illustration purposes. They should be clearly labeled in the UI with badges like "DEMO DATA" or "PROTOTYPE".

### Source Attribution
All opportunities must include:
- Source name and link
- Publication/retrieval date
- Official source references
- Caveats and disclaimers

### No Automatic Submissions
This journey does NOT:
- Submit tender applications
- Register businesses automatically
- Make commitments on behalf of users
- Process payments or transactions

### Compliance
- Clear labeling of demo vs. live data
- Source attribution required
- Caveats and limitations disclosed
- Phase 1 scope communicated clearly

## Future Enhancements (Post-Phase 1)

1. **Full Marketplace Integration**
   - Real-time opportunity feeds
   - Advanced search and filtering
   - Automated matching algorithms

2. **Tender Automation**
   - Tender document generation
   - Automated submission workflows
   - Bid tracking and management

3. **Buyer Network**
   - Comprehensive buyer database
   - Direct messaging
   - RFQ management

4. **Export Services**
   - Complete export documentation
   - Shipping and logistics
   - International compliance

5. **Analytics**
   - Opportunity recommendations
   - Success rate tracking
   - Market insights

## Development Notes

- Built with Next.js App Router
- TypeScript for type safety
- Tailwind CSS matching credit-ready design
- Context API for state management
- Responsive mobile-first design
- Accessibility compliant (WCAG)

## Related Journeys

- **Credit-Ready Journey:** For funding readiness
- **Schemes & Compliance Journey:** For scheme discovery
