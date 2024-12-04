import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

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
  const simulationInterval = useRef<NodeJS.Timeout>()
  const { data, numPumps } = useData()
  const [pumps, setPumps] = useState<PumpState[]>([])
  const [isSimulating, setIsSimulating] = useState(false)
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

      const initialPumpUtilization = Object.fromEntries(
        Array.from({ length: numPumps }, (_, i) => [i + 1, 0])
      )

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

  const updatePumpUtilization = useCallback(() => {
    setPumps((prevPumps) =>
      prevPumps.map((pump) => {
        const utilizationTime =
          pump.status === 'ocupada' ? pump.occupiedTime : pump.idleTime

        setStats((prevStats) => ({
          ...prevStats,
          pumpUtilization: {
            ...prevStats.pumpUtilization,
            [pump.id]: utilizationTime / simulationTime,
          },
        }))

        return pump
      })
    )
  }, [simulationTime])

  const runSimulation = (steps: number) => {
    setIsSimulating(true)
    let currentStep = 0

    simulationInterval.current = setInterval(() => {
      if (currentStep >= steps) {
        // Actualizar utilización final
        setPumps((prev) => {
          const utilization = prev.reduce(
            (acc, pump) => ({
              ...acc,
              [pump.id]:
                pump.occupiedTime / (pump.occupiedTime + pump.idleTime),
            }),
            {}
          )

          setStats((prevStats) => ({
            ...prevStats,
            pumpUtilization: utilization,
          }))

          return prev.map((pump) => ({
            ...pump,
            status: 'libre',
          }))
        })

        clearInterval(simulationInterval.current)
        setIsSimulating(false)
        toast.success('Simulacion Terminada')

        return
      }

      setPumps((prev: PumpState[]) => {
        const newPumps = prev.map((pump) => {
          const newStatus: 'ocupada' | 'libre' =
            Math.random() > 0.5 ? 'ocupada' : 'libre'

          return {
            ...pump,
            status: newStatus,
            occupiedTime:
              newStatus === 'ocupada'
                ? pump.occupiedTime + 1
                : pump.occupiedTime,
            idleTime: newStatus === 'libre' ? pump.idleTime + 1 : pump.idleTime,
          }
        })

        // Actualizar utilización en cada paso
        const utilization = newPumps.reduce(
          (acc, pump) => ({
            ...acc,
            [pump.id]: pump.occupiedTime / (pump.occupiedTime + pump.idleTime),
          }),
          {}
        )

        setStats((prevStats) => ({
          ...prevStats,
          pumpUtilization: utilization,
        }))

        return newPumps
      })

      setSimulationTime((prev) => prev + 1)
      currentStep++
    }, 1000)
  }

  const initializeSimulation = useCallback(() => {
    setPumps(
      Array.from({ length: numPumps }, (_, index) => ({
        id: index + 1,
        status: 'libre',
        occupiedTime: 0,
        idleTime: 0,
      }))
    )
    clearInterval(simulationInterval.current)
    setSimulationTime(0)
    setIsSimulating(false)

    // Reiniciar estadísticas de utilización
    setStats((prev) => ({
      ...prev,
      pumpUtilization: Object.fromEntries(
        Array.from({ length: numPumps }, (_, i) => [i + 1, 0])
      ),
    }))
  }, [numPumps])

  return {
    stats,
    simulationTime,
    pumps,
    runSimulation,
    initializeSimulation,
    numPumps,
    isSimulating,
  }
}
