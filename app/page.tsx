'use client'
import { Toaster } from 'sonner'

import SimulationDashboard from '@/components/simulationDashboard'
import { useData } from '@/providers/dataContext'
import About from '@/sections/about'
import Charts from '@/sections/charts'
import Data from '@/sections/data'
import Main from '@/sections/main'
import Tables from '@/sections/tables'

export default function Home() {
  const { data } = useData()

  return (
    <section className="flex w-full flex-col gap-12">
      <Toaster />
      <Main />
      <section className="">
        <About />
      </section>
      {data.length > 0 && (
        <>
          <SimulationDashboard />
          <Data />
          <Tables />
          <Charts />
        </>
      )}
    </section>
  )
}
