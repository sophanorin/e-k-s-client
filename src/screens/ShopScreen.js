import React, { useEffect, useState } from "react";
import { listProducts, productPerPage } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import HeroSlider from "../components/HeroSlider.js";
import Slider from "react-slick";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import * as shopStyles from "./ShopScreen.module.css";
import Product from "../components/Product";
import { categorylist } from "../actions/categoryActions";
import Pagination from "../components/Pagination";
import { memo } from "react/cjs/react.production.min";

function ShopScreen() {
  const [price, setPrice] = useState(500);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const paginationState = useSelector((state) => state.paginationState);

  const productList = useSelector((state) => state.productList);
  const { error, products, loading } = productList;

  const settings = {
    dots: false,
    infinite: true,
    loop: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
  };

  const searchFilter = (product) => {
    if (
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return true;
    }
  };

  const categoryFilter = (product) => {
    if (
      product.category.toLowerCase() === filter.toLowerCase() ||
      (filter.toLowerCase() === "all" &&
        product.price > 0 &&
        product.price <= price)
    )
      return true;
  };

  useEffect(() => {
    dispatch(listProducts());
    dispatch(categorylist());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <div id="heroslider">
            <Slider {...settings}>
              {products.map((product, index) => {
                if (index === 5) return;
                return <HeroSlider key={product._id} product={product} />;
              })}
            </Slider>
          </div>
          <section>
            <div className={shopStyles.product_badge}>
              <h3>New Arrival</h3>
            </div>
            <div
              className={`${shopStyles.flex} ${shopStyles.products_section}`}
            >
              <div className={shopStyles.filter}>
                <ul>
                  <li>
                    <label htmlFor="search"> Search : </label>
                    <input
                      id="search"
                      placeholder="Search"
                      onKeyUp={(e) => setQuery(e.target.value)}
                    />
                  </li>
                  <li>
                    <label htmlFor="category">Category : </label>
                    <select
                      id="category"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option selected>All</option>
                      {categories &&
                        categories.map((category, index) => (
                          <option key={category._id}>{category.name}</option>
                        ))}
                    </select>
                  </li>
                  <li>
                    <label htmlFor="price">Price : </label>
                    <input
                      id="price"
                      type="range"
                      name="price"
                      min="0"
                      max="1000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      step="1"
                    />
                    <span>${price}</span>
                  </li>
                </ul>
              </div>
              <div className={shopStyles.products_list}>
                <div className={shopStyles.category__center}>
                  {products
                    .slice(paginationState.startIndex, paginationState.endIndex)
                    .map((product) => {
                      if (categoryFilter(product)) {
                        if (searchFilter(product))
                          return (
                            <Product key={product._id} product={product} />
                          );
                      }
                    })}
                </div>
                <Pagination products={products} amountBtn={5} itemPerPage={8} />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default memo(ShopScreen);
