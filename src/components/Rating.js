import React from "react";

const Rating = ({ rating, maxRating, starStyle, text }) => {
  const getFullStars = (rating) => {
    return Math.floor(rating);
  };
  const isHalfStar = (rating) => {
    return rating % 1 > 0;
  };
  const getDistributionOfStars = (rating) => {
    if (rating && rating !== undefined) {
      const amountFull = getFullStars(rating);
      const isHalf = isHalfStar(rating);
      const amountEmpty = maxRating - (amountFull + isHalf);
      return { amountFull, isHalf, amountEmpty };
    } else {
      return { amountFull: 0, isHalf: false, amountEmpty: maxRating };
    }
  };

  const { amountFull, isHalf, amountEmpty } = getDistributionOfStars(rating);

  return (
    <div>
      {Array.from(Array(amountFull)).map((el, i) => (
        <i key={i} style={{ ...starStyle }} className="fas fa-star" />
      ))}
      {isHalf && (
        <i style={{ ...starStyle }} className="fas fa-star-half-alt" />
      )}
      {Array.from(Array(amountEmpty)).map((el, i) => (
        <i key={i} style={{ ...starStyle }} className="far fa-star" />
      ))}
      {text && ` ${text}`}
    </div>
  );
};

Rating.defaultProps = {
  starStyle: { color: "#f8e825" },
  maxRating: 5,
};

export default Rating;
