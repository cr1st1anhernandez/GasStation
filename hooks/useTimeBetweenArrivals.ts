import { useEffect, useState } from 'react'

import { useData } from '@/providers/dataContext'

export const useTimeBetweenArrivals = () => {
  const [timeBetweenArrivals, setTimeBetweenArrivals] = useState<number[]>([])
  const [minBetweenArrivals, setMinBetweenArrivals] = useState<
    number | undefined
  >()
  const [maxBetweenArrivals, setMaxBetweenArrivals] = useState<
    number | undefined
  >()
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

    processTimeBetweenArrivals()
  }, [data])

  return { timeBetweenArrivals, minBetweenArrivals, maxBetweenArrivals }
}
