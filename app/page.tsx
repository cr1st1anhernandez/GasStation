'use client'

import { Toaster } from 'sonner'

import Simulation from '@/components/simulation'
import { useData } from '@/providers/dataContext'
import About from '@/sections/about'
import Charts from '@/sections/charts'
import Data from '@/sections/data'
import Main from '@/sections/main'
import { Pumps } from '@/sections/pumps'
import Tables from '@/sections/tables'

export default function Home() {
  const { data } = useData()

  return (
    <section className="flex w-full flex-col gap-16">
      <Toaster />
      <Main />
      <section className="lg:grid flex flex-col grid-rows-1 grid-cols-3 gap-4">
        <div className="col-span-2 row-span-1">
          <About />
        </div>
        <div className="col-span-1 w-full row-span-1">
          <Simulation />
        </div>
      </section>
      {data.length > 0 && (
        <>
          <Data />
          <Tables />
          <Charts />
        </>
      )}
      <Pumps />
    </section>
  )
}
