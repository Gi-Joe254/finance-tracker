import { useNavigate } from "react-router-dom"
import "./dashboard.css"
import BalanceCard from "../dash-components/balanceCard";
import BudgetCard from "../dash-components/budgetCard";
import StatsCard from "../dash-components/statsCard";
import TransactionsCard from "../dash-components/transactionsCard";


export default function Dashboard() {
    const navigate = useNavigate();
    function goToTransactions() {
        navigate("/transactions")
    }

    return(
        <div className="dashboard">
            <h1 className="dash-header">Dashboard</h1>
            <BalanceCard 
                balance='200'
            />
            <BudgetCard 

            />
            <StatsCard 

            />
            <TransactionsCard
                onClick = {goToTransactions}
            />
        </div> 
    )
}