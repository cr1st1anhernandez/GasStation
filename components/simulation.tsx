import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Progress } from '@nextui-org/progress'
import Lottie from 'lottie-react'
import { useEffect } from 'react'

import {
  AlertIcon,
  CheckmarkIcon,
  DownloadIcon,
  ErrorIcon,
} from '@/components/icons'
import { useDownloadReport } from '@/hooks/useDownloadResults'
import { useSimulation } from '@/hooks/useSimulation'
import { useData } from '@/providers/dataContext'
import animationData from '@/public/animation.json'

export default function Simulation() {
  const { data } = useData()
  const {
    status,
    messages,
    currentSuggestions,
    startSimulation,
    numPumps,
    pumpAverages,
    avgServiceTime,
  } = useSimulation()

  const { downloadReport } = useDownloadReport()

  useEffect(() => {
    const runSimulation = async () => {
      await startSimulation()
    }

    runSimulation()
  }, [data])

  return (
    <Card className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <CardHeader>
        <h2 className="text-2xl font-semibold">Simulación</h2>
      </CardHeader>
      <CardBody>
        {status === 'simulating' && (
          <div className="flex flex-col justify-between h-full">
            <div className="flex-1">
              <ul>
                {messages.slice(-2).map((msg: string, index: number) => (
                  <li key={index} className="text-sm text-[#0d9488]">
                    {msg}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center flex-col mb-4">
              <Lottie animationData={animationData} />
              <Progress
                isIndeterminate
                aria-label="Simulando..."
                color="primary"
                label="Simulando..."
                radius="sm"
                showValueLabel={true}
                size="sm"
              />
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div>
            <p className="flex flex-col text-lg items-center">
              Simulación completada.
              <CheckmarkIcon />
            </p>
            <strong>Sugerencias:</strong>
            <ul className="list-disc list-inside">
              {currentSuggestions.map((suggestion: string, index: number) => (
                <li key={index} className="text-sm ">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {status === 'failed' && (
          <div className="h-full grid place-items-center">
            <p className="text-lg items-center flex flex-col text-rose-600">
              La simulación ha fallado.
              <ErrorIcon />
            </p>
          </div>
        )}

        {status === 'not-started' && (
          <div className="h-full grid place-items-center">
            <p className="text-md text-center opacity-70 flex flex-col items-center gap-2">
              Importa el archivo csv para comenzar la simulación.
              <AlertIcon height={40} width={40} />
            </p>
          </div>
        )}
      </CardBody>
      {status === 'completed' && (
        <CardFooter className="flex justify-end">
          <button
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-teal-500 active:scale-95"
            style={{
              boxShadow: '0px 4px 15px rgba(13, 148, 136, 0.6)',
            }}
            onClick={() =>
              downloadReport(
                status,
                currentSuggestions,
                numPumps,
                pumpAverages,
                avgServiceTime
              )
            }
          >
            <DownloadIcon />
            Descargar Informe
          </button>
        </CardFooter>
      )}
    </Card>
  )
}
