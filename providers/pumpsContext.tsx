import { createContext, ReactNode, useContext, useState } from 'react'

interface PumpAverage {
  pumpNumber: number
  averageServiceTime: number
}

interface PumpsContextProps {
  pumpsAverage: PumpAverage[]
  pumpsOptimized: PumpAverage[]
  setPumpsAverage: (pumpsAverage: PumpAverage[]) => void
  setPumpsOptimized: (pumpsOptimized: PumpAverage[]) => void
}

const PumpsContext = createContext<PumpsContextProps | undefined>(undefined)

export const PumpsProvider = ({ children }: { children: ReactNode }) => {
  const [pumpsAverage, setPumpsAverage] = useState<PumpAverage[]>([])
  const [pumpsOptimized, setPumpsOptimized] = useState<PumpAverage[]>([])

  return (
    <PumpsContext.Provider
      value={{
        pumpsAverage,
        setPumpsAverage,
        setPumpsOptimized,
        pumpsOptimized,
      }}
    >
      {children}
    </PumpsContext.Provider>
  )
}

export const usePumps = () => {
  const context = useContext(PumpsContext)

  if (!context) {
    throw new Error('usePumps must be used within a PumpsProvider')
  }

  return context
}
