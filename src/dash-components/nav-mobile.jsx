import "./nav-mobile.css"
import { ArrowLeftRight, ChartBar, Home, Settings, Wallet } from "lucide-react"

export default function NavMobile({children,goToBudget,goToHome,goToStats,goToTransactions}) {
    
    return(
        <>
        <div className="nav-bar-mobile">
            <ul>
                <li onClick={goToHome}><Home /></li>
                <li onClick={goToTransactions}><ArrowLeftRight/></li>
                <li onClick={goToStats}><ChartBar/></li>
                <li onClick={goToBudget}><Wallet /></li>
            </ul>
        </div>
        </>
    )
}