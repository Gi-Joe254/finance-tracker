import React from "react";
import "./mainCard.css";

export default function MainCard({ title, children, onClick, variant = "primary" }) {
  return (
    <div 
      className={`main-card main-card--${variant} ${onClick ? "main-card--clickable" : ""}`} 
      onClick={onClick}
    >
      {title && <h3 className="main-card-title">{title}</h3>}
      <div className="main-card-content">{children}</div>
    </div>
  );
}
