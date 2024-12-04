import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Slider } from '@nextui-org/slider'
import { Spinner } from '@nextui-org/spinner'
import { Car, Clock, CreditCard, Fuel, PlayIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import DownloadButton from '@/components/downloadButton'
import { useSimulation } from '@/hooks/useSimulation'

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
export const SimulationDashboard = () => {
  const [steps, setSteps] = useState(10)

  useEffect(() => {
    initializeSimulation()
  }, [])

  // Using the simulation hook
  const {
    isSimulationFinished,
    simulationTime,
    stats,
    pumps,
    runSimulation,
    initializeSimulation,
    isSimulating,
  } = useSimulation()

  // Transform pump utilization data for the chart
  const pumpUtilizationData = Object.entries(stats.pumpUtilization)
    .filter(([_, utilization]) => utilization > 0)
    .map(([pump, utilization]) => ({
      pump: `Bomba ${pump}`,
      utilizacion: (utilization * 100).toFixed(1),
    }))

  // Calculate overall statistics
  const totalPumps = pumps.length
  const activePumps = pumps.filter((p) => p.status === 'libre').length
  const utilizationRate = (activePumps / totalPumps) * 100

  const handleStartSimulation = () => {
    initializeSimulation() // Limpia la simulación anterior
    runSimulation(steps)
  }

  return (
    <Card className="p-4" shadow="sm">
      <CardHeader className="flex justify-between items-start gap-4">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold">Simulacion de la gasolinera</h2>
          <p className="opacity-60">
            Esta simulacion se basa en un modelo de simulacion de una gasolinera
            usando metodos probabilisticos como lo son las distribuciones de
            probabilidad y la simulacion de eventos discretos
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col justify-between items-center gap-2">
            <Slider
              className="max-w-xl"
              defaultValue={10}
              label="Numero de pasos"
              maxValue={100}
              minValue={1}
              onChange={(value) => setSteps(value as number)}
            />
            <p className="opacity-60">
              <span className="font-bold">Paso = </span>
              Llegada de un cliente, Inicio de servicio, Fin de servicio
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-teal-500 active:scale-95"
              disabled={isSimulating}
              style={{
                boxShadow: '0px 4px 8px rgba(13, 148, 136, 0.6)',
              }}
              onClick={handleStartSimulation}
            >
              {isSimulating ? 'Simulando...' : 'Iniciar'}
              {isSimulating ? (
                <Spinner color="white" size="sm" />
              ) : (
                <PlayIcon height={12} width={12} />
              )}
            </button>
            <button
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-rose-500 active:scale-95"
              style={{
                boxShadow: '0px 4px 8px rgba(255, 99, 132, 0.6)',
              }}
              onClick={initializeSimulation}
            >
              Reiniciar
            </button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card shadow="sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-sm font-medium">Tiempo Simulacion</h2>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">
                {simulationTime.toFixed(2)}s
              </div>
            </CardBody>
          </Card>

          <Card shadow="sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-sm font-medium">Bombas Activas</h2>
              <Fuel className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">
                {activePumps}/{totalPumps}
              </div>
            </CardBody>
          </Card>

          <Card shadow="sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-sm font-medium">Espera promedio</h2>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">
                {stats.averageWaitTime.toFixed(2)}s
              </div>
            </CardBody>
          </Card>

          <Card shadow="sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h2 className="text-sm font-medium">Tasa de utilización</h2>
              <Car className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardBody>
              <div className="text-2xl font-bold">
                {utilizationRate.toFixed(1)}%
              </div>
            </CardBody>
          </Card>
        </div>

        <Card shadow="sm">
          <CardHeader>
            <h2>Estado de bomba</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pumps.map((pump) => (
                <div
                  key={pump.id}
                  className={`p-4 rounded-lg  dark:text-gray-900 border ${
                    pump.status === 'ocupada'
                      ? 'bg-gray-100 border-gray-600 dark:bg-gray-400'
                      : 'bg-green-50 border-teal-600 dark:bg-green-200'
                  }`}
                >
                  <div className="font-medium">Bomba {pump.id}</div>
                  <div className="text-sm text-gray-600">
                    Estado: {pump.status}
                  </div>
                  <div className="text-sm text-gray-600">
                    Ocupada: {pump.occupiedTime.toFixed(2)}s
                  </div>
                  <div className="text-sm text-gray-600">
                    Inactiva: {pump.idleTime.toFixed(2)}s
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card shadow="sm">
            <CardHeader>
              <h2>Utilización de bombas </h2>
            </CardHeader>
            <CardBody>
              {pumpUtilizationData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer height="100%" width="100%">
                    <BarChart data={pumpUtilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="pump" />
                      <YAxis unit="%" />
                      <Bar dataKey="utilizacion" fill="#0d9488" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No hay datos de utilización disponibles
                </div>
              )}
            </CardBody>
          </Card>

          <Card shadow="sm">
            <CardHeader>
              <h2>Distribución de pagos</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {Object.entries(stats.empiricalDistributions.paymentTypes).map(
                  ([type, probability]) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm font-medium">{type}</span>
                      </div>
                      <div className="text-sm">
                        {(probability * 100).toFixed(1)}%
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <DownloadButton
          isSimulationFinished={isSimulationFinished}
          pumps={pumps}
          simulationTime={simulationTime}
          stats={stats}
        />
      </CardFooter>
    </Card>
  )
}

export default SimulationDashboard
