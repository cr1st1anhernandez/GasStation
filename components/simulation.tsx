import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'

import { CancelIcon } from '@/components/icons'
import animationData from '@/public/animation.json'

class GasStation {
  private numPumps: number
  private availablePumps: number
  private arrivalTime: number
  private serviceTime: number
  private setMessage: React.Dispatch<React.SetStateAction<string>>

  constructor(
    numPumps: number,
    arrivalTime: number,
    serviceTime: number,
    setMessage: React.Dispatch<React.SetStateAction<string>>
  ) {
    this.numPumps = numPumps
    this.availablePumps = numPumps
    this.arrivalTime = arrivalTime
    this.serviceTime = serviceTime
    this.setMessage = setMessage
  }

  private generateCarArrival() {
    return Math.random() * this.arrivalTime
  }

  private generateServiceTime() {
    return Math.random() * this.serviceTime
  }

  private async serveCar() {
    const arrival = this.generateCarArrival()

    await this.sleep(arrival)
    this.setMessage(
      `Auto llega a la gasolinera a los ${arrival.toFixed(2)} minutos`
    )

    if (this.availablePumps > 0) {
      this.availablePumps--
      const serviceTime = this.generateServiceTime()

      this.setMessage(
        `Auto está siendo atendido ${arrival.toFixed(2)} - ${(arrival + serviceTime).toFixed(2)} minutos`
      )

      await this.sleep(serviceTime)

      this.setMessage(
        `Auto se va de la gasolinera a los ${(arrival + serviceTime).toFixed(2)} minutos`
      )
      this.availablePumps++
    } else {
      this.setMessage(`No hay bombas disponibles, el auto espera...`)
      await this.serveCar()
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms * 1000))
  }

  public async runSimulation(simulationTime: number) {
    const endTime = Date.now() + simulationTime * 1000

    while (Date.now() < endTime) {
      await this.serveCar()
    }
  }
}

const GasStationSimulation: React.FC = () => {
  const [simulating, setSimulating] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleStartSimulation = async () => {
      setSimulating(true)
      setMessage('Simulación iniciada...')

      const numPumps = 4
      const arrivalTime = 5
      const serviceTime = 4
      const simulationTime = 100

      const gasStation = new GasStation(
        numPumps,
        arrivalTime,
        serviceTime,
        setMessage
      )

      await gasStation.runSimulation(simulationTime)

      setMessage('Simulación finalizada.')
      setSimulating(false)
    }

    handleStartSimulation()
    setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <Card className="flex max-w-xs fixed bottom-8 right-8 flex-col gap-2 justify-center items-center">
      <CardHeader>
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-semibold">Simulación</h2>
          <button onClick={() => setVisible(false)}>
            <CancelIcon />
          </button>
        </div>
      </CardHeader>
      <CardBody>
        {simulating && <Lottie animationData={animationData} />}
      </CardBody>
      <CardFooter>
        <p className="text-sm text-gray-700">{message}</p>
      </CardFooter>
    </Card>
  )
}

export default GasStationSimulation
