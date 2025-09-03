import { NavLink } from "react-router-dom"
import "./nav-desktop.css"
import { ArrowLeftRight, ChartBar, Home, Settings, Wallet } from "lucide-react"

export default function NavDesktop({children,goToBudget,goToHome,goToStats,goToTransactions}) {
    
    return(
       
        <div className="nav-bar-desktop">
            <div>{children}</div>
            <div className="nav-links">
                <div onClick={goToHome}><Home /><p>Home</p></div>               
                <div onClick={goToTransactions}><ArrowLeftRight/><p>Transactions</p></div>
                <div onClick={goToStats}><ChartBar/><p>Charts</p></div>
                <div onClick={goToBudget}><Wallet /><p>Budgeting</p></div>
            </div>
        </div>
    )
}