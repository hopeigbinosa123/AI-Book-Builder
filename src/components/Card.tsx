import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  icon?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="card">
      <div className="card__header">
        {icon && <span className="card__icon">{icon}</span>}
        <h3>{title}</h3>
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
};

export default Card;