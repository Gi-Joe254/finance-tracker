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
import { useState } from "react";


export default function Dashboard() {
    const [ user, loading] = useAuthState(auth)
    const navigate = useNavigate()

    const [balSetnShown, setBalSetnShown] = useState(false)
    const [userBal, setUserBal] = useState(0)
    const [totalBal, setTotalBal] = useState(0)

    

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
                    <li onClick={()=>{setBalSetnShown(prev => (!prev))}}>
                        Manage Account
                    </li>
                    <li onClick={()=>{signOut(auth)}}>Logout</li>
                </ul>
            </div>
            <p className="greetings">Hello, {user.email.split('@')[0]}</p>
            <div className="dash-cards">
                <div className="bal-card">
                    <BalanceCard>
                        <div className="bal-card-header">Total Balance:</div>
                        <div className="bal-card-amt">Ksh{totalBal}</div>

                        {balSetnShown && 
                            <div className="set-bal">
                                <h3>Set Initial Balance</h3>
                                <input
                                    placeholder="Amount" 
                                    value={userBal}
                                    onChange={(e) => {setUserBal(e.target.value)}}
                                />
                                <button
                                    onClick={()=> {setTotalBal(userBal); setBalSetnShown(false)}}
                                >
                                    Save
                                </button>
                            </div>
                        }
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