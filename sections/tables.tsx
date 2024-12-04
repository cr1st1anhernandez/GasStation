import { BlockMath } from 'react-katex'

import { frequencyColumns } from '@/components/constants'
import PaginationTable from '@/components/paginationTable'
import { generateFrequencyDistribution } from '@/data/functions'
import { useTimeData } from '@/hooks/useTimeData'

export default function Tables() {
  const {
    timeBetweenArrivals,
    minBetweenArrivals,
    maxBetweenArrivals,
    timeService,
    minService,
    maxService,
  } = useTimeData()

  return (
    <section className="flex gap-4">
      <div className="flex w-full flex-col gap-4">
        <header>
          <h2 className="text-2xl font-semibold">Tiempo Entre Llegadas</h2>
          <p className="text-balance opacity-80">
            La tabla muestra las frecuencias observadas de los tiempos entre la
            llegada de los automóviles a la estación de servicio, clasificadas
            en intervalos específicos. Estos datos son fundamentales para
            analizar el comportamiento del flujo de clientes.
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
                  <code className="font-bold">FO</code>: Frecuencia observada
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
        <PaginationTable
          columns={frequencyColumns}
          data={generateFrequencyDistribution(
            timeBetweenArrivals ?? 0,
            minBetweenArrivals ?? 0,
            maxBetweenArrivals ?? 0,
            timeBetweenArrivals.length
          )}
          rows={5}
        />
      </div>

      <div className="flex w-full flex-col gap-4">
        <header>
          <h2 className="text-2xl font-semibold">Tiempo de Servicio</h2>
          <p className="text-balance opacity-80">
            La tabla presenta las frecuencias observadas de los tiempos de
            servicio de los automóviles en la estación, clasificados en
            intervalos. Estos datos permiten analizar la duración promedio de
            atención para optimizar los recursos.
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
                  <code className="font-bold">FO</code>: Frecuencia observada
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
        <PaginationTable
          columns={frequencyColumns}
          data={generateFrequencyDistribution(
            timeService ?? 0,
            minService ?? 0,
            maxService ?? 0,
            timeService.length
          )}
          rows={5}
        />
      </div>
    </section>
  )
}
