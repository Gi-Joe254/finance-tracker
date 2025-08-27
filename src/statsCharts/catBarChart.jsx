import { Bar, BarChart, XAxis, YAxis, Tooltip, Cell } from "recharts";

export default function CatBarChart({ data }) {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]
  return (
    <BarChart width={400} height={300} data={data}>
      <Bar dataKey='amt'>
        {data.map((item, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]}/>
        ))}
      </Bar>
      <XAxis dataKey="cat" /> 
      <YAxis />          
      <Tooltip />       
    </BarChart>
  );
}
