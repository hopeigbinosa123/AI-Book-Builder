import React from "react";
import "../styles/HomePage.css";
import Button from "../components/Button";

const HomePage: React.FC = () => {
  return (
    <main className="home">
      <section className="hero">
        <h1>Chronowriter ✨</h1>
        <p>
          A modular AI book builder that empowers creators to explore, remix, and publish with emotional safety and technical clarity.
        </p>
        <Button label="Start Creating" to="/gallery" />
      </section>
    </main>
  );
};

export default HomePage;