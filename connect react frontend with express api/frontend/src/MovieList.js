import React from 'react';
import MovieForm from './MovieForm';

function MovieList({ movies, loading, onMovieUpdated, onMovieDeleted }) {
  const [editingMovie, setEditingMovie] = React.useState(null);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center animate-pulse">
        <div className="text-2xl">Loading movies...</div>
      </div>
    );
  }

  if (movies.length === 0 && !editingMovie) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center animate-fade-in">
        <div className="text-3xl mb-4">🎬</div>
        <h3 className="text-2xl font-bold mb-2">No movies yet</h3>
        <p className="text-gray-400">Add your first movie above!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {editingMovie && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Edit Movie</h2>
              <button
                onClick={() => setEditingMovie(null)}
                className="text-2xl hover:text-red-400 transition-colors"
              >
                ×
              </button>
            </div>
            <MovieForm
              editingMovie={editingMovie}
              onMovieAdded={() => {
                setEditingMovie(null);
                onMovieUpdated();
              }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fade-in hover:animate-none"
          >
            <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-5xl opacity-50">🎥</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">{movie.title}</h3>
            <p className="text-lg text-gray-300 mb-1">Directed by {movie.director}</p>
            <p className="text-xl font-semibold text-yellow-400 bg-black/30 px-3 py-1 rounded-full inline-block mb-6">
              {movie.year}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingMovie(movie)}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/50"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('Delete this movie?')) {
                    try {
                      const res = await fetch(`/api/movies/${movie.id}`, { method: 'DELETE' });
                      if (res.ok) {
                        onMovieDeleted();
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-500/50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;

