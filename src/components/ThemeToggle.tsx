import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;