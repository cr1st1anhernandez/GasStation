import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const TimeServiceChart = () => {
  const data = [
    { automoviles: 15, tiempoServicio: 0.77 },
    { automoviles: 30, tiempoServicio: 1.53 },
    { automoviles: 45, tiempoServicio: 2.28 },
    { automoviles: 60, tiempoServicio: 3.04 },
    { automoviles: 75, tiempoServicio: 3.8 },
    { automoviles: 90, tiempoServicio: 4.55 },
    { automoviles: 105, tiempoServicio: 5.31 },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={550}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="tiempoServicio"
            label={{
              value: "Tiempo promedio",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Número de automóviles",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Bar dataKey="automoviles" fill="#0d9488" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
