import { XAxis, YAxis, Tooltip, AreaChart, Area, LineChart, Line } from "recharts";

export default function DateChart({ data }) {
 
  return (
    <LineChart width={400} height={300} data={data}>
      <Line type='monotone' dataKey='amt' stroke='var(--text4)' />
      <XAxis dataKey='dat' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
