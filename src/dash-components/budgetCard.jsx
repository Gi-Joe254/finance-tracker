import MainCard from "./mainCard";

export default function BudgetCard({budget}) {
    return(
        <MainCard 
            title={'Budget'}
        >
            {budget}
        </MainCard>
        
    )
}