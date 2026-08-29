import { getPosterUrl } from "../api/tmdb";

const SearchResults = ({ results, onAdd, isLoading, error }) => {
  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <section className="my-6">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((movie) => (
          <div key={movie.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title text-base">
                {movie.title}
              </h3>

              <p>
                {movie.release_date?.slice(0, 4) || "N/A"} • ⭐{" "}
                {movie.vote_average?.toFixed(1) || "—"}
              </p>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => onAdd(movie)}
              >
                Add to Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResults;