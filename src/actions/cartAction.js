import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productID, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/products/${productID}`
  );
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: data.title,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      description: data.description,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productID) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productID });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
