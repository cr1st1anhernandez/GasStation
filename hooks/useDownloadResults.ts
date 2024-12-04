import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useCallback } from 'react'

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

type SimulationStatus = 'simulating' | 'completed' | 'failed' | 'not-started'
type PumpAverage = {
  index: number
  averageTime: number
}

export const useDownloadReport = () => {
  const downloadReport = useCallback(
    (
      status: SimulationStatus,
      suggestions: string[],
      numPumps: number,
      pumpAverages: PumpAverage[],
      avgServiceTime: number
    ) => {
      // Crear nuevo documento PDF
      const doc = new jsPDF()

      // Configuración de estilos
      const titleFontSize = 20
      const subtitleFontSize = 16
      const regularFontSize = 12
      const lineHeight = 10
      let yPosition = 20

      // Título principal
      doc.setFontSize(titleFontSize)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(13, 148, 136)

      doc.text('Informe de la Simulación', 105, yPosition, { align: 'center' })
      yPosition += lineHeight * 2

      doc.setFontSize(regularFontSize)
      doc.setTextColor(status === 'completed' ? 0 : 255, 0, 0)
      doc.text(
        status === 'completed'
          ? 'Simulación completada con éxito'
          : 'La simulación no se completó correctamente',
        20,
        yPosition
      )
      yPosition += lineHeight * 2

      // Resumen de Parámetros
      doc.setFontSize(subtitleFontSize)
      doc.setTextColor(13, 148, 136)
      doc.text('Resumen de Parámetros', 20, yPosition)
      yPosition += lineHeight

      // Tabla de parámetros
      const parametersBody = [
        ['Número de bombas', numPumps.toString()],
        ['Tiempo promedio de servicio', `${avgServiceTime.toFixed(2)} minutos`],
      ]

      doc.autoTable({
        startY: yPosition,
        head: [['Parámetro', 'Valor']],
        body: parametersBody,
        theme: 'striped',
        headStyles: { fillColor: [13, 148, 136] },
        margin: { left: 20 },
      })

      yPosition = (doc as any).lastAutoTable.finalY + lineHeight * 2

      // Análisis de Bombas
      doc.setFontSize(subtitleFontSize)
      doc.text('Análisis por Bomba', 20, yPosition)
      yPosition += lineHeight

      const pumpData = pumpAverages.map((pump) => [
        `Bomba ${pump.index + 1}`,
        `${pump.averageTime.toFixed(2)} min`,
      ])

      doc.autoTable({
        startY: yPosition,
        head: [['Bomba', 'Tiempo Promedio']],
        body: pumpData,
        theme: 'striped',
        headStyles: { fillColor: [13, 148, 136] },
        margin: { left: 20 },
      })

      yPosition = (doc as any).lastAutoTable.finalY + lineHeight * 2

      // Sugerencias de Mejora
      doc.setFontSize(subtitleFontSize)
      doc.text('Sugerencias de Mejora', 20, yPosition)
      yPosition += lineHeight

      const removeEmoji = (text: string): string => {
        // Esta expresión regular coincide con emojis y otros símbolos pictográficos
        const emojiRegex =
          /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu

        // Elimina el emoji y cualquier espacio en blanco extra al inicio
        return text.replace(emojiRegex, '').trim()
      }
      const removeSpecificEmojis = (text: string): string => {
        const emojiMap: { [key: string]: string } = {
          '🚨': '',
          '🐢': '',
          '😟': '',
          '⏳': '',
          '⏱️': '',
          '🎉': '',
          '⚖️': '',
        }

        // Crear una expresión regular con todos los emojis usando el mapeo
        const emojiPattern = new RegExp(
          `(${Object.keys(emojiMap).join('|')})\\s*`,
          'g'
        )

        // Reemplazar los emojis y eliminar espacios extra al inicio
        return text.replace(emojiPattern, '').trim()
      }

      doc.setFontSize(regularFontSize)
      doc.setTextColor(0, 0, 0)
      suggestions.forEach((suggestion) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 20
        }

        const cleanSuggestion = removeSpecificEmojis(removeEmoji(suggestion)) // Limpia el texto
        const lines = doc.splitTextToSize(cleanSuggestion, 150)

        console.log(lines)

        doc.text(lines, 20, yPosition)
        yPosition += lineHeight * (lines.length + 0.5)
      })

      const pageCount = doc.getNumberOfPages()

      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
        doc.text(
          `Página ${i} de ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        )
        doc.text(
          `Generado el ${new Date().toLocaleDateString()}`,
          20,
          doc.internal.pageSize.height - 10
        )
      }

      // Guardar el PDF
      doc.save('informe_simulacion.pdf')
    },
    []
  )

  return { downloadReport }
}
