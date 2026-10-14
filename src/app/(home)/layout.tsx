import React from 'react'
import Sidebar from './components/Sidebar'
import { OnboardingProvider } from './context/OnboardingContext'
import Navbar from './components/Navbar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OnboardingProvider>
      <div className="flex h-dvh overflow-hidden bg-[#f5f6f2]">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="ml-[252px] flex min-h-0 min-w-0 overflow-hidden flex-1 flex-col">
          {/* Navbar */}
          <Navbar />
          
          {/* Page Content */}
          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </OnboardingProvider>
  )
}
