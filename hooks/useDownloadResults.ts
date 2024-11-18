import { useCallback } from 'react'

import { SimulationResult } from '@/types'

export const useDownloadResults = () => {
  const downloadResults = useCallback((results: SimulationResult[]) => {
    if (results.length === 0) return

    const headers = [
      'NumeroCliente',
      'TipoAutomovil',
      'DuracionServicio',
      'BombaAsignada',
      'Mensaje',
    ]

    const csvContent = [
      headers.join(','),
      ...results.map((result) =>
        headers
          .map((header) => result[header as keyof SimulationResult] || '')
          .join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', 'resultados_simulacion.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  return { downloadResults }
}
