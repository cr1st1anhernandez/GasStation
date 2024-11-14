import { Kbd } from '@nextui-org/kbd'
import { useEffect, useState } from 'react'

import { Chart } from '@/components/chart'
import PaginationTable from '@/components/paginationTable'
import { dataColumns, frequencyColumns } from '@/components/primitives'
import { generateFrequencyDistribution } from '@/data/functions'
import { Data } from '@/types'

interface DataSectionProps {
  data: Data[]
  dataRef: React.RefObject<HTMLDivElement>
}

export default function DataSection({ data, dataRef }: DataSectionProps) {
  const [timeBetweenArrivals, setTimeBetweenArrivals] = useState<number[]>([])
  const [minBetweenArrivals, setMinBetweenArrivals] = useState<number>()
  const [maxBetweenArrivals, setMaxBetweenArrivals] = useState<number>()
  const [timeService, setTimeService] = useState<number[]>([])
  const [minService, setMinService] = useState<number>()
  const [maxService, setMaxService] = useState<number>()

  useEffect(() => {
    const processTimeBetweenArrivals = () => {
      const times = data
        .map((item) => parseFloat(item.TiempoEntreLlegadas))
        .filter((time) => !isNaN(time))

      if (times.length > 0) {
        setTimeBetweenArrivals(times)
        setMinBetweenArrivals(Math.min(...times))
        setMaxBetweenArrivals(Math.max(...times))
      }
    }
    const processTimeService = () => {
      const times = data
        .map((item) => parseFloat(item.DuracionServicio))
        .filter((time) => !isNaN(time))

      if (times.length > 0) {
        setTimeService(times)
        setMinService(Math.min(...times))
        setMaxService(Math.max(...times))
      }
    }

    processTimeService()
    processTimeBetweenArrivals()
  }, [data])

  return (
    <section ref={dataRef} className="flex w-full flex-col gap-4" id="datos">
      {data.length ? (
        <>
          <div className="flex flex-col gap-4 pt-24">
            <h2 className="text-2xl font-semibold">Datos</h2>
            <PaginationTable columns={dataColumns} data={data} rows={10} />
          </div>
          {minService &&
          maxService &&
          timeService.length &&
          timeBetweenArrivals.length &&
          minBetweenArrivals &&
          maxBetweenArrivals ? (
            <>
              <div className="flex w-full flex-col gap-4">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <header className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold">
                        Tiempo Entre llegadas
                      </h2>
                      <Kbd keys={['option']}>
                        {`
                          Formula: AC= R / (1+3.322 log (n))
                          `}
                      </Kbd>
                    </header>
                    <PaginationTable
                      columns={frequencyColumns}
                      data={generateFrequencyDistribution(
                        timeBetweenArrivals,
                        minBetweenArrivals,
                        maxBetweenArrivals,
                        timeBetweenArrivals.length
                      )}
                      rows={5}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <header className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold">
                        Tiempo de Servicio
                      </h2>
                      <Kbd keys={['option']}>
                        {`
                          Formula: AC= R / (1+3.322 log (n))
                          `}
                      </Kbd>
                    </header>
                    <PaginationTable
                      columns={frequencyColumns}
                      data={generateFrequencyDistribution(
                        timeService,
                        minService,
                        maxService,
                        timeService.length
                      )}
                      rows={5}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <header className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold">
                        Tiempo Entre llegadas
                      </h2>
                    </header>
                    <Chart
                      columns={frequencyColumns}
                      data={generateFrequencyDistribution(
                        timeBetweenArrivals,
                        minBetweenArrivals,
                        maxBetweenArrivals,
                        timeBetweenArrivals.length
                      )}
                      rows={5}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <header className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold">
                        Tiempo de Servicio
                      </h2>
                    </header>
                    <Chart
                      columns={frequencyColumns}
                      data={generateFrequencyDistribution(
                        timeService,
                        minService,
                        maxService,
                        timeService.length
                      )}
                      rows={5}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600">No se han encontrado datos válidos</p>
          )}
        </>
      ) : null}
    </section>
  )
}
