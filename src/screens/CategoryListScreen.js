import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categorylist,
  createcategory,
  deletecategory,
} from "../actions/categoryActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  RESET_CREATE_CATEGORY,
  RESET_DELETE_CATEGORY,
} from "../constants/categoryConstants";
import { FaRegPlusSquare } from "react-icons/fa";
import * as categoryStyles from "./CategoryListScreen.module.css";

function CategoryListScreen(props) {
  const [name, setName] = useState("");

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deletecategory(id));
    }
  };
  const createHandler = () => {
    dispatch(createcategory(name));
    setName("");
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: RESET_CREATE_CATEGORY });
      // props.history.push(`/category/${createdCategory._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: RESET_DELETE_CATEGORY });
    }
    dispatch(categorylist());
  }, [createdCategory, dispatch, props.history, successCreate, successDelete]);

  return (
    <div className={categoryStyles.category__lists}>
      <div className={categoryStyles.category__header}>
        <h1>Category Listing</h1>
        <div className={categoryStyles.category_actions}>
          <div className={categoryStyles.create__category__btn}>
            <input
              placeholder="New Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={createHandler}>
              <FaRegPlusSquare />
            </button>
          </div>
          <div></div>
        </div>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox danger="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox danger="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox danger="danger">{error}</MessageBox>
      ) : (
        <div className={categoryStyles.table_container}>
          <table
            className={`${categoryStyles.table} ${categoryStyles.table__productlists}`}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>CATEGORY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CategoryListScreen;
