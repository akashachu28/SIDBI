'use client'

import React from 'react'
import { SchemesProvider } from './context/SchemesContext'
import SchemesHeader from './components/SchemesHeader'
import StepSidebar from './components/StepSidebar'
import StepContent from './components/StepContent'
import ProgressSidebar from './components/ProgressSidebar'

export default function SchemesPage() {
  return (
    <SchemesProvider>
      <SchemesContent />
    </SchemesProvider>
  )
}

function SchemesContent() {
  return (
    <div className="mx-auto max-w-360">
      {/* Journey Header */}
      <SchemesHeader />

      {/* Main Content Grid */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[270px_minmax(0,1fr)_280px]">
        {/* Step Navigation Sidebar */}
        <StepSidebar />

        {/* Step Content */}
        <StepContent />

        {/* Progress & Actions Sidebar */}
        <ProgressSidebar />
      </div>
    </div>
  )
}
