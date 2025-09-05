import { useEffect, useState } from "react"
import "./stats.css"
import { collection, addDoc, deleteDoc, getDocs, doc, onSnapshot } from "firebase/firestore"
import { auth, db } from "../firebase"
import CategoryChart from "../statsCharts/categoryChart"
import DateChart from "../statsCharts/dateChart"
import CatBarChart from "../statsCharts/catBarChart"
import Nav from "../dash-components/nav-mobile"
import { useNavigate } from "react-router-dom"
import NavMobile from "../dash-components/nav-mobile"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Stats() {
    const [initialBal, setInitialBal] = useState(0)
    const [balance, setBalance] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [list, setList] = useState([])
    const [ user, loading] = useAuthState(auth)
    const navigate = useNavigate()

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
        const userColl = collection(db, 'users', user.uid, 'transactions')
        const unsub = onSnapshot(userColl, (snapshot) => {
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
            setBalance(initialBal - totalExpense)
        })
        return () => unsub()
    },[initialBal])
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
            if (snapshot.exists()) {
                setInitialBal(snapshot.data().balance || 0)
            }
            else {
                setInitialBal(0)
            }
        return () => unsub ()
    })
        
    },[user])


    return(
        <>
        <div className="stats">
            <h1 className="stats-header">Stats</h1>

            <div className="totals">
                <p>Initial Balance: {initialBal}</p>
                <p>Total Expenses: {expenses}</p>
                <p>Net Balance: {balance}</p>
            </div>

            {expenses > 0 && <div className="charts">
                <div className="category-chart">
                    <h2>By Category</h2>
                    <div className="category-chart-item">
                        <CategoryChart
                            data={categoryData}
                        />
                        <CatBarChart
                            data={categoryData}
                        />
                    </div>                
                </div>
                <div className="date-chart">
                    <h2>By Date</h2>
                    <DateChart 
                        data={dateData}
                    />
                </div>
            </div>}
            
            
        </div>
        {expenses === 0 && <p
            style={{
                color:'var(--text2)',
                paddingTop: '100px',
                textAlign: 'center'
            }}
        >
            No recorded transactions
        </p>}
        <footer className="footer-nav">
            <NavMobile
                goToHome={()=>{navigate("/dashboard")}}
                goToTransactions={()=>{navigate("/transactions")}}
                goToStats={()=>{navigate('/stats')}}
                goToBudget={()=>{navigate('/budget')}}
            />
        </footer>
        </>

    )
}