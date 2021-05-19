import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productdetailStyles from "./ProductDetial.module.css";
import { detialProduct } from "../actions/productActions";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { removeFromCart } from "../actions/cartAction";
import { addItemWishlist } from "../actions/wishlistAction";

function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const copyLink = () => {
    let str = "https://numstore.netlify.app" + props.location.pathname;
    const tmp = document.createElement("textarea");
    tmp.value = str;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("Copy");
  };

  useEffect(() => {
    dispatch(detialProduct(productId));
  }, [dispatch, productId]);
  const addToWishlistHandler = (id) => {
    dispatch(addItemWishlist(id, qty));
    dispatch(removeFromCart(id));
  };
  return (
    <section className={productdetailStyles.productDetial_wrapper}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <div className={productdetailStyles.wrapper}>
            <div className={productdetailStyles.wrapper_img}>
              <img src={product.image} alt={product.title} />
            </div>
            <div className={productdetailStyles.product_info}>
              <h3>{product.title}</h3>
              <span className={productdetailStyles.product_category}>
                Category :<Link to="/shop">{product.category}</Link>
              </span>
              <p>Description : {product.description}</p>
              <div className="stock">
                {product.countInStock > 0 ? (
                  <p>
                    Availablity
                    <span>{product.countInStock} in stock</span>
                  </p>
                ) : (
                  <p className={productdetailStyles.stock_unavailable}>
                    Unavailablity
                  </p>
                )}
              </div>
              <h3 className={productdetailStyles.product_price}>
                $ {product.price}
              </h3>
              <div className={productdetailStyles.cart}>
                <div className={productdetailStyles.product_quantity}>
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className={`${productdetailStyles.add_to_cart} ${
                    product.countInStock === 0
                      ? productdetailStyles.not_allowed
                      : ""
                  }`}
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                >
                  <AiOutlineShoppingCart /> Add to cart
                </button>
              </div>
              <div className={productdetailStyles.wishlist_icon}>
                <button onClick={() => addToWishlistHandler(productId)}>
                  <FiHeart />
                  Wishlist
                </button>
              </div>

              <div className={productdetailStyles.product_meta}>
                <span className={productdetailStyles.tagged}>
                  Tag :
                  <Link to={`product/${product.category}`}>
                    {product.category}
                  </Link>
                </span>
              </div>
              <div className={productdetailStyles.sharing}>
                <h4 className={productdetailStyles.heading_share}>
                  Share this product
                </h4>
                <div className={productdetailStyles.share_links}>
                  <ul>
                    <li>
                      <a
                        onClick={copyLink}
                        href="#"
                        title="Facebook"
                        className="facebook social_icons"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={copyLink}
                        href="#"
                        title="Twitter"
                        className="facebook social_icons"
                      >
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={copyLink}
                        href="#"
                        title="Telegram"
                        className="facebook social_icons"
                      >
                        <FaTelegramPlane />
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={copyLink}
                        href="#"
                        title="Email"
                        className="facebook social_icons"
                      >
                        <MdEmail />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ProductScreen;
