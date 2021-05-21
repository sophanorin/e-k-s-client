import React from "react";
import { Link } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signout } from "../actions/userActions";
import * as footerStyles from "./Footer.module.css";
function Footer() {
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <>
      <div className={footerStyles.footer}>
        <div className={footerStyles.footer__top}>
          <div className={footerStyles.footer_top__box}>
            <h3>INFORMATION</h3>
            <Link>About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <a href="https://g.page/num-edu-kh?share" target="blank">
              Site Map
            </a>
          </div>
          <div className={footerStyles.footer_top__box}>
            <h3>MY ACCOUNT</h3>
            <Link to="/profile">My Account</Link>
            <Link to="/cart">View Order</Link>
            <Link to="/ordershistory">Order History</Link>
            <Link to="/wishlist">Wish List</Link>
            <Link to="#signout" onClick={signoutHandler}>
              Logout
            </Link>
          </div>
          <div className={footerStyles.footer_top__box}>
            <h3>CONTACT US</h3>
            <div>
              <span>
                <GoLocation />
              </span>
              St.96 Christopher Howes, Khan Daun Penh, BS16 AP18 Phnom Penh,
              Cambodia.
            </div>
            <div>
              <span>
                <AiOutlineMail />
              </span>
              eks@shop.com
            </div>
            <div>
              <span>
                <FiPhone />
              </span>
              099-99-99-99
            </div>
            <div>
              <span>
                <FaRegPaperPlane />
              </span>
              Dream City, Cambodia
            </div>
          </div>
        </div>
      </div>
      <div className={footerStyles.footer__bottom}>
        <div className={footerStyles.footer_bottom__box}></div>
        <div className={footerStyles.footer_bottom__box}></div>
      </div>
    </>
  );
}

export default Footer;
