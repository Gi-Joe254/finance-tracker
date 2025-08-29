import MainCard from "./mainCard";
import "./balanceCard.css"

export default function BalanceCard({children}) {
    
    return(
        <div className="balance-card">
            {children}
        </div>
    )
}