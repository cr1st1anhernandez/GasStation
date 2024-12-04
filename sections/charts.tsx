import { BlockMath } from 'react-katex'

import { Chart } from '@/components/chart'
import { generateFrequencyDistribution } from '@/data/functions'
import { useTimeData } from '@/hooks/useTimeData'

export default function Charts() {
  const {
    timeBetweenArrivals,
    minBetweenArrivals,
    maxBetweenArrivals,
    timeService,
    minService,
    maxService,
  } = useTimeData()

  const example1 = generateFrequencyDistribution(
    timeBetweenArrivals ?? 0,
    minBetweenArrivals ?? 0,
    maxBetweenArrivals ?? 0,
    timeBetweenArrivals.length
  )

  const example2 = generateFrequencyDistribution(
    timeService ?? 0,
    minService ?? 0,
    maxService ?? 0,
    timeService.length
  )

  return (
    <section className="flex gap-4">
      <div className="flex w-full flex-col gap-4">
        <header>
          <h2 className="text-2xl font-semibold">Tiempo Entre Llegadas</h2>
          <p className="text-balance opacity-80">
            La gráfica muestra la distribución de los tiempos entre la llegada
            de los automóviles a la estación de servicio, clasificados en
            intervalos específicos. Este análisis permite identificar patrones
            de flujo y optimizar la asignación de recursos.
          </p>
          <div className="flex justify-between items-center">
            <BlockMath math={'AC = \\frac{R}{1 + 3.322 \\log(n)}'} />
            <div>
              <strong>Donde:</strong>
              <ul>
                <li>
                  <code className="font-bold">AC</code>: Amplitud de clase
                </li>
                <li>
                  <code className="font-bold">R</code>: Rango (máximo - mínimo)
                </li>
                <li>
                  <code className="font-bold">n</code>: Número total de datos
                </li>
              </ul>
            </div>
          </div>
        </header>
        <Chart
          XAxisKey="interval"
          XAxisName="Tiempo Promedio"
          YAxisKey="frequency"
          YAxisName="Automóviles"
          color="#0d9488"
          data={example1}
          rows={15}
        />
        <p className="opacity-80">
          Ejemplo: La primera barra de la gráfica representa que{' '}
          {example1[0]?.frequency} automóviles estuvieron dentro del rango de
          tiempo entre {example1[0]?.range} segundos.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <header>
          <h2 className="text-2xl font-semibold">Tiempo de Servicio</h2>
          <p className="text-balance opacity-80">
            La gráfica presenta la distribución de los tiempos de servicio de
            los automóviles en la estación, agrupados en intervalos. Este
            análisis es esencial para evaluar la eficiencia en la atención al
            cliente y proponer mejoras en los procesos.
          </p>
          <div className="flex justify-between items-center">
            <BlockMath math={'AC = \\frac{R}{1 + 3.322 \\log(n)}'} />
            <div>
              <strong>Donde:</strong>
              <ul>
                <li>
                  <code className="font-bold">AC</code>: Amplitud de clase
                </li>
                <li>
                  <code className="font-bold">R</code>: Rango (máximo - mínimo)
                </li>
                <li>
                  <code className="font-bold">n</code>: Número total de datos
                </li>
              </ul>
            </div>
          </div>
        </header>
        <Chart
          XAxisKey="interval"
          XAxisName="Tiempo Promedio"
          YAxisKey="frequency"
          YAxisName="Automóviles"
          color="#0d9488"
          data={example2}
          rows={15}
        />
        <p className="opacity-80">
          Ejemplo: La primera barra de la gráfica representa que{' '}
          {example2[0]?.frequency} automóviles tuvieron un tiempo de servicio
          entre {example2[0]?.range} segundos.
        </p>
      </div>
    </section>
  )
}
