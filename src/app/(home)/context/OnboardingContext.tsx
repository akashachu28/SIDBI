'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type OnboardingState = {
  isOnboarded: boolean
  businessInfoProvided: boolean
  businessProfileCompleted: boolean
  creditReadyUnlocked: boolean
  schemesUnlocked: boolean
  marketReadyUnlocked: boolean
  hasSkippedWelcome: boolean
}

type OnboardingContextType = {
  state: OnboardingState
  completeWelcome: () => void
  skipWelcome: () => void
  completeBusinessInfo: (info: string) => void
  completeBusinessProfile: () => void
  unlockJourney: (journey: 'credit' | 'schemes' | 'market') => void
  resetOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const initialState: OnboardingState = {
  isOnboarded: false,
  businessInfoProvided: false,
  businessProfileCompleted: false,
  creditReadyUnlocked: false,
  schemesUnlocked: false,
  marketReadyUnlocked: false,
  hasSkippedWelcome: false
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(initialState)

  const completeWelcome = () => {
    setState(prev => ({ ...prev, isOnboarded: true }))
  }

  const skipWelcome = () => {
    setState(prev => ({ ...prev, hasSkippedWelcome: true }))
  }

  const completeBusinessInfo = (info: string) => {
    setState(prev => ({ ...prev, businessInfoProvided: true }))
  }

  const completeBusinessProfile = () => {
    setState(prev => ({ ...prev, businessProfileCompleted: true }))
  }

  const unlockJourney = (journey: 'credit' | 'schemes' | 'market') => {
    setState(prev => ({
      ...prev,
      [`${journey}ReadyUnlocked`]: true
    }))
  }

  const resetOnboarding = () => {
    setState(initialState)
  }

  return (
    <OnboardingContext.Provider
      value={{
        state,
        completeWelcome,
        skipWelcome,
        completeBusinessInfo,
        completeBusinessProfile,
        unlockJourney,
        resetOnboarding
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
