import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function SearchBar(props) {
  const SearchHandler = (e) => {
    props.SearchHandle(e.target.value);
  };

  return (
    <div>
      <label htmlFor="search"> Search : </label>
      <input
        id="search"
        placeholder="Search"
        onChange={(e) => SearchHandler(e)}
      />
    </div>
  );
}

export default SearchBar;
