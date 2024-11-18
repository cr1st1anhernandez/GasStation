import { useCallback, useMemo, useState } from 'react'

import { useData } from '@/providers/dataContext'
import { SimulationResult, SimulationStatus } from '@/types'

interface PumpStats {
  usage: number
  serviceTimes: number
  clientCount: number
}

export const useSimulation = () => {
  const [status, setStatus] = useState<SimulationStatus>('not-started')
  const [messages, setMessages] = useState<string[]>([])
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
  const [simulationResults, setSimulationResults] = useState<
    SimulationResult[]
  >([])
  const { data } = useData()

  const numPumps = useMemo(() => {
    const pumps = data
      .map((item) => item.NumeroBomba)
      .filter((num) => !isNaN(num))

    return Math.max(...pumps) || 0
  }, [data])

  const simulate = useCallback(async () => {
    if (data.length === 0) {
      setMessages(['No hay datos disponibles para procesar la simulación.'])

      return
    }
    setStatus('simulating')

    const pumps = Array(numPumps).fill(null)
    const pumpStats: PumpStats[] = Array(numPumps)
      .fill(null)
      .map(() => ({
        usage: 0,
        serviceTimes: 0,
        clientCount: 0,
      }))

    const results: string[] = []
    const simulationData: SimulationResult[] = []
    let totalBlockedTime = 0

    for (const client of data) {
      const availablePumpIndex = pumps.findIndex((p) => p === null)

      if (availablePumpIndex !== -1) {
        const serviceTime = client.DuracionServicio || 0

        pumpStats[availablePumpIndex].usage++
        pumpStats[availablePumpIndex].serviceTimes += serviceTime
        pumpStats[availablePumpIndex].clientCount++

        const message = `El cliente ${client.NumeroCliente} con vehiculo ${client.TipoAutomovil} esta siendo atendido en la bomba ${
          availablePumpIndex + 1
        } (Tiempo de servicio: ${serviceTime.toFixed(2)} min).`

        await new Promise((resolve) => setTimeout(resolve, 1))

        results.push(message)
        setMessages([...results])
        simulationData.push({
          NumeroCliente: client.NumeroCliente,
          TipoAutomovil: client.TipoAutomovil,
          DuracionServicio: serviceTime,
          BombaAsignada: availablePumpIndex + 1,
          Mensaje: message,
        })
      } else {
        totalBlockedTime++
        const message = `El cliente ${client.NumeroCliente} con vehiculo ${client.TipoAutomovil} esta esperando (Todas las bombas ocupadas).`

        results.push(message)
        simulationData.push({
          NumeroCliente: client.NumeroCliente,
          TipoAutomovil: client.TipoAutomovil,
          DuracionServicio: client.DuracionServicio,
          BombaAsignada: undefined,
          Mensaje: message,
        })
      }
    }

    const pumpAverages = pumpStats.map((stat, index) => ({
      index,
      averageTime:
        stat.clientCount > 0 ? stat.serviceTimes / stat.clientCount : 0,
      usage: stat.usage,
    }))

    const suggestions: string[] = []

    const maxUsagePump = pumpAverages.reduce((max, curr) =>
      curr.usage > max.usage ? curr : max
    )
    const minUsagePump = pumpAverages.reduce((min, curr) =>
      curr.usage < min.usage ? curr : min
    )

    const slowestPump = pumpAverages.reduce((max, curr) =>
      curr.averageTime > max.averageTime && curr.usage > 0 ? curr : max
    )

    const avgServiceTime =
      pumpAverages.reduce((sum, curr) => sum + curr.averageTime, 0) /
      pumpAverages.length

    const usageDifference = maxUsagePump.usage / (minUsagePump.usage || 1)

    const isBalanced = usageDifference <= 1.5

    const isEfficient = avgServiceTime <= 3 && totalBlockedTime <= 3

    if (usageDifference > 2) {
      suggestions.push(
        `🚨 La bomba ${maxUsagePump.index + 1} está siendo utilizada mucho más que las demás. Considera distribuir los vehículos hacia la bomba ${minUsagePump.index + 1}, que tiene menos uso.`
      )
    }

    if (slowestPump.averageTime > 4) {
      suggestions.push(
        `🐢 La bomba ${slowestPump.index + 1} tiene un tiempo promedio de servicio elevado (${slowestPump.averageTime.toFixed(2)} min). Considera revisar su eficiencia o mantenimiento.`
      )
    }

    if (totalBlockedTime > 5) {
      suggestions.push(
        '😟 Hubo demasiados clientes esperando. Considera añadir más bombas para reducir los tiempos de espera.'
      )
    } else if (totalBlockedTime > 3) {
      suggestions.push(
        '⏳ Se están generando algunas colas de espera. Considera optimizar la distribución de vehículos entre las bombas disponibles.'
      )
    }

    if (avgServiceTime > 3.5) {
      suggestions.push(
        '⏱️ El tiempo promedio de servicio general está por encima de lo óptimo. Considera implementar medidas para agilizar el proceso de atención.'
      )
    }

    if (suggestions.length === 0 || (isBalanced && isEfficient)) {
      suggestions.push(
        '🎉 ¡Felicitaciones! La gasolinera está operando de manera óptima. La distribución de vehículos y los tiempos de servicio están dentro de los rangos ideales.'
      )
    }

    if (isBalanced && !suggestions.some((s) => s.includes('tiempo'))) {
      suggestions.push(
        '⚖️ La distribución de vehículos entre las bombas está bien balanceada, manteniendo una operación eficiente.'
      )
    }
    setMessages(results)
    setCurrentSuggestions(suggestions)
    setSimulationResults(simulationData)
    setStatus('completed')
  }, [data, numPumps])

  const startSimulation = useCallback(async () => {
    setMessages([])
    setCurrentSuggestions([])
    setSimulationResults([])
    await simulate()
  }, [simulate])

  return {
    status,
    messages,
    currentSuggestions,
    simulationResults,
    startSimulation,
  }
}
