import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";

const initialMovies = [
  {
    id: 1,
    title: "Inception",
    poster: "https://via.placeholder.com/150",
    genre: "Sci-Fi",
    year: 2010,
    rating: 9,
    watched: true,
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://via.placeholder.com/150",
    genre: "Sci-Fi",
    year: 2014,
    rating: 9,
    watched: false,
  },
];

function App() {
  // Task 1: Restore movies from localStorage
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : initialMovies;
  });

  // Task 3: Restore filter from localStorage
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  // Task 1: Save movies to localStorage
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Task 2: Sync document title
  useEffect(() => {
    document.title = `Movie Watchlist (${movies.length})`;
  }, [movies.length]);

  // Task 3: Save filter to localStorage
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // Add movie
  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Toggle watched
  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  // Delete movie
  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // Task 4: Clear All
  const handleClearAll = () => {
    if (confirm("Clear your entire watchlist? This cannot be undone.")) {
      setMovies([]);
    }
  };

  // Filter movies
  const visibleMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "unwatched") return !movie.watched;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Movie Watchlist</h1>

      <SummaryBar movies={movies} />

      <button
        className="btn btn-error btn-sm"
        onClick={handleClearAll}
      >
        Clear All
      </button>

      <AddMovieForm onAddMovie={handleAddMovie} />

      <FilterBar
        currentFilter={filter}
        onChangeFilter={setFilter}
      />

      <MovieList
        movies={visibleMovies}
        onToggleWatched={handleToggleWatched}
        onDelete={handleDeleteMovie}
      />
    </div>
  );
}

export default App;