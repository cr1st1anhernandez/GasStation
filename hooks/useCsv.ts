import Papa from 'papaparse'
import { toast } from 'sonner'

import { csvColumns } from '@/components/constants'
import { useData } from '@/providers/dataContext'
import { Data } from '@/types'
import { parseTime } from '@/utils/format'

export const useCsv = () => {
  const { setData, setNumPumps } = useData()

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
        complete: (result) => {
          const missingColumns = csvColumns.filter(
            (col) => !Object.keys(result.data[0] || {}).includes(col)
          )

          if (missingColumns.length > 0) {
            toast.error('Formato de CSV incorrecto.')
            setData([])
            setNumPumps(0)

            return
          }

          const parsedData = parseData(result.data)
          const maxPumps = Math.max(
            ...parsedData
              .map((item) => item.NumeroBomba)
              .filter((num) => !isNaN(num)),
            0
          )

          console.log(maxPumps)
          setNumPumps(maxPumps)
          setData(parsedData)
        },
        error: (error) => {
          toast.error(`Error al parsear CSV: ${error}`)
          setData([])
          setNumPumps(0)
        },
      })
    }
  }

  return {
    handleFile,
  }
}
