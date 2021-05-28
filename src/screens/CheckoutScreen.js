import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderAction.js";
import { CREATE_ORDER_RESET } from "../constants/orderConstants.js";
import MessageBox from "../components/MessageBox.js";
import LoadingBox from "../components/LoadingBox.js";
import * as checkoutStyles from "./CheckoutScreen.module.css";

function Checkout(props) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) props.history.push("/signin");
  if (!cart) props.history.push("/");

  const Order = useSelector((state) => state.Order);
  const { loading, error, success, order } = Order;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.taxPrice = toPrice(0.0005 * cart.itemsPrice);
  cart.deliveryPrice = cart.itemsPrice >= 20 ? 0 : 0.1;
  cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.deliveryPrice;
  const completeCheckoutHandler = () => {
    dispatch(createOrder({ ...cart, paymentMethod: paymentMethod }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [dispatch, success, props.history, order]);

  return (
    <div className={checkoutStyles.checkout_wrapper}>
      <div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox>{error}</MessageBox>}
        <div className={checkoutStyles.payment}>
          <h2>Payment Method</h2>
          <div>
            <input
              type="radio"
              id="cash"
              value="Cash"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cash">Cash (Recomment)</label>
          </div>
          <div>
            <input
              type="radio"
              id="aba"
              value="ABA"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="aba">ABA</label>
          </div>
        </div>
        <div className={checkoutStyles.order_details}>
          <h2>Order Details</h2>
          <h3>{cart.cartItems.length} items in cart</h3>
          <ul>
            {cart.cartItems.map((item) => (
              <li key={item.product}>
                <div className={checkoutStyles.card_order}>
                  <div className={checkoutStyles.col_1}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>

                  <div className={checkoutStyles.col_2}>
                    <h3>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={checkoutStyles.summary}>
        <h2>Summary</h2>
        <ul>
          <li>
            <p>Items Price</p>
            <p>$ {cart.itemsPrice}</p>
          </li>
          <li>
            <p>Tax Price</p>
            <p>$ {cart.taxPrice}</p>
          </li>
          <li>
            <p>Delivery Price</p>
            <p>$ {cart.deliveryPrice}</p>
          </li>
          <li>
            <strong> Total Price</strong>
            <strong> $ {cart.totalPrice.toFixed(2)}</strong>
          </li>
        </ul>
        <button onClick={completeCheckoutHandler}>Preceed Payment</button>
      </div>
    </div>
  );
}

export default Checkout;
