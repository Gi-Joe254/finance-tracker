import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

export default function CategoryChart ({ data }) {

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]
  return (
    <PieChart
        width={400}
        height={300}
    >
        <Pie
            data={data}
            dataKey='amt'
            nameKey = 'cat'
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#206dc5ff"
            
        >
            {data.map((item, index) => (
                <Cell 
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
    </PieChart>
  )
}
