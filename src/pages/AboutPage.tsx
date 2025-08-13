// src/pages/AboutPage.tsx
import React from "react";
import "./AboutPage.css";

const AboutPage: React.FC = () => {
  return (
    <main className="about">
      <h1>About Chronowriter 🪐</h1>
      <section className="about__section">
        <h2>Our Mission</h2>
        <p>
          Chronowriter is a modular, frontend-only AI book builder designed to empower creators of all skill levels.
          We believe storytelling should be emotionally supportive, technically intuitive, and endlessly remixable.
        </p>
      </section>

      <section className="about__section">
        <h2>Modular Philosophy</h2>
        <p>
          Every component in Chronowriter is built to be reusable, customizable, and beginner-friendly.
          Whether you're generating chapters, saving prompts, or designing covers — the system adapts to your flow.
        </p>
      </section>

      <section className="about__section">
        <h2>Creative Safety</h2>
        <p>
          We prioritize emotional safety and clarity in every interaction. From onboarding to output, Chronowriter scaffolds
          your journey with clear feedback, gentle guidance, and space to explore.
        </p>
      </section>
<section className="about__section">
  <h2>Models We Use</h2>
  <ul>
    <li><strong>DeepSeek:</strong> High-performance model used for structured storytelling, technical clarity, and chapter generation.</li>
    <li><strong>Claude 3 Sonnet:</strong> Emotionally intelligent model used for tone calibration and character arcs.</li>
    <li><strong>GPT-4:</strong> Used for fallback logic, prompt refinement, and advanced orchestration.</li>
  </ul>
  <p>
    Chronowriter uses OpenRouter to orchestrate these models modularly, allowing creators to choose the right tool for each task.
  </p>
</section>

    </main>
  );
};

export default AboutPage;