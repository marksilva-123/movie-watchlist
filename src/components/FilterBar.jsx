import React from "react";

const FilterBar = ({ currentFilter, onChangeFilter }) => {
  return (
    <div className="filter-bar">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onChangeFilter("all")}
      >
        All
      </button>

      <button
        className={currentFilter === "watched" ? "active" : ""}
        onClick={() => onChangeFilter("watched")}
      >
        Watched
      </button>

      <button
        className={currentFilter === "unwatched" ? "active" : ""}
        onClick={() => onChangeFilter("unwatched")}
      >
        Unwatched
      </button>
    </div>
  );
};

export default FilterBar;