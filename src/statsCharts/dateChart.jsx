import { XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

export default function DateChart({ data }) {
 
  return (
    <AreaChart width={400} height={300} data={data}>
      <Area type='monotone' dataKey='amt' stroke="red" fill="blue"/>
      <XAxis dataKey='dat' reversed />
      <YAxis />
      <Tooltip />
    </AreaChart>
  );
}
