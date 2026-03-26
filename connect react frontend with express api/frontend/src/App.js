import React, { useState, useEffect } from 'react';
import MovieForm from './MovieForm';
import MovieList from './MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/movies');
      if (!res.ok) throw new Error('Failed to fetch movies');
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const refetch = () => {
    fetchMovies();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Movie Manager
          </h1>
          <p className="text-xl text-gray-300">Manage your movie collection with ease</p>
        </header>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-8 text-center animate-fade-in">
            Error: {error}
          </div>
        )}

        <main className="space-y-8">
          <MovieForm onMovieAdded={refetch} />
          <MovieList movies={movies} loading={loading} onMovieUpdated={refetch} onMovieDeleted={refetch} />
        </main>
      </div>
    </div>
  );
}

export default App;

