import { XAxis, YAxis, Tooltip, Cell, LineChart, Line } from "recharts";

export default function DateChart({ data }) {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]
  return (
    <LineChart width={300} height={400} data={data}>
      <Line type='monotone' dataKey='cat' stroke="red" />
      <XAxis dataKey='amt' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
