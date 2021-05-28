import React, { useEffect } from "react";
import { detailOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import * as orderdetailStyles from "./OrderDetailScreen.module.css";

function OrderDetailScreen(props) {
  const orderID = props.match.params.id;
  const infoOrder = useSelector((state) => state.infoOrder);
  const { error, loading, orderInfo } = infoOrder;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailOrder(orderID));
  }, [orderID, dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className={orderdetailStyles.orderdetail_wrapper}>
          <div
            className={`${orderdetailStyles.col_1} ${orderdetailStyles.shadow}`}
          >
            <div className={orderdetailStyles.payment_detail}>
              <h2>Payment </h2>
              <div className={orderdetailStyles.payment_info}>
                <h3>Method : {orderInfo.paymentMethod}</h3>
                <p>
                  Status :{" "}
                  <span
                    className={`${orderdetailStyles.payment_status} ${
                      orderInfo.isPaid
                        ? orderdetailStyles.paid
                        : orderdetailStyles.notpaid
                    }`}
                    id="paid"
                  >
                    {orderInfo.isPaid ? "Piad" : "Haven't paid"}
                  </span>
                </p>
              </div>
            </div>
            <div className={orderdetailStyles.orders_detail}>
              <h2>Order Details</h2>
              <h3>{orderInfo.orderItems.length} items in cart</h3>
              <ul>
                {orderInfo.orderItems.map((item) => (
                  <li key={item.product}>
                    <div className={orderdetailStyles.card_orderdetail}>
                      <div className={orderdetailStyles.col_1}>
                        <img src={item.image} alt={item.title} />
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                      <div className={orderdetailStyles.col_2}>
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
          <div className={orderdetailStyles.col_2}>
            <div className={orderdetailStyles.summary_detail}>
              <h2>Summary</h2>
              <ul>
                <li>
                  <p>Items Price</p>
                  <p>$ {orderInfo.itemsPrice}</p>
                </li>
                <li>
                  <p>Tax Price</p>
                  <p>$ {orderInfo.taxPrice}</p>
                </li>
                <li>
                  <p>Delivery Price</p>
                  <p>$ {orderInfo.deliveryPrice}</p>
                </li>
                <li>
                  <p>
                    <strong> Total Price</strong>
                  </p>
                  <p>
                    <strong> $ {orderInfo.totalPrice.toFixed(2)}</strong>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetailScreen;
