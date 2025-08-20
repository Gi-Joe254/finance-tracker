import MainCard from "./mainCard";

export default function BudgetCard({budget, onClick}) {
    return(
        <MainCard 
            title={'Budget'}
            onClick={onClick}
        >
            {budget}
        </MainCard>
        
    )
}