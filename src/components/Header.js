import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { FiShoppingCart, FiHeart, FiMenu, FiUser } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { RiHistoryFill } from "react-icons/ri";
import { AiOutlineMacCommand, AiOutlineFilter } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiProductHuntLine, RiDashboardLine } from "react-icons/ri";
import * as headerStyles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";

function Header(props) {
  const [toggle, setToggle] = useState(false);
  const [dropdownProfile, setDropdownProfile] = useState(false);
  const [dropdownAdmin, setDropdownAdmin] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const toggleLinks = () => {
    setToggle(!toggle);
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const user = useSelector((state) => state.userSignin);
  const { userInfo } = user;
  const signoutHandler = () => {
    dispatch(signout());
    setDropdownProfile(false);
  };

  useEffect(() => {
    if (toggle) document.body.classList.add("active");
    else document.body.classList.remove("active");
  }, [toggle]);
  return (
    <div className={`${headerStyles.navigation} ${headerStyles.header}`}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.nav}>
          <div className={headerStyles.nav__hamburger} onClick={toggleLinks}>
            <FiMenu />
          </div>

          <div className={headerStyles.nav__logo}>
            <Link to="/">
              <h1>K.E.S</h1>
            </Link>
          </div>

          <div
            className={`${headerStyles.nav__menu} ${
              toggle ? headerStyles.open : ""
            }`}
            ref={menuRef}
          >
            <div className={headerStyles.menu__top}>
              <button
                className={headerStyles.close_button}
                onClick={toggleLinks}
              >
                <GrClose />
              </button>
            </div>
            <ul className={headerStyles.nav__list}>
              <li className={headerStyles.nav__item}>
                <Link
                  to="/"
                  className={headerStyles.nav__link}
                  onClick={toggleLinks}
                >
                  Home
                </Link>
              </li>
              <li className={headerStyles.nav__item}>
                <Link
                  to="/shop"
                  className={headerStyles.nav__link}
                  onClick={toggleLinks}
                >
                  Shop
                </Link>
              </li>
              <li className={headerStyles.nav__item}>
                <Link
                  to="/blogs"
                  className={headerStyles.nav__link}
                  onClick={toggleLinks}
                >
                  Blog
                </Link>
              </li>
              <li className={headerStyles.nav__item}>
                <Link
                  to="/contact"
                  className={headerStyles.nav__link}
                  onClick={toggleLinks}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className={headerStyles.nav__icons}>
            {userInfo && userInfo.isAdmin && (
              <div
                className={headerStyles.profile}
                onMouseEnter={() => setDropdownAdmin(true)}
                onMouseLeave={() => {
                  setDropdownAdmin(false);
                }}
              >
                <Link to="/admin" className={headerStyles.icon__item}>
                  <AiOutlineMacCommand />
                </Link>
                {dropdownAdmin && (
                  <div className={headerStyles.dropdown_profile}>
                    <div className={headerStyles.profile_menu}>
                      <ul>
                        <li>
                          <Link to="/dashboard">
                            <RiDashboardLine /> Dashboard
                          </Link>{" "}
                        </li>
                        <li>
                          <Link to="/productlist">
                            <RiProductHuntLine /> Products
                          </Link>{" "}
                        </li>
                        <li>
                          <Link to="/categorylist">
                            <AiOutlineFilter /> Category
                          </Link>{" "}
                        </li>
                        <li>
                          <Link to="/orderlist">
                            <HiOutlineClipboardList /> Orders
                          </Link>{" "}
                        </li>
                        <li>
                          <Link to="/userlists">
                            <CgProfile /> Users
                          </Link>{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div
              className={headerStyles.profile}
              onMouseEnter={() => setDropdownProfile(true)}
              onMouseLeave={() => {
                setDropdownProfile(false);
              }}
            >
              <Link
                to={userInfo ? "/profile" : "/signin"}
                className={headerStyles.icon__item}
              >
                <FiUser />
              </Link>
              {dropdownProfile &&
                (userInfo ? (
                  <div className={headerStyles.dropdown_profile}>
                    <div>
                      <div className={headerStyles.profile_image}>
                        {/* <img src={""} alt="" /> */}
                      </div>
                      <h2>{userInfo.name.substring(0, 10) + "..."}</h2>
                    </div>
                    <span className={headerStyles.seperater}></span>
                    <div className={headerStyles.profile_menu}>
                      <ul>
                        <li>
                          <Link to="/profile">
                            <CgProfile /> Profile
                          </Link>{" "}
                        </li>
                        <li>
                          <Link to="/cart">
                            <HiOutlineClipboardList /> View Orders
                          </Link>{" "}
                        </li>
                        <li>
                          <Link to="/wishlist">
                            <FiHeart /> My Wishlist
                          </Link>{" "}
                        </li>
                        <li>
                          <Link to="/ordershistory">
                            <RiHistoryFill /> View History
                          </Link>{" "}
                        </li>
                        <li>
                          <Link to="#signout" onClick={signoutHandler}>
                            <BiLogOut /> Log Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div
                    className={headerStyles.profile_login}
                    onMouseEnter={() => setDropdownProfile(true)}
                  >
                    <h2>Welcome To NUM STORE</h2>
                    <Link to="/signin">Sign in / Register</Link>
                  </div>
                ))}
            </div>

            <Link to="/wishlist" className={headerStyles.icon__item}>
              <FiHeart />
            </Link>

            <Link to="/cart" className={headerStyles.icon__item}>
              <FiShoppingCart />
              <span className={headerStyles.cart__total}>
                {cartItems.length}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
