'use client'

import React from 'react'
import { MarketReadyProvider } from './context/MarketReadyContext'
import MarketReadyHeader from './components/MarketReadyHeader'
import StepSidebar from './components/StepSidebar'
import StepContent from './components/StepContent'
import ProgressSidebar from './components/ProgressSidebar'

export default function MarketReadyPage() {
  return (
    <MarketReadyProvider>
      <MarketReadyContent />
    </MarketReadyProvider>
  )
}

function MarketReadyContent() {
  return (
    <div className="px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
      <div className="mx-auto max-w-360">
      {/* Journey Header */}
      <MarketReadyHeader />

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
    </div>
  )
}
