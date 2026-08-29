import React, { useEffect, useState } from "react";

import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";

import { searchMovies, toWatchlistMovie } from "./api/tmdb";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

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

  // NEW: TMDB search state
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // NEW: Fetch TMDB search results
  useEffect(() => {
    if (!searchTerm) return;

    let isCancelled = false;

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const movies = await searchMovies(searchTerm);

        if (!isCancelled) {
          setResults(movies);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to fetch movies. Try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchResults();

    return () => {
      isCancelled = true;
    };
  }, [searchTerm]);

  // Add movie manually
  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // NEW: Add movie from TMDB search
  const handleAddFromSearch = (tmdbMovie) => {
    // Avoid adding duplicates
    if (movies.some((m) => m.id === tmdbMovie.id)) return;

    const watchlistMovie = toWatchlistMovie(tmdbMovie);

    setMovies([...movies, watchlistMovie]);
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

    {/* TMDB Search */}
    <SearchBar onSearch={setSearchTerm} />

    <SearchResults
      results={results}
      onAdd={handleAddFromSearch}
      isLoading={isLoading}
      error={error}
    />

    <hr />

    {/* Existing Lab 04 watchlist */}
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