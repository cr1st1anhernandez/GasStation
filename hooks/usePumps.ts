import { useCallback } from 'react'

import { usePumps } from '@/providers/pumpsContext'

type PumpAverage = {
  pumpNumber: number
  averageServiceTime: number
}

export const usePumpsService = () => {
  const { setPumpsAverage } = usePumps() // Accede a la función setPumpsAverage desde el contexto

  const savePumpAverages = useCallback(
    (pumpAverages: PumpAverage[]) => {
      setPumpsAverage(pumpAverages)
    },
    [setPumpsAverage] // Asegúrate de que la función de actualizar el estado se pase correctamente
  )

  return { savePumpAverages }
}
