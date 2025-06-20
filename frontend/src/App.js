import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/joke")
      .then((res) => res.json())
      .then((data) => setJoke(data.joke))
      .catch((err) => setJoke("Failed to fetch joke 😞"));
  }, []);

  return (
    <div className="App">
      <h1>Random Joke Generator</h1>
      <p>{joke}</p>
    </div>
  );
}

export default App;
