import MainCard from "./mainCard";
import "./balanceCard.css"

export default function BalanceCard({balance, title}) {
    
    return(
        <div className="balance-card">
            <p>{title}</p>
            <p>{balance}</p>
        </div>
    )
}