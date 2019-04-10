import React from "react";

const SearchBox = ({ searchChange }) => {
  return (
    <div className="pa2">
      <input
        className="pa3 ba b--g bg-lightest-blue"
        type="search"
        placeholder="Search for a Kitty"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
