import "./nav.css"
import { ArrowLeftRight, ChartBar, Home, Settings, Wallet } from "lucide-react"

export default function Nav({children,goToBudget,goToHome,goToStats,goToTransactions}) {
    
    return(
        <div className="nav-bar-mobile">
            <div>{children}</div>
            <ul>
                <li onClick={goToHome}><Home /></li>
                <li onClick={goToTransactions}><ArrowLeftRight/></li>
                <li onClick={goToStats}><ChartBar/></li>
                <li onClick={goToBudget}><Wallet /></li>
                <li><Settings /></li>
            </ul>
        </div>
    )
}