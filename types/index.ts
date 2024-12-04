import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type FrequencyDistribution = {
  interval: string
  range: string
  frequency: number
}

interface PumpStats {
  usage: number
  serviceTimes: number
  clientCount: number
}

interface PumpAverage {
  index: number
  averageTime: number
  usage: number
}

export type SimulationStatus =
  | 'simulating'
  | 'completed'
  | 'failed'
  | 'not-started'

export type Data = {
  NumeroCliente: number
  TipoAutomovil: string
  NumeroBomba: number
  HoraLlegada: string
  HoraSalida: string
  DuracionServicio: number
  TiempoEntreLlegadas: number
  TipoPago: string
  TipoProducto: string
}

export type SimulationResult = {
  NumeroCliente?: number
  TipoAutomovil?: string
  DuracionServicio?: number
  BombaAsignada?: number
  Mensaje?: string
}
