import { useCallback, useMemo, useState } from 'react'

import { useData } from '@/providers/dataContext'
import { usePumps } from '@/providers/pumpsContext'
import { SimulationResult, SimulationStatus } from '@/types'

interface PumpStats {
  usage: number
  serviceTimes: number
  clientCount: number
}

interface PumpAverage {
  index: number
  averageTime: number
  usage: number
}

export const useSimulation = () => {
  const [status, setStatus] = useState<SimulationStatus>('not-started')
  const [messages, setMessages] = useState<string[]>([])
  const { setPumpsOptimized } = usePumps()
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([])
  const [simulationResults, setSimulationResults] = useState<
    SimulationResult[]
  >([])
  const [pumpAverages, setPumpAverages] = useState<PumpAverage[]>([])
  const [totalBlockedTime, setTotalBlockedTime] = useState<number>(0)
  const [avgServiceTime, setAvgServiceTime] = useState<number>(0)
  const { data } = useData()
  const { setPumpsAverage } = usePumps()

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
    let blockedTime = 0

    for (const client of data) {
      const pumpIndex = client.NumeroBomba - 1

      if (pumps[pumpIndex] === null) {
        const serviceTime = client.DuracionServicio || 0

        pumpStats[pumpIndex].usage++
        pumpStats[pumpIndex].serviceTimes += serviceTime
        pumpStats[pumpIndex].clientCount++

        const message = `El cliente ${client.NumeroCliente} con vehiculo ${client.TipoAutomovil} esta siendo atendido en la bomba ${client.NumeroBomba} (Tiempo de servicio: ${serviceTime.toFixed(2)} min).`

        await new Promise((resolve) => setTimeout(resolve, 1))

        results.push(message)
        setMessages([...results])
        simulationData.push({
          NumeroCliente: client.NumeroCliente,
          TipoAutomovil: client.TipoAutomovil,
          DuracionServicio: serviceTime,
          BombaAsignada: client.NumeroBomba,
          Mensaje: message,
        })
      } else {
        blockedTime++
        const message = `El cliente ${client.NumeroCliente} con vehiculo ${client.TipoAutomovil} esta esperando (Bomba ${client.NumeroBomba} ocupada).`

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

    const calculatedPumpAverages = pumpStats.map((stat, index) => ({
      index,
      averageTime:
        stat.clientCount > 0 ? stat.serviceTimes / stat.clientCount : 0,
      usage: stat.usage,
    }))

    const calculatedAvgServiceTime =
      calculatedPumpAverages.reduce((sum, curr) => sum + curr.averageTime, 0) /
      calculatedPumpAverages.length

    // Convertir los promedios al formato esperado por el contexto
    const pumpsContextData = calculatedPumpAverages.map((pump) => ({
      pumpNumber: pump.index + 1, // Convertimos el índice a número de bomba
      averageServiceTime: pump.averageTime,
    }))

    // Guardar en el contexto de bombas
    setPumpsAverage(pumpsContextData)

    const totalUsage = calculatedPumpAverages.reduce(
      (sum, pump) => sum + pump.usage,
      0
    )
    const idealUsagePerPump = totalUsage / numPumps

    // Calcular distribución optimizada
    const optimizedPumps = calculatedPumpAverages.map((pump) => {
      const currentEfficiency = pump.usage / idealUsagePerPump
      const recommendedUsage = idealUsagePerPump
      const potentialImprovement = (
        ((recommendedUsage - pump.usage) / pump.usage) *
        100
      ).toFixed(1)

      return {
        pumpNumber: pump.index + 1,
        currentUsage: pump.usage,
        recommendedUsage: Math.round(recommendedUsage),
        averageServiceTime: pump.averageTime,
        efficiency: currentEfficiency,
        potentialImprovement: parseFloat(potentialImprovement),
      }
    })

    // Guardar datos optimizados
    setPumpsOptimized(optimizedPumps)

    const suggestions: string[] = []

    const maxUsagePump = calculatedPumpAverages.reduce((max, curr) =>
      curr.usage > max.usage ? curr : max
    )
    const minUsagePump = calculatedPumpAverages.reduce((min, curr) =>
      curr.usage < min.usage ? curr : min
    )

    const slowestPump = calculatedPumpAverages.reduce((max, curr) =>
      curr.averageTime > max.averageTime && curr.usage > 0 ? curr : max
    )

    const usageDifference = maxUsagePump.usage / (minUsagePump.usage || 1)

    const isBalanced = usageDifference <= 1.5

    const isEfficient = calculatedAvgServiceTime <= 3 && blockedTime <= 3

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

    if (blockedTime > 5) {
      suggestions.push(
        '😟 Hubo demasiados clientes esperando. Considera añadir más bombas para reducir los tiempos de espera.'
      )
    } else if (blockedTime > 3) {
      suggestions.push(
        '⏳ Se están generando algunas colas de espera. Considera optimizar la distribución de vehículos entre las bombas disponibles.'
      )
    }

    if (calculatedAvgServiceTime > 3.5) {
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
    setPumpAverages(calculatedPumpAverages)
    setTotalBlockedTime(blockedTime)
    setAvgServiceTime(calculatedAvgServiceTime)
    setStatus('completed')
  }, [data, numPumps])

  const startSimulation = useCallback(async () => {
    setMessages([])
    setCurrentSuggestions([])
    setSimulationResults([])
    setPumpAverages([])
    setTotalBlockedTime(0)
    setAvgServiceTime(0)
    await simulate()
  }, [simulate])

  return {
    status,
    messages,
    currentSuggestions,
    simulationResults,
    startSimulation,
    // Nuevos valores retornados
    numPumps,
    pumpAverages,
    totalBlockedTime,
    avgServiceTime,
  }
}
