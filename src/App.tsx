// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // new modular navbar
import BookBuilder from "./components/BookBuilder";
import Favorites from "./components/Favorites";

// New pages
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";

import "./styles/app.css"; // Global styles

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BookBuilder />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
