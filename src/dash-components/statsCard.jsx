import { ChartBar } from "lucide-react/dist/cjs/lucide-react";
import MainCard from "./mainCard";

export default function StatsCard({ onClick}) {
    return(
        <MainCard 
            title={'Stats'}
            onClick={onClick}
        >
            <div><ChartBar /></div>
        </MainCard>
        
    )
}