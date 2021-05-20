import React from "react";
import { Link } from "react-router-dom";
import * as homeStyles from "./Home.module.css";
import cover from "../assets/cover.jpg";

function Home() {
  return (
    <section className={homeStyles.container_home}>
      <img src={cover} alt="" />
      <div className={homeStyles.info}>
        <h2>E.K.S</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div className={homeStyles.control}>
          <Link to="/contact" className={homeStyles.contact}>
            Contact Us
          </Link>
          <Link to="/shop" className={homeStyles.shop}>
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
