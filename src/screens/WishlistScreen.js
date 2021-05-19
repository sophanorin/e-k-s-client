import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartAction";
import { moveItemToWishlist } from "../actions/wishlistAction";
import MessageBox from "../components/MessageBox";
import * as wishlistStyle from "./WishlistScreen.module.css";
function WishlistScreen() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const moveItemHandler = (item) => {
    dispatch(moveItemToWishlist(item));
    dispatch(addToCart(item.product, 1));
  };
  return (
    <div className={wishlistStyle.wishlist}>
      <h1>Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <MessageBox>
          Wishlist is Empty.
          <Link to="/shop">Go Shopping</Link>
        </MessageBox>
      ) : (
        wishlistItems.map((item) => (
          <li key={item.product}>
            <div className={wishlistStyle.card_order}>
              <div className={wishlistStyle.col_1}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className={wishlistStyle.col_2}>
                <h3>$ {item.price}</h3>
              </div>
              <div
                className={`${wishlistStyle.col_3} ${wishlistStyle.flex_row}`}
              >
                <button
                  type="button"
                  className={wishlistStyle.wishlist_btn}
                  onClick={() => moveItemHandler(item)}
                >
                  Move To Cart
                </button>
              </div>
            </div>
          </li>
        ))
      )}
    </div>
  );
}

export default WishlistScreen;
