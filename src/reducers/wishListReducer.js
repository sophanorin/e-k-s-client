import {
  ADD_ITEM_WISHLIST,
  MOVE_ITEM_FROM_WISHLIST,
} from "../constants/wishlistConstants";

export const wishlistReducer = (
  state = { cartItems: [], wishlistItems: [] },
  action
) => {
  switch (action.type) {
    case ADD_ITEM_WISHLIST:
      const item = action.payload;
      const existItem = state.wishlistItems.find(
        (x) => x.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, wishlistItems: [...state.wishlistItems, item] };
      }

    case MOVE_ITEM_FROM_WISHLIST:
      const wishlistProduct = action.payload;
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (x) => x.product !== wishlistProduct.product
        ),
      };

    default:
      return state;
  }
};
