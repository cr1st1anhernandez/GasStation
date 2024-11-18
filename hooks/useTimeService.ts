import { useEffect, useState } from 'react'

import { useData } from '@/providers/dataContext'

export const useTimeService = () => {
  const [timeService, setTimeService] = useState<number[]>([])
  const [minService, setMinService] = useState<number | undefined>()
  const [maxService, setMaxService] = useState<number | undefined>()
  const { data } = useData()

  useEffect(() => {
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

    processTimeService()
  }, [data])

  return { timeService, minService, maxService }
}
