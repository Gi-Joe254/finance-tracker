import MainCard from "./mainCard";

export default function BalanceCard({balance}) {
    
    return(
        <MainCard 
            title={'Balance'}
        >
            {balance}
        </MainCard>
        
    )
}