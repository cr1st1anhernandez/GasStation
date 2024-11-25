import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const Chart = ({
  data,
  YAxisName,
  YAxisKey,
  XAxisName,
  XAxisKey,
  color,
}: any) => {
  return (
    <div className="h-[400px] w-full md:h-[550px]">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={XAxisKey}
            label={{
              value: XAxisName,
              position: 'insideBottom',
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: YAxisName,
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Bar dataKey={YAxisKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
