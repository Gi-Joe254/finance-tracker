import MainCard from "./mainCard";

export default function TransactionsCard({transactions, onClick}) {
    return(
        <MainCard 
            title={'Transactions'}
            onClick={onClick}
        >
            {transactions}
           
        </MainCard>
        
    )
}