import React, { useEffect, useState } from "react";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import HeroSlider from "../components/HeroSlider.js";
import Slider from "react-slick";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import * as shopStyles from "./ShopScreen.module.css";
import Product from "../components/Product";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import { memo } from "react/cjs/react.production.min";

function ShopScreen() {
  const [filters, setFilters] = useState({ search: "", category: "" });
  const dispatch = useDispatch();

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

  const FilterHandler = (values) => {
    const newFilter = { ...filters, ...values };
    setFilters(newFilter);
  };

  useEffect(() => {
    dispatch(listProducts());
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
              {/* Start filter section*/}

              <Filter FilterHandle={(values) => FilterHandler(values)} />

              {/* End filter section */}

              {/* Start list down product */}

              <div className={shopStyles.products_list}>
                <div className={shopStyles.category__center}>
                  {products
                    .filter((product) => {
                      return (
                        (product.title
                          .toLowerCase()
                          .includes(filters.search.toLowerCase()) ||
                          product.description
                            .toLowerCase()
                            .includes(filters.search.toLowerCase())) &&
                        product.category
                          .toLowerCase()
                          .includes(filters.category.toLowerCase())
                      );
                    })
                    .slice(paginationState.startIndex, paginationState.endIndex)
                    .map((product) => {
                      return <Product key={product._id} product={product} />;
                    })}
                </div>

                {/* End list down product */}

                {/* Start Pagination */}

                <Pagination
                  products={products}
                  amountBtn={5}
                  itemPerPage={12}
                />

                {/* End Pagination */}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default memo(ShopScreen);
