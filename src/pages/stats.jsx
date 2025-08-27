import { useEffect, useState } from "react"
import "./stats.css"
import { collection, addDoc, deleteDoc, getDocs, doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import CategoryChart from "../statsCharts/categoryChart"
import DateChart from "../statsCharts/dateChart"
import CatBarChart from "../statsCharts/catBarChart"

export default function Stats() {
    const [income, setIncome] = useState(100000)
    const [balance, setBalance] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [list, setList] = useState([])

    const categoryData = []
    list.forEach(item => {
        const existing = categoryData.find(entry => entry.cat === item.cat )
        if (existing) {
            existing.amt += Number(item.amt)
        } else {
            categoryData.push({cat: item.cat, amt: Number(item.amt)})
        }
    })

    const dateData = []
    list.forEach(item => {
        const dateStr = item.dat?.toDate 
            ? item.dat.toDate().toLocaleDateString() 
            : item.dat;

        const existing = dateData.find(entry => entry.dat === dateStr )
        if (existing) {
            existing.amt += Number(item.amt)
            
        } else {
            dateData.push({dat: dateStr, amt: Number(item.amt)})
        }
    })
    

    useEffect(()=> {
        const unsub = onSnapshot(collection(db, 'transactions'), (snapshot) => {
            const transList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setList(transList)
            let totalExpense = 0
            transList.forEach(item => {
                totalExpense += Number(item.amt)
            })
            setExpenses(totalExpense)
            setBalance(income - totalExpense)
        })
        return () => unsub()
    },[])
    console.log('data:',dateData)
    return(
        <div className="stats">
            <h1 className="stats-header">Stats</h1>

            <div className="totals">
                <p>Total Income: {income}</p>
                <p>Total Expenses: {expenses}</p>
                <p>Net Balance: {balance}</p>
            </div>

            <div className="category-chart">
                <h2>By Category</h2>
                <CategoryChart
                    data={categoryData}
                />
                 <CatBarChart
                    data={categoryData}
                />
            </div>
            <div className="date-chart">
                <h2>By Date</h2>
                 <DateChart 
                    data={dateData}
                />
            </div>
        </div>

    )
}