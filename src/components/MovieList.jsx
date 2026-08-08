import MovieCard from "./MovieCard";

export default function MovieList({ movies}) {
  // TODO: destructure props — movies

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movies) =>(
      <MovieCard key={movies.id}{...movies} />
    ))}
    </div>
  );
}
