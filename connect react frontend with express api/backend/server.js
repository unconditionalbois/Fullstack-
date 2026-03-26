const express = require('express');
const cors = require('cors');
const { getAllMovies, addMovie, getMovieById, updateMovie, deleteMovie } = require('./data');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/movies', (req, res) => {
  res.json(getAllMovies());
});

app.post('/api/movies', (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const movie = addMovie({ title, director, year });
  res.status(201).json(movie);
});

app.put('/api/movies/:id', (req, res) => {
  const { title, director, year } = req.body;
  const movie = updateMovie(req.params.id, { title, director, year });
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
});

app.delete('/api/movies/:id', (req, res) => {
  if (deleteMovie(req.params.id)) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

