import { FrequencyDistribution, SimulationResult } from '../types'
export function calculateClassWidth(
  maximum: number,
  minimun: number,
  sampleSize: number
): number {
  return (maximum - minimun) / (1 + 3.322 * Math.log10(sampleSize))
}

export function generateFrequencyDistribution(
  data: number[],
  min: number,
  max: number,
  sampleSize: number
): FrequencyDistribution[] {
  const distribution: FrequencyDistribution[] = []
  let currentLowerBound = min
  const classWidth = calculateClassWidth(max, min, sampleSize)

  while (currentLowerBound < max) {
    const currentUpperBound = currentLowerBound + classWidth
    const frequencyCount = data.filter(
      (value) => value >= currentLowerBound && value < currentUpperBound
    ).length

    distribution.push({
      interval: formatToDecimals(currentLowerBound, 2),
      range: `${currentLowerBound.toFixed(2)} - ${currentUpperBound.toFixed(2)}`,
      frequency: frequencyCount,
    })

    currentLowerBound = currentUpperBound
  }

  return distribution
}

function formatToDecimals(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals)

  return Math.round(num * factor) / factor
}

interface PumpAverage {
  pumpNumber: number
  averageServiceTime: number
}

export const calculatePumpAverages = (
  data: SimulationResult[]
): PumpAverage[] => {
  const pumpStats = new Map<number, { totalTime: number; count: number }>()

  data.forEach((result) => {
    if (result.BombaAsignada && result.DuracionServicio) {
      const currentStats = pumpStats.get(result.BombaAsignada) || {
        totalTime: 0,
        count: 0,
      }

      currentStats.totalTime += result.DuracionServicio
      currentStats.count += 1

      pumpStats.set(result.BombaAsignada, currentStats)
    }
  })

  const pumpAverages: PumpAverage[] = Array.from(pumpStats.entries()).map(
    ([pumpNumber, stats]) => ({
      pumpNumber,
      averageServiceTime:
        stats.count > 0
          ? Number((stats.totalTime / stats.count).toFixed(2))
          : 0,
    })
  )

  return pumpAverages.sort((a, b) => a.pumpNumber - b.pumpNumber)
}
