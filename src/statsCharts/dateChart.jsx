import { XAxis, YAxis, Tooltip, Cell, LineChart, Line } from "recharts";

export default function DateChart({ data }) {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]
  return (
    <LineChart width={400} height={300} data={data}>
      <Line type='monotone' dataKey='amt' stroke="red" />
      <XAxis dataKey='dat' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
