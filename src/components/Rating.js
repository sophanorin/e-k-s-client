import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
function Rating({ rating }) {
  return (
    <>
      <i>
        {rating >= 1 ? (
          <AiFillStar />
        ) : rating >= 0.5 ? (
          <BsStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </i>
      <i>
        {rating >= 2 ? (
          <AiFillStar />
        ) : rating >= 1.5 ? (
          <BsStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </i>
      <i>
        {rating >= 3 ? (
          <AiFillStar />
        ) : rating >= 2.5 ? (
          <BsStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </i>
      <i>
        {rating >= 4 ? (
          <AiFillStar />
        ) : rating >= 3.5 ? (
          <BsStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </i>
      <i>
        {rating >= 5 ? (
          <AiFillStar />
        ) : rating >= 4.5 ? (
          <BsStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </i>
    </>
  );
}

export default Rating;
