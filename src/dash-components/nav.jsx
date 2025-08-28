import "./nav.css"
import { ArrowLeftRight, ChartBar, Home, Settings, Wallet } from "lucide-react"

export default function Nav() {

    return(
        <div className="nav-bar-mobile">
            <ul>
                <li><Home /></li>
                <li><ArrowLeftRight/></li>
                <li><ChartBar/></li>
                <li><Wallet /></li>
                <li><Settings /></li>
            </ul>
        </div>
    )
}