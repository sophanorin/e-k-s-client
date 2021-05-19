import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import Product from "../components/Product";
import "../styles/ProductsSlider.css";

function ProductsSlider({ number }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://numstorerserver.herokuapp.com/api/products"
      );
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="header-productsslider">
        <span>NEW</span>
        <h2>New Arrivals</h2>
        <p>New Products just come with good quality</p>
      </div>
      <div className="product__slider">
        <article className="carousel_wrapper">
          <Slider {...settings}>
            {products.map((product, index) => {
              if (index === 5) return;
              return <Product key={product._id} product={product} />;
            })}
          </Slider>
        </article>
      </div>
    </>
  );
}

export default ProductsSlider;
