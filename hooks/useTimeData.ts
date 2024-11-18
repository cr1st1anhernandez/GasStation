import { useEffect, useState } from 'react'

import { useData } from '@/providers/dataContext'

export const useTimeData = () => {
  const [timeBetweenArrivals, setTimeBetweenArrivals] = useState<number[]>([])
  const [minBetweenArrivals, setMinBetweenArrivals] = useState<number>()
  const [maxBetweenArrivals, setMaxBetweenArrivals] = useState<number>()

  const [timeService, setTimeService] = useState<number[]>([])
  const [minService, setMinService] = useState<number | undefined>()
  const [maxService, setMaxService] = useState<number | undefined>()

  const { data } = useData()

  useEffect(() => {
    const processTimeBetweenArrivals = () => {
      const times = data
        .map((item) => item.TiempoEntreLlegadas)
        .filter((time) => !isNaN(time))

      if (times.length > 0) {
        setTimeBetweenArrivals(times)
        setMinBetweenArrivals(Math.min(...times))
        setMaxBetweenArrivals(Math.max(...times))
      }
    }

    const processTimeService = () => {
      const times = data
        .map((item) => item.DuracionServicio)
        .filter((time) => !isNaN(time))

      if (times.length > 0) {
        setTimeService(times)
        setMinService(Math.min(...times))
        setMaxService(Math.max(...times))
      }
    }

    processTimeBetweenArrivals()
    processTimeService()
  }, [data])

  return {
    timeBetweenArrivals,
    minBetweenArrivals,
    maxBetweenArrivals,
    timeService,
    minService,
    maxService,
  }
}
