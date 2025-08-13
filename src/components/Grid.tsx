import React from "react";
import "./Grid.css";

interface GridProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  return <div className="grid">{children}</div>;
};

export default Grid;