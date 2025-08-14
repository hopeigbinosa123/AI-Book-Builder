import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button.css";

interface ButtonProps {
  label: string;
  to?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, to, onClick }) => {
  return to ? (
    <Link to={to} className="button">
      {label}
    </Link>
  ) : (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;