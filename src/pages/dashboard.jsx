import { useNavigate } from "react-router-dom"
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./dashboard.css"
import BalanceCard from "../dash-components/balanceCard";
import BudgetCard from "../dash-components/budgetCard";
import StatsCard from "../dash-components/statsCard";
import TransactionsCard from "../dash-components/transactionsCard";
import { signOut } from "firebase/auth";
import Nav from "../dash-components/nav";
import { GrUserSettings } from "react-icons/gr";


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
            <div className="user-settings-icon">
                <GrUserSettings />
                <ul className="user-settings-dropdown">
                    <li>Manage Account</li>
                    <li>Set Theme</li>
                    <li  onClick={()=>{signOut(auth)}}>Logout</li>
                </ul>
            </div>
            <p className="greetings">Hello {user.email}</p>
            <BalanceCard 
                title= 'Balance'
                balance='200'
            />
            <div className="clickable-cards">
                <BudgetCard 
                onClick={goToBudget}
                />
                <StatsCard 
                    onClick = {goToStats}
                />
                <TransactionsCard
                    onClick = {goToTransactions}
                />
            </div>
            <Nav />
        </div> 
    )
}