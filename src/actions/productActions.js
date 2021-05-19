import Axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SECCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SECCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_PER_PAGE_REQUEST,
  PRODUCT_PER_PAGE_SECCESS,
  PRODUCT_PER_PAGE_FAIL,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`${process.env.ENDPOINT}/api/products`);
    dispatch({ type: PRODUCT_LIST_SECCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detialProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(
      `${process.env.ENDPOINT}/api/products/${productId}`
    );
    dispatch({ type: PRODUCT_DETAIL_SECCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${process.env.ENDPOINT}/api/products`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${process.env.ENDPOINT}/api/products/${product._id}`,
      product,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `${process.env.ENDPOINT}/api/products/${productId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

export const productPerPage = (startIndex, endIndex) => async (dispatch) => {
  dispatch({ type: PRODUCT_PER_PAGE_REQUEST });
  try {
    console.log(process.env.ENDPOINT);
    const { data } = await Axios.get(
      `${process.env.ENDPOINT}/api/products/limit/${startIndex}&${endIndex}`
    );
    dispatch({ type: PRODUCT_PER_PAGE_SECCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_PER_PAGE_FAIL, payload: error.message });
  }
};
