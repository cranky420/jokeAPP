const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors());

// const jokes = [
//   "Why don’t scientists trust atoms? Because they make up everything!",
//   "Why did the math book look sad? Because it had too many problems.",
//   "Why can’t your nose be 12 inches long? Because then it would be a foot!",
//   "I'm reading a book on anti-gravity. It's impossible to put down!",
//   "Why did the scarecrow win an award? Because he was outstanding in his field!"
// ];

// app.get('/api/joke', (req, res) => {
//   const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
//   res.json({ joke: randomJoke });
// });

app.get('/api/joke', async (req, res) => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
      const joke = response.data;
      res.json({ joke: `${joke.setup} ${joke.punchline}` });
    } catch (error) {
      console.error('Error fetching joke:', error.message);
      res.status(500).json({ error: 'Failed to fetch joke from external API' });
    }
  });
  

app.listen(port, () => {
  console.log(`Joke API running at http://localhost:${port}`);
});
