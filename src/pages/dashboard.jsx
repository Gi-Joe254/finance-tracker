import { useNavigate } from "react-router-dom"
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./dashboard.css"
import BalanceCard from "../dash-components/balanceCard";
import BudgetCard from "../dash-components/budgetCard";
import StatsCard from "../dash-components/statsCard";
import TransactionsCard from "../dash-components/transactionsCard";
import { signOut } from "firebase/auth";
import Nav from "../dash-components/nav-mobile";
import { GrUserSettings } from "react-icons/gr";
import NavDesktop from "../dash-components/nav-desktop";
import NavMobile from "../dash-components/nav-mobile";
import { Banknote } from "lucide-react/dist/cjs/lucide-react";


export default function Dashboard() {
    const [ user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    function goToBudget() {navigate("/budget")}
    function goToTransactions() {navigate("/transactions")}
    function goToStats() {navigate("/stats")}
    function goToHome() {navigate("/dashboard")}

    return(
        <>
        <div className="dashboard">
            <header>
                <NavDesktop
                    goToHome={goToHome}
                    goToBudget={goToBudget}
                    goToStats={goToStats}
                    goToTransactions={goToTransactions}
                >
                    <p className="nav-logo">Budgeting App</p>
                    <div className="nav-logo-img"><Banknote /></div>
                </NavDesktop>
            </header>
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
            <div className="dash-cards">
                <div className="bal-card">
                    <BalanceCard>
                        <div className="bal-card-header">Total Balance</div>
                        <div className="bal-card-amt">Ksh: 20000</div>
                    </BalanceCard>
                </div>
                <div className="clickable-cards">
                    <BudgetCard 
                        onClick={goToBudget}
                    />
                    <StatsCard 
                        onClick={goToStats}
                    />
                    <TransactionsCard
                        onClick={goToTransactions}
                    />
                </div>
            </div>
            <div className="dash-footer-nav">
                <NavMobile
                    goToHome={goToHome}
                    goToTransactions={goToTransactions}
                    goToStats={goToStats}
                    goToBudget={goToBudget}
                />
            </div>
        </div> </>
    )
}