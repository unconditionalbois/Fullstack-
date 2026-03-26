let movies = [];
let nextId = 1;

export const getAllMovies = () => movies;

export const addMovie = (movie) => {
  const newMovie = { id: nextId++, ...movie };
  movies.push(newMovie);
  return newMovie;
};

export const getMovieById = (id) => movies.find(m => m.id === parseInt(id));

export const updateMovie = (id, updatedMovie) => {
  const index = movies.findIndex(m => m.id === parseInt(id));
  if (index !== -1) {
    movies[index] = { id: parseInt(id), ...updatedMovie };
    return movies[index];
  }
  return null;
};

export const deleteMovie = (id) => {
  const index = movies.findIndex(m => m.id === parseInt(id));
  if (index !== -1) {
    movies.splice(index, 1);
    return true;
  }
  return false;
};

