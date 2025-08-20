import MainCard from "./mainCard";
import "./balanceCard.css"

export default function BalanceCard({balance}) {
    
    return(
        <MainCard 
            title={'Balance'}
            style = {{
                color: 'var(--text-accent4)'
            }}
        >
            {balance}
        </MainCard>
        
    )
}