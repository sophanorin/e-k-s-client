import React, { useEffect, useState } from "react";
import { categorylist } from "../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";

function Dropdown(props) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const DropdownHandler = (e) => {
    props.DropdownHandle(e.target.value);
  };

  useEffect(() => {
    dispatch(categorylist());
  }, [dispatch]);

  return (
    <div>
      <label htmlFor="category">Category : </label>
      <select id="category" onChange={(e) => DropdownHandler(e)}>
        <option selected>All</option>
        {categories &&
          categories.map((category) => (
            <option key={category._id}>{category.name}</option>
          ))}
      </select>
    </div>
  );
}

export default Dropdown;
