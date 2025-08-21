import MainCard from "./mainCard";
import "./balanceCard.css"

export default function BalanceCard({balance}) {
    
    return(
        <MainCard 
            title={'Balance'}
        >
            {balance}
        </MainCard>
        
    )
}