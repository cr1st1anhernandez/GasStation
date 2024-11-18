import { createContext, ReactNode, useContext, useState } from 'react'

import { Data } from '@/types'

interface DataContextProps {
  data: Data[]
  setData: (data: Data[]) => void
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Data[]>([])

  return (
    <DataContext.Provider value={{ data, setData }}>
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
