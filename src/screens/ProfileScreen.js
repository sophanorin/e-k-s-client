import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { updateUserProfile } from "../actions/userActions";
import * as profilestyles from "./ProfileScreen.module.css";

function AccountScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    error: errorUpdate,
    success: successUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phone);
    }
  }, [dispatch, user, userInfo._id]);

  const updateUserInfoHandler = () => {
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({ userId: user._id, name, email, password, phone })
      );
    }
  };
  return (
    <div className={profilestyles.account}>
      <h1>Profile</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className={profilestyles.accounts_container}>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox>{errorUpdate}</MessageBox>}
          {successUpdate && (
            <MessageBox success="success">
              Profile Updated Successfully
            </MessageBox>
          )}
          <ul>
            <li>
              <label htmlFor="name">Username</label>
              <input
                id="name"
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </li>
            <li>
              <label>Email</label>

              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li>
              <label>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Passwords"
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="passwordConfirm">ConfirmPassword</label>

              <input
                id="passwordConfirm"
                type="password"
                placeholder="ConfirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </li>
            <li>
              <button type="submit" onClick={() => updateUserInfoHandler()}>
                Update
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountScreen;
