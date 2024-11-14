import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}
export type FrequencyDistribution = {
  interval: string
  range: string
  frequency: number
}

export type Data = {
  NumeroCliente: string
  TipoAutomovil: string
  NumeroBomba: string
  HoraLlegada: string
  HoraSalida: string
  DuracionServicio: string
  TiempoEntreLlegadas: string
  TipoPago: string
  TipoProducto: string
}
