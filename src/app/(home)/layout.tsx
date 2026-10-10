import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f6f2]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="ml-[252px] flex min-h-screen flex-1 flex-col">
        {/* Navbar */}
        <Navbar />
        
        {/* Page Content */}
        <main className="flex-1 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  )
}
