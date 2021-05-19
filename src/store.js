import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { productPerPage } from "./actions/productActions";
import { cartReducer } from "./reducers/cartReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
  getSpecificCategoryReducer,
  listCategoryReducer,
} from "./reducers/categoryReducers";
import {
  createOrderReducer,
  detailOrderReducer,
  orderDeleteReducer,
  orderListReducer,
  orderMineListReducer,
} from "./reducers/orderReducer";
import {
  paginationStateReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetialReducer,
  productListReducer,
  productPerPageReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import { wishlistReducer } from "./reducers/wishListReducer";

const initialState = {
  wishlist: {
    wishlistItems: localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [],
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productInPage: productPerPageReducer,
  productDetail: productDetialReducer,
  paginationState: paginationStateReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  Order: createOrderReducer,
  infoOrder: detailOrderReducer,
  myOrderList: orderMineListReducer,
  wishlist: wishlistReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  categoryList: listCategoryReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  specificCategory: getSpecificCategoryReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
