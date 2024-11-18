import Papa from 'papaparse'
import { toast } from 'sonner'

import { csvColumns } from '@/components/constants'
import { useData } from '@/providers/dataContext'
import { Data } from '@/types'

export const useCsv = () => {
  const { setData } = useData()

  const parseTime = (timeString?: string): Date => {
    if (!timeString) {
      return new Date(0)
    }
    const [hours, minutes] = timeString.split(':').map(Number)
    const date = new Date()

    date.setHours(hours, minutes, 0, 0)

    return date
  }

  const parseData = (rawData: any[]): Data[] => {
    return rawData
      .map((item) => ({
        NumeroCliente: parseInt(item.NumeroCliente) || 0,
        TipoAutomovil: item.TipoAutomovil,
        NumeroBomba: parseInt(item.NumeroBomba) || 0,
        HoraLlegada: parseTime(item.HoraLlegada),
        HoraSalida: parseTime(item.HoraSalida),
        DuracionServicio: parseFloat(item.DuracionServicio) || 0,
        TiempoEntreLlegadas: parseFloat(item.TiempoEntreLlegadas) || 0,
        TipoPago: item.TipoPago,
        TipoProducto: item.TipoProducto,
      }))
      .filter((item) => !isNaN(item.NumeroCliente))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          const missingColumns = csvColumns.filter(
            (col) => !Object.keys(result.data[0] || {}).includes(col)
          )

          if (missingColumns.length > 0) {
            toast.error('Formato de CSV incorrecto.')
            setData([])

            return
          }

          const parsedData = parseData(result.data)

          setData(parsedData)
          console.log(parsedData)
        },
        error: (error) => {
          toast.error(`Error al parsear CSV: ${error}`)
          setData([])
        },
      })
    }
  }

  return {
    handleFile,
  }
}
