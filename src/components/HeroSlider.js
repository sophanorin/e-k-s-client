import React from "react";
import * as sliderStyles from "./HeroSlider.module.css";
import { Link } from "react-router-dom";

function HeroSlider({ product }) {
  return (
    <div className={sliderStyles.hero_center}>
      <div className={sliderStyles.col_1}>
        <p>New Inspiration 2021</p>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <Link to={`/products/${product._id}`}>View</Link>
      </div>
      <div className={sliderStyles.col_2}>
        <img src={product.image} alt={product.title} />
      </div>
    </div>
  );
}

export default HeroSlider;
