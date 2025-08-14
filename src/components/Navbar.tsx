// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Chronowriter</div>
      <ul className="navbar__links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/builder">Book Builder</NavLink></li>
        <li><NavLink to="/gallery">Gallery</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    </nav>
  );
}