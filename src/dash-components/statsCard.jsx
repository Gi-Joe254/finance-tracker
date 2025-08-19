import MainCard from "./mainCard";

export default function StatsCard({stats}) {
    return(
        <MainCard 
            title={'Stats'}
        >
            {stats}
        </MainCard>
        
    )
}