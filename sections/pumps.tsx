import { Chart } from '@/components/chart'
import { usePumps } from '@/providers/pumpsContext'

export function Pumps() {
  const { pumpsAverage } = usePumps()

  console.log(pumpsAverage)

  return 0 === 0 ? null : (
    <section className="flex gap-8">
      <div className="w-full">
        <h2 className="text-2xl font-semibold">Estado Actual</h2>
        <Chart
          XAxisKey="pumpNumber"
          XAxisName="Numero Bomba"
          YAxisKey="averageServiceTime"
          YAxisName="Tiempo de servicio"
          color="#f59e0b"
          data={pumpsAverage}
          rows={15}
        />
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-semibold">
          Después de las mejoras recomendadas
        </h2>
        <Chart
          XAxisKey="pumpNumber"
          XAxisName="Numero Bomba"
          YAxisKey="averageServiceTime"
          YAxisName="Tiempo de servicio"
          color="#0d9488"
          data={pumpsAverage}
          rows={15}
        />
      </div>
    </section>
  )
}
