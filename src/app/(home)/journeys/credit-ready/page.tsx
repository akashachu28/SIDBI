'use client'

import React, { useState } from 'react'
import { CreditReadyProvider } from './context/CreditReadyContext'
import CreditReadyHeader from './components/CreditReadyHeader'
import StepSidebar from './components/StepSidebar'
import StepContent from './components/StepContent'
import ProgressSidebar from './components/ProgressSidebar'

export default function CreditReadyPage() {
  return (
    <CreditReadyProvider>
      <CreditReadyContent />
    </CreditReadyProvider>
  )
}

function CreditReadyContent() {
  return (
    <div className="mx-auto max-w-[1440px]">
      {/* Journey Header */}
      <CreditReadyHeader />

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
