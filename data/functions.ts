import { FrequencyDistribution } from '../types'
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
      interval: `${currentUpperBound.toFixed(2)}`,
      range: `${currentLowerBound.toFixed(2)} - ${currentUpperBound.toFixed(2)}`,
      frequency: frequencyCount,
    })

    currentLowerBound = currentUpperBound
  }

  return distribution
}
