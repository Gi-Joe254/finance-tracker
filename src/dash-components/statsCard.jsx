import MainCard from "./mainCard";

export default function StatsCard({stats, onClick}) {
    return(
        <MainCard 
            title={'Stats'}
            onClick={onClick}
        >
            {stats}
        </MainCard>
        
    )
}