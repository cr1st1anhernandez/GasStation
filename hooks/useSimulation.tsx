import { useEffect, useState } from 'react'

import { useData } from '@/providers/dataContext'
import { Data } from '@/types'

type PumpState = {
  id: number
  status: 'ocupada' | 'libre'
  occupiedTime: number
  idleTime: number
  currentClient?: number
}

type SimulationStats = {
  averageWaitTime: number
  pumpUtilization: Record<number, number>
  distributionParams: {
    arrivalRate: number
    serviceTimeParams: {
      mu: number
      sigma: number
    }
  }
  empiricalDistributions: {
    paymentTypes: Record<string, number>
    vehicleTypes: Record<string, number>
    productTypes: Record<string, number>
  }
}

export const useSimulation = () => {
  const [simulationTime, setSimulationTime] = useState<number>(0)
  const { data, numPumps } = useData()
  const [pumps, setPumps] = useState<PumpState[]>([])
  const [stats, setStats] = useState<SimulationStats>({
    averageWaitTime: 0,
    pumpUtilization: {},
    distributionParams: {
      arrivalRate: 0,
      serviceTimeParams: { mu: 0, sigma: 0 },
    },
    empiricalDistributions: {
      paymentTypes: {},
      vehicleTypes: {},
      productTypes: {},
    },
  })

  useEffect(() => {
    if (!data.length) return

    const calculateParams = () => {
      // Calculate arrival rate
      const avgTimeBetweenArrivals =
        data.reduce((sum, client) => sum + client.TiempoEntreLlegadas, 0) /
        (data.length - 1)
      const lambda = 1 / avgTimeBetweenArrivals

      // Calculate service time params
      const serviceTimes = data.map((client) =>
        Math.log(client.DuracionServicio)
      )
      const mu =
        serviceTimes.reduce((sum, time) => sum + time, 0) / serviceTimes.length
      const sigma = Math.sqrt(
        serviceTimes.reduce((sum, time) => sum + Math.pow(time - mu, 2), 0) /
          serviceTimes.length
      )

      // Calculate empirical distributions
      const calculateDistribution = (key: keyof Data) => {
        const distribution: Record<string, number> = {}

        data.forEach((client) => {
          const value = client[key] as string

          distribution[value] = (distribution[value] || 0) + 1
        })
        Object.keys(distribution).forEach((key) => {
          distribution[key] = distribution[key] / data.length
        })

        return distribution
      }

      setStats((prev) => ({
        ...prev,
        distributionParams: {
          arrivalRate: lambda,
          serviceTimeParams: { mu, sigma },
        },
        empiricalDistributions: {
          paymentTypes: calculateDistribution('TipoPago'),
          vehicleTypes: calculateDistribution('TipoAutomovil'),
          productTypes: calculateDistribution('TipoProducto'),
        },
      }))
    }

    calculateParams()
  }, [data])

  const generateNextArrivalTime = (lambda: number): number =>
    -Math.log(1 - Math.random()) / lambda

  const generateServiceTime = (mu: number, sigma: number): number => {
    const z =
      Math.sqrt(-2 * Math.log(Math.random())) *
      Math.cos(2 * Math.PI * Math.random())

    return Math.exp(mu + sigma * z)
  }

  const selectFromEmpirical = (
    distribution: Record<string, number>
  ): string => {
    const r = Math.random()
    let cumulative = 0

    for (const [key, prob] of Object.entries(distribution)) {
      cumulative += prob
      if (r <= cumulative) return key
    }

    return Object.keys(distribution)[0]
  }

  const findAvailablePump = (): number | null => {
    const availablePump = pumps.find((pump) => pump.status === 'libre')

    return availablePump ? availablePump.id : null
  }

  const runSimulation = (steps: number) => {
    for (let i = 0; i < steps; i++) {
      const {
        arrivalRate,
        serviceTimeParams: { mu, sigma },
      } = stats.distributionParams

      const nextArrival = generateNextArrivalTime(arrivalRate)
      const serviceTime = generateServiceTime(mu, sigma)
      const pumpId = findAvailablePump()

      setSimulationTime((prevTime) => prevTime + nextArrival)

      if (pumpId !== null) {
        setPumps((prevPumps) =>
          prevPumps.map((pump) =>
            pump.id === pumpId
              ? {
                  ...pump,
                  status: 'ocupada',
                  occupiedTime: pump.occupiedTime + serviceTime,
                }
              : pump
          )
        )
      }
    }
  }

  const initializeSimulation = () => {
    setPumps(
      Array.from({ length: numPumps }, (_, index) => ({
        id: index + 1,
        status: 'libre',
        occupiedTime: 0,
        idleTime: 0,
      }))
    )
    setSimulationTime(0)
  }

  return {
    stats,
    simulationTime,
    pumps,
    runSimulation,
    initializeSimulation,
    numPumps,
  }
}
