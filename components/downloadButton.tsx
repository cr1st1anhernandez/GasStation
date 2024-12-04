import { Button } from '@nextui-org/button'
import { DownloadIcon } from 'lucide-react'

import { useDownloadReport } from '@/hooks/useDownloadResults'

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

interface DownloadButtonProps {
  stats: SimulationStats
  pumps: PumpState[]
  simulationTime: number
  isSimulationFinished: boolean
}

const DownloadButton = ({
  stats,
  pumps,
  simulationTime,
  isSimulationFinished,
}: DownloadButtonProps) => {
  const { downloadReport } = useDownloadReport()
  const handleDownload = () => {
    // Calculate pump averages based on occupied time
    const pumpAverages = pumps.map((pump, index) => ({
      index,
      averageTime: pump.occupiedTime,
    }))

    // Calculate average service time from stats
    const avgServiceTime = stats.distributionParams.serviceTimeParams.mu

    // Generate suggestions based on statistics
    const suggestions = []

    if (stats.averageWaitTime > 5) {
      suggestions.push(
        'Los tiempos de espera son altos, considere aumentar el número de bombas'
      )
    }

    const utilizationRate =
      (pumps.filter((p) => p.status === 'libre').length / pumps.length) * 100

    if (utilizationRate > 80) {
      suggestions.push(
        'La tasa de utilización es muy alta, considere agregar más bombas'
      )
    } else if (utilizationRate < 30) {
      suggestions.push(
        'La tasa de utilización es baja, podría reducir el número de bombas'
      )
    }

    // Add payment method suggestion if credit card usage is high
    const creditCardUsage =
      stats.empiricalDistributions.paymentTypes['Tarjeta'] || 0

    if (creditCardUsage > 0.7) {
      suggestions.push(
        'Alto uso de tarjetas, considere implementar más lectores de tarjetas'
      )
    }

    downloadReport(
      isSimulationFinished ? 'completed' : 'not-started',
      suggestions,
      pumps.length,
      pumpAverages,
      avgServiceTime
    )
  }

  return isSimulationFinished ? (
    <button
      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-teal-500 active:scale-95"
      style={{
        boxShadow: '0px 4px 8px rgba(13, 148, 136, 0.6)',
      }}
      onClick={handleDownload}
    >
      <DownloadIcon />
      Descargar Informe
    </button>
  ) : (
    <Button isDisabled color="primary">
      Descargar Informe
      <DownloadIcon />
    </Button>
  )
}

export default DownloadButton
