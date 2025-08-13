## 📘 Chronowriter

Chronowriter is a **modular, frontend-only AI book builder** designed to empower creators of all skill levels. It blends intuitive UI/UX, emotionally supportive design, and flexible model orchestration to help users explore, remix, and publish their stories.

---

## 🚀 Features

- 🪐 **Modular Architecture** — Reusable components for books, prompts, chapters, and models  
- 📚 **Gallery View** — Browse saved books and regenerate content  
- ✨ **Hero Landing Page** — Welcoming intro with emotional clarity  
- 🧠 **Model Overview** — Claude, Mixtral, Mistral, GPT-4 (via OpenRouter)  
- 🎨 **Custom UI Components** — Cards, buttons, grids, and responsive layouts  
- 🌗 **Dark Mode (optional)** — Toggle via context  
- 🔔 **Toast Notifications (optional)** — Feedback for remix/save actions  
- 📐 **Sidebar Layout (optional)** — Dashboard-ready structure  

---

## 🧱 Tech Stack

| Layer        | Tools Used                          |
|--------------|-------------------------------------|
| Frontend     | React, TypeScript, React Router     |
| Styling      | CSS Modules, Global Variables       |
| AI Models    | Mistral-7B, Mixtral-8x7B, Claude 3 Sonnet, GPT-4 (via OpenRouter) |
| Architecture | Modular components, context hooks   |

---

## 🛠️ Getting Started

```bash
git clone https://github.com/your-username/chronowriter.git
cd chronowriter
npm install
npm start
```

Then visit `http://localhost:3000` to explore the app.

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components (Card, Button, Grid, etc.)
├── pages/            # Page views (HomePage, GalleryPage, AboutPage)
├── styles/           # Global and modular CSS
├── context/          # Theme context (optional)
├── App.tsx           # Routing setup
└── index.tsx         # Entry point
```

---

### 🧠 Model Integration

Chronowriter uses **OpenRouter** to orchestrate multiple AI models. You can plug in:

- `DeepSeek`: For structured storytelling, technical clarity, and chapter generation  
- `Claude 3 Sonnet`: For emotional tone and character arcs  
- `GPT-4`: For fallback logic and prompt refinement  

Model switching and orchestration pipelines are modular and ready to expand.


## 💡 Philosophy

Chronowriter is built on three core principles:

- **Modularity** — Every component is reusable and beginner-friendly  
- **Emotional Safety** — Clear feedback, gentle guidance, and supportive UX  
- **Creative Flow** — Remixable content, intuitive navigation, and frictionless design  

---

## 📌 Roadmap

- [ ] Prompt history and favorites  
- [ ] Chapter editor with inline regeneration  
- [ ] Download/export options  
- [ ] ModelSwitcher component  
- [ ] Collaborative publishing tools  

---

## 🤝 Contributing

We welcome modular thinkers, creative coders, and emotionally aware designers. To contribute:

1. Fork the repo  
2. Create a feature branch  
3. Submit a PR with clear documentation and modular structure  

---

## 📜 License

MIT — feel free to remix, reuse, and build your own creative tools.