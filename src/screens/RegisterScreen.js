import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import * as signinStyles from "./SignInScreen.module.css";

function SigninScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [primaryMessage, setPrimaryMessage] = useState("");
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error, loading } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    setPrimaryMessage("");
    if (password.length > 8) {
      if (password !== confirmPassword) {
        alert("Password and confirm password are not match");
      } else {
        dispatch(register(name, email, password, phoneNumber));
      }
    } else {
      setPrimaryMessage("Password at least contains 8 digits.");
    }
  };

  useEffect(() => {
    if (userInfo) props.history.push(redirect);
  }, [redirect, userInfo, props.history]);

  return (
    <div className={signinStyles.form_container}>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error ||
          (primaryMessage && (
            <MessageBox>{error || primaryMessage}</MessageBox>
          ))}
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          />
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
          <label htmlFor="comfirmPassword">Comfirm Password : </label>
          <input
            type="password"
            id="comfirmPassword"
            placeholder="Enter Comfirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number : </label>
          <input
            type="text"
            id="phone"
            placeholder="Enter phone number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <button className={signinStyles.signin_btn} type="submit">
            Create Account
          </button>
        </div>
        <div>
          <div>
            Already have an account? <Link to="/signin">SignIn</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
