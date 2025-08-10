import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        AI Book Builder 🚀
      </h1>
    </div>
  );
}

export default App;
