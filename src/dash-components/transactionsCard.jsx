import { ArrowLeftRight } from "lucide-react/dist/cjs/lucide-react";
import MainCard from "./mainCard";

export default function TransactionsCard({onClick}) {
    return(
        <MainCard 
            title={'Transactions'}
            onClick={onClick}
        >
            <ArrowLeftRight />     
        </MainCard>
        
    )
}