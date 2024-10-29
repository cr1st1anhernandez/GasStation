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
    <div className="w-full h-[400px] md:h-[550px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
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
              value: "Automóviles",
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
