import "./mainCard.css"

export default function MainCard({title, children, onClick}){
    return(
        <div className="main-card" onClick={onClick}>
            <h3 className="main-card-title">{title}</h3>
            <div className="main-card-content">{children}</div>
        </div>
    )
}