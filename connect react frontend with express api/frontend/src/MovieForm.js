import React, { useState, useEffect } from 'react';

function MovieForm({ onMovieAdded, editingMovie = null }) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title || '');
      setDirector(editingMovie.director || '');
      setYear(editingMovie.year || '');
      setIsEditing(true);
    } else {
      setTitle('');
      setDirector('');
      setYear('');
      setIsEditing(false);
    }
  }, [editingMovie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !director || !year) return;

    const movieData = { title, director, year: parseInt(year) };

    try {
      const url = isEditing 
        ? `/api/movies/${editingMovie.id}` 
        : '/api/movies';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) throw new Error('Failed to save movie');

      // Reset form
      setTitle('');
      setDirector('');
      setYear('');
      onMovieAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl animate-fade-in hover:shadow-3xl transition-all duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        {isEditing ? 'Edit Movie' : 'Add New Movie'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-200">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Movie Title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-200">Director</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Director Name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-200">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            placeholder="2023"
            min="1900"
            max="2025"
            required
          />
        </div>
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-xl font-bold rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            {isEditing ? 'Update Movie' : 'Add Movie'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;

