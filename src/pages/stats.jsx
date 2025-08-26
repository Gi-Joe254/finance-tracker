import { useEffect, useState } from "react"
import "./stats.css"
import { collection, addDoc, deleteDoc, getDocs, doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

export default function Stats() {
    const [income, setIncome] = useState(100000)
    const [balance, setBalance] = useState(0)
    const [expenses, setExpenses] = useState(0)

    useEffect(()=> {
        const unsub = onSnapshot(collection(db, 'transactions'), (snapshot) => {
            const transList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            let totalExpense = 0
            transList.forEach(item => {
                totalExpense += Number(item.amt)
            })
            setExpenses(totalExpense)
            setBalance(income - totalExpense)
        })
        return () => unsub()
    },[])

    return(
        <div className="stats">
            <h1 className="stats-header">Stats</h1>

            <div className="totals">
                <p>Total Income: {income}</p>
                <p>Total Expenses: {expenses}</p>
                <p>Net Balance: {balance}</p>
            </div>

            <div className="categories">
                <h2>By Category</h2>
                {/* list or chart goes here */}
            </div>
        </div>

    )
}