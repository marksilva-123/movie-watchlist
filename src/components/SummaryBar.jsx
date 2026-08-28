import React from "react";

const SummaryBar = ({ movies }) => {
  const total = movies.length;
  const watched = movies.filter((movie) => movie.watched).length;
  const unwatched = total - watched;

  return (
    <div className="summary-bar">
      <p>Total: {total}</p>
      <p>Watched: {watched}</p>
      <p>Unwatched: {unwatched}</p>
    </div>
  );
};

export default SummaryBar;