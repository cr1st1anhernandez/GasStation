import { tv } from 'tailwind-variants'

export const title = tv({
  base: 'tracking-tight inline font-semibold',
  variants: {
    color: {
      violet: 'from-[#FF1CF7] to-[#b249f8]',
      yellow: 'from-[#FF705B] to-[#FFB457]',
      blue: 'from-[#5EA2EF] to-[#0072F5]',
      cyan: 'from-[#00b7fa] to-[#01cfea]',
      green: 'from-[#6FEE8D] to-[#17c964]',
      teal: 'from-[#0d9488] to-[#0f766e]',
      pink: 'from-[#FF72E1] to-[#F54C7A]',
      foreground: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]',
    },
    size: {
      sm: 'text-3xl lg:text-4xl',
      md: 'text-[2.3rem] lg:text-5xl leading-9',
      lg: 'text-4xl lg:text-6xl',
    },
    fullWidth: {
      true: 'w-full block',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  compoundVariants: [
    {
      color: [
        'violet',
        'yellow',
        'blue',
        'cyan',
        'teal',
        'green',
        'pink',
        'foreground',
      ],
      class: 'bg-clip-text text-transparent bg-gradient-to-b',
    },
  ],
})

export const subtitle = tv({
  base: 'w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full',
  variants: {
    fullWidth: {
      true: '!w-full',
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
})

export const dataColumns = [
  {
    key: 'NumeroCliente',
    label: 'CLIENTE',
  },
  {
    key: 'TipoAutomovil',
    label: 'AUTOMOVIL',
  },
  {
    key: 'NumeroBomba',
    label: 'BOMBA',
  },
  {
    key: 'HoraLlegada',
    label: 'LLEGADA',
  },
  {
    key: 'HoraSalida',
    label: 'SALIDA',
  },
  {
    key: 'DuracionServicio',
    label: 'DURACION SERVICIO',
  },
  {
    key: 'TiempoEntreLlegadas',
    label: 'TIEMPO ENTRE LLEGADAS',
  },
  {
    key: 'TipoPago',
    label: 'TIPO PAGO',
  },
  {
    key: 'TipoProducto',
    label: 'TIPO PRODUCTO',
  },
]

export const frequencyColumns = [
  {
    key: 'range',
    label: 'CLASES - INTERVALOS MINUTOS',
  },
  {
    key: 'frequency',
    label: 'FRECUENCIA OBSERVADA',
  },
]

export const IMPROVEMENT_SUGGESTIONS = [
  {
    id: 1,
    title: 'Redistribución del Uso de Bombas',
    description: `Si una bomba permanece consistentemente inactiva durante largos periodos, podría indicar una mala distribución en el flujo de clientes hacia las bombas.`,
    action: `Reorganizar la disposición física de las bombas para mejorar el acceso. Implementar señalización que indique bombas libres para redirigir a los clientes.`,
    impact: `Mejora del balance de utilización entre las bombas y optimización de los tiempos de espera.`,
  },
  {
    id: 2,
    title: 'Añadir Bombas Adicionales',
    description: `Si el tiempo promedio de espera por cliente excede un límite aceptable (e.g., >5 minutos) y la tasa de utilización de las bombas actuales es alta (>85%), entonces podría justificarse añadir bombas adicionales.`,
    action: `Ampliar la infraestructura y añadir más bombas para atender la demanda. Analizar el costo-beneficio de la inversión adicional.`,
    impact: `Reducción de los tiempos de espera y mejora en la experiencia del cliente.`,
  },
  {
    id: 3,
    title: 'Optimización de Tiempos de Servicio',
    description: `Si el tiempo promedio de servicio en las bombas es alto y afecta la capacidad de atención, podría ser necesario revisar la operación.`,
    action: `Revisar la capacitación de los empleados responsables de operar las bombas. Evaluar la implementación de tecnología automatizada para acelerar el proceso.`,
    impact: `Reducción del tiempo de servicio promedio por cliente y aumento de la capacidad.`,
  },
  {
    id: 4,
    title: 'Campañas para Aumentar el Flujo de Clientes',
    description: `Si las bombas no están siendo utilizadas a más del 75% de su capacidad, podría significar que el flujo de clientes es bajo.`,
    action: `Implementar campañas de promoción o descuentos para atraer más clientes durante horas de baja demanda. Establecer convenios con flotas comerciales para uso exclusivo de las bombas.`,
    impact: `Incremento en la utilización de la infraestructura y mayores ingresos.`,
  },
  {
    id: 5,
    title: 'Análisis de Horas Pico',
    description: `Si hay una acumulación recurrente de clientes en ciertas horas del día, esto podría indicar una necesidad de reestructurar las operaciones.`,
    action: `Implementar personal adicional durante las horas pico. Crear carriles o bombas exclusivas para clientes con necesidades rápidas, como solo llenar combustible.`,
    impact: `Reducción de las filas y mejor experiencia durante los periodos de alta demanda.`,
  },
  {
    id: 6,
    title: 'Reubicación o Reducción de Bombas',
    description: `Si consistentemente la utilización de todas las bombas es baja (<50%) a lo largo del día, podría indicar una sobredimensión del sistema.`,
    action: `Reubicar bombas a una ubicación con mayor demanda. Reducir el número de bombas para optimizar los costos operativos.`,
    impact: `Reducción de costos innecesarios y mejor asignación de recursos.`,
  },
  {
    id: 7,
    title: 'Adopción de Métodos Alternativos de Pago',
    description: `Si los datos muestran que parte del tiempo de servicio incluye retrasos en el pago, podría mejorar la eficiencia.`,
    action: `Instalar terminales de pago automatizado directamente en las bombas. Ofrecer opciones de pago móvil o vía apps.`,
    impact: `Reducción del tiempo total de atención por cliente.`,
  },
  {
    id: 8,
    title: 'Mantenimiento Preventivo de Bombas',
    description: `Si alguna bomba tiene tiempos de servicio anormalmente altos o períodos de inactividad, podría indicar problemas mecánicos o falta de mantenimiento.`,
    action: `Establecer un cronograma de mantenimiento preventivo regular. Realizar inspecciones técnicas para asegurar la funcionalidad continua de todas las bombas.`,
    impact: `Aumento de la fiabilidad de las bombas y mejora en la satisfacción del cliente.`,
  },
  {
    id: 9,
    title: 'Evaluación del Diseño de la Estación',
    description: `Si se detectan cuellos de botella recurrentes en la entrada o salida de la estación, el diseño podría estar causando demoras.`,
    action: `Modificar la disposición de los carriles de entrada y salida para mejorar el flujo. Añadir carriles adicionales en puntos críticos.`,
    impact: `Incremento en la eficiencia del flujo vehicular dentro de la estación.`,
  },
  {
    id: 10,
    title: 'Monitoreo en Tiempo Real del Flujo Vehicular',
    description: `Si el flujo vehicular y los tiempos de espera son variables durante el día, un monitoreo en tiempo real puede ser útil.`,
    action: `Implementar sensores o cámaras que recopilen datos en tiempo real. Usar estos datos para ajustar dinámicamente la operación del sistema.`,
    impact: `Mejora de la capacidad de respuesta a cambios en la demanda.`,
  },
]

export const csvColumns = [
  'NumeroCliente',
  'TipoAutomovil',
  'NumeroBomba',
  'HoraLlegada',
  'HoraSalida',
  'DuracionServicio',
  'TiempoEntreLlegadas',
  'TipoPago',
  'TipoProducto',
]
