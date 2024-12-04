import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { InfoIcon } from 'lucide-react'

import CSVButton from '@/components/csvButton'
import { DownloadIcon } from '@/components/icons'

export default function About() {
  return (
    <Card className="p-4" shadow="sm">
      <CardHeader className="flex-col items-start">
        <div className="flex w-full justify-between">
          <span className="text-teal-600 font-bold">Información</span>
          <div className="flex gap-2 items-center opacity-60">
            <InfoIcon />
            <p>Todo es manejado en segundos para mayor precisión.</p>
          </div>
        </div>
        <h2 className="text-3xl font-bold">Algoritmo de Optimización</h2>
      </CardHeader>
      <CardBody>
        <p className="text-balance opacity-80">
          Este sitio utiliza simulación avanzada para optimizar los procesos
          operativos en gasolineras. Mediante el análisis de datos estadísticos,
          modelado matemático y simulación en software especializado, evaluamos
          y mejoramos la eficiencia del flujo de clientes y recursos en tiempo
          real.
        </p>
        <h3 className="text-lg font-semibold">
          El sistema funciona analizando datos clave como:
        </h3>
        <ul className="list-disc list-inside opacity-80">
          <li>Tiempo entre llegadas de clientes.</li>
          <li>Tiempo de servicio</li>
          <li>Distribuciones empíricas</li>
        </ul>
        <p className="opacity-80">
          Con estos cálculos, el sistema modela el flujo desde la llegada del
          cliente, la asignación de bombas, el servicio y el pago, hasta la
          salida del sistema. Esto permite identificar cuellos de botella,
          tiempos muertos y oportunidades de mejora, proponiendo estrategias
          para reducir costos operativos y ofrecer una experiencia eficiente y
          de alta calidad.
        </p>
        <p className="opacity-80">
          Puede descargar el siguiente{' '}
          <Link
            download
            anchorIcon={<DownloadIcon />}
            href="/registro_gasolina.csv"
          >
            Archivo CSV
          </Link>{' '}
          de ejemplo y editar los valores a su conveniencia para probar el
          sistema.
        </p>
      </CardBody>
      <CardFooter className="flex justify-end">
        <CSVButton />
      </CardFooter>
    </Card>
  )
}
