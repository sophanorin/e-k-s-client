import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react/cjs/react.production.min";
import { listProducts, productPerPage } from "../actions/productActions";
import * as paginationStyles from "./Pagination.module.css";
import { PAGINATION_STATE } from "../constants/productConstants.js";

const FindMaxLeftAndMaxRight = (currentPage, amountBtn, pages) => {
  let maxLeft = currentPage - Math.floor(amountBtn / 2);
  let maxRight = currentPage + Math.floor(amountBtn / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = amountBtn;
  }

  if (maxRight > pages) {
    maxLeft = pages - (amountBtn - 1);
    if (maxLeft < 1) {
      maxLeft = 1;
    }
    maxRight = pages;
  }

  return { maxLeft, maxRight };
};

function Pagination({ products, amountBtn, itemPerPage }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(Math.ceil(products.length / itemPerPage));
  let startIndex = (currentPage - 1) * itemPerPage;
  let endIndex = startIndex + itemPerPage;

  const { maxLeft, maxRight } = FindMaxLeftAndMaxRight(
    currentPage,
    amountBtn,
    pages
  );

  let btns = [];
  for (var i = maxLeft; i <= maxRight; i++) {
    btns.push(i);
  }

  useEffect(() => {
    dispatch(productPerPage(startIndex, endIndex));
    dispatch({ type: PAGINATION_STATE, payload: { startIndex, endIndex } });
  }, [currentPage]);

  return (
    <div className={paginationStyles.paginationContainer}>
      {currentPage != 1 && (
        <button
          className={`${paginationStyles.button} ${paginationStyles.btn_side}`}
          onClick={() => setCurrentPage(1)}
        >
          &#171;First
        </button>
      )}

      {btns.map((page) => (
        <button
          key={page}
          className={`${paginationStyles.button} ${
            currentPage === page && paginationStyles.active
          }`}
          onClick={(e) => setCurrentPage(Number(e.target.outerText))}
        >
          {page}
        </button>
      ))}
      {currentPage != pages && (
        <button
          className={`${paginationStyles.button} ${paginationStyles.btn_side}`}
          onClick={() => setCurrentPage(pages)}
        >
          Last&#187;
        </button>
      )}
    </div>
  );
}

export default memo(Pagination);
