import React from "react";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import filterStyles from "./Filter.module.css";

function Filter(props) {
  const SearchHandler = (searchValue) => {
    props.FilterHandle({ search: searchValue });
  };
  const DropdownHandler = (dropdownValue) => {
    props.FilterHandle({ category: dropdownValue });
  };
  return (
    <div className={filterStyles.container}>
      <SearchBar SearchHandle={(searchValue) => SearchHandler(searchValue)} />
      <Dropdown
        DropdownHandle={(dropdownValue) => DropdownHandler(dropdownValue)}
      />
    </div>
  );
}

export default Filter;
