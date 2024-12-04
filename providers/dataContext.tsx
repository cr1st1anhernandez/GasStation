import { createContext, ReactNode, useContext, useState } from 'react'

import { Data } from '@/types'

interface DataContextProps {
  data: Data[]
  setData: (data: Data[]) => void
  numPumps: number
  setNumPumps: (num: number) => void
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Data[]>([])
  const [numPumps, setNumPumps] = useState(0)

  return (
    <DataContext.Provider value={{ data, setData, numPumps, setNumPumps }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }

  return context
}
