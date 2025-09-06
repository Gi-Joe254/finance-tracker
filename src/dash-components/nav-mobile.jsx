import { NavLink } from "react-router-dom"
import "./nav-mobile.css"
import { ArrowLeftRight, ChartBar, Home, Wallet } from "lucide-react"

export default function NavMobile() {
  return (
    <div className="nav-bar-mobile">
      <ul>
        <li>
          <NavLink 
            to="/dashboard"
            end
            className={({ isActive })=> isActive ? "nav-link active": 'nav-link'}
          >
            <Home />
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/transactions"
             className={({ isActive })=> isActive ? "nav-link active": 'nav-link'}
        >
            <ArrowLeftRight />
          </NavLink>
        </li>
        <li>
          <NavLink 
          to="/stats"
           className={({ isActive })=> isActive ? "nav-link active": 'nav-link'}
          
          >
            <ChartBar />
          </NavLink>
        </li>
        <li>
          <NavLink 
           className={({ isActive })=> isActive ? "nav-link active": 'nav-link'}
            to="/budget"
          >
            <Wallet />
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
