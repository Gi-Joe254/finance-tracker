import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

export default function CategoryChart ({ data }) {

  const COLORS = ["var(--btn-color3)", "var(--text1)", "var(--btn-color4)", "var(--text-accent1)", "var(--text-accent4)", "var(--btn-color1)"]
  return (
    <PieChart
        width={300}
        height={300}
    >
        <Legend 
            layout="horizontal"
            verticalAlign="right"
            wrapperStyle={{
                margin:'30px 0 0 80px'
            }}
        />
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
    </PieChart>
  )
}
