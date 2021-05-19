import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";
import * as signinStyles from "./SignInScreen.module.css";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error, loading } = userSignin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) props.history.push(redirect);
  }, [redirect, userInfo, props.history]);
  return (
    <div className={signinStyles.form_container}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <form onSubmit={submitHandler} className={signinStyles.form}>
          <div>
            <h1>Sign In</h1>
            {error && <MessageBox>{error}</MessageBox>}
          </div>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={signinStyles.signin_btn} type="submit">
              Sign In
            </button>
          </div>
          <div>
            <div>
              New Customer? <Link to="/register">Create new account</Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SigninScreen;
