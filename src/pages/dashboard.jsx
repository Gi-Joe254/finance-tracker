import { useNavigate } from "react-router-dom"
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./dashboard.css"
import BalanceCard from "../dash-components/balanceCard";
import BudgetCard from "../dash-components/budgetCard";
import StatsCard from "../dash-components/statsCard";
import TransactionsCard from "../dash-components/transactionsCard";
import { signOut } from "firebase/auth";


export default function Dashboard() {
    const [ user, loading] = useAuthState(auth)
    const navigate = useNavigate();
    function goToTransactions() {
        navigate("/transactions")
    }
    function goToStats() {
        navigate("/stats")
    }
    function goToBudget() {
        navigate("/budget")
    }

    return(
        <div className="dashboard">
            <h1 className="dash-header">Dashboard</h1>
            <p>Hello {user.email}</p>
            <BalanceCard 
                balance='200'
            />
            <BudgetCard 
                onClick={goToBudget}
            />
            <StatsCard 
                onClick = {goToStats}
            />
            <TransactionsCard
                onClick = {goToTransactions}
            />
            <button
                onClick={()=>{signOut(auth)}}
            >
                Logout
            </button>
        </div> 
    )
}