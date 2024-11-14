import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const Chart = ({ data }: any) => {
  return (
    <div className="h-[400px] w-full md:h-[550px]">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="interval"
            label={{
              value: 'Tiempo promedio',
              position: 'insideBottom',
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: 'Automóviles',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Bar dataKey="frequency" fill="#0d9488" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
