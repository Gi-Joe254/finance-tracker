import { Bar, BarChart, XAxis, YAxis, Tooltip, Cell, Legend } from "recharts";

export default function CatBarChart({ data }) {
  const COLORS = ["var(--btn-color3)", "var(--text1)", "var(--btn-color4)", "var(--text-accent1)", "var(--text-accent4)", "var(--btn-color1)"]
  return (
    <BarChart width={300} height={300} data={data}>
      <Bar dataKey='amt'>
        {data.map((item, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]}/>
        ))}
      </Bar>
      <XAxis dataKey="cat" /> 
      <YAxis />     
    </BarChart>
  );
}
