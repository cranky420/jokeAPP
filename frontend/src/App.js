import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState("");

  const fetchJoke = () => {
    fetch("/api/joke/")
      .then((res) => res.json())
      .then((data) => setJoke(data.joke))
      .catch(() => setJoke("Failed to fetch joke 😞"));
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>😂 Random Joke Generator</h1>
        <div className="joke-box">{joke}</div>
        <button className="refresh-btn" onClick={fetchJoke}>
          Get Another Joke
        </button>
      </header>
    </div>
  );
}

export default App;
