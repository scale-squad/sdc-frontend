import React from "react";

const SearchQuestion = ({ searchTerm, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Have a question? Search for answers..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button>Q</button>
    </div>
  );
};

export default SearchQuestion;
