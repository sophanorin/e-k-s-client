import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import * as productsStyles from "./Products.module.css";
import { productPerPage } from "../actions/productActions";
import { memo } from "react/cjs/react.production.min";

function Products() {
  const dispatch = useDispatch();

  const productInPage = useSelector((state) => state.productInPage);

  const { error, products, loading } = productInPage;

  useEffect(() => {
    dispatch(productPerPage(0, 8));
  }, [dispatch]);

  return (
    <div className={productsStyles.wrapper_products}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <div className={productsStyles.header_productslist}>
            <h2>Quality Products</h2>
            <span>PROFESSIONAL</span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div
            className={`${productsStyles.op} ${productsStyles.category__center}`}
          >
            {products.map((product, index) => {
              return <Product key={product._id} product={product} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(Products);
