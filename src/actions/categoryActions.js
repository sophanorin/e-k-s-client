import Axios from "axios";
import {
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_FAIL,
  ONE_CATEGORY_REQUEST,
  ONE_CATEGORY_SUCCESS,
  ONE_CATEGORY_FAIL,
} from "../constants/categoryConstants";

export const categorylist = () => async (dispatch, getState) => {
  dispatch({ type: ALL_CATEGORY_REQUEST });
  try {
    const { data } = await Axios.get(`${process.env.ENDPOINT}/api/category`);
    dispatch({ type: ALL_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const specificcategory = (id) => async (dispatch, getState) => {
  dispatch({ type: ONE_CATEGORY_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.get(
      `${process.env.ENDPOINT}/api/category/${id}`,
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: ONE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ONE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createcategory = (name) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${process.env.ENDPOINT}/api/category`,
      { name },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_CATEGORY_FAIL, payload: message });
  }
};

export const updatecategory = (id, name) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${process.env.ENDPOINT}/api/category/${id}`,
      name,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_CATEGORY_FAIL, payload: message });
  }
};

export const deletecategory = (id) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `${process.env.ENDPOINT}/api/category/${id}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_CATEGORY_FAIL, payload: message });
  }
};
