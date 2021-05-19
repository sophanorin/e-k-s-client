import Axios from "axios";
import {
  ADD_ITEM_WISHLIST,
  MOVE_ITEM_FROM_WISHLIST,
} from "../constants/wishlistConstants";

export const addItemWishlist =
  (productID, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/products/${productID}`
    );
    dispatch({
      type: ADD_ITEM_WISHLIST,
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
    localStorage.setItem(
      "wishlist",
      JSON.stringify(getState().wishlist.wishlistItems)
    );
  };
export const moveItemToWishlist = (item) => async (dispatch, getState) => {
  dispatch({
    type: MOVE_ITEM_FROM_WISHLIST,
    payload: item,
  });
  localStorage.setItem(
    "wishlist",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};
