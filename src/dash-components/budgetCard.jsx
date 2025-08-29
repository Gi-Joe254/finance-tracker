import { Wallet } from "lucide-react/dist/cjs/lucide-react";
import MainCard from "./mainCard";

export default function BudgetCard({onClick}) {
    return(
        <MainCard 
            title='Budget'
            onClick={onClick}
        >
            <Wallet />
        </MainCard>
        
    )
}