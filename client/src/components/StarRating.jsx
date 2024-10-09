import React from 'react'
const StarRating = ({ rating, enableText = false, dimensions = 5 }) => {
  if (rating === undefined || rating === null) { return <div>Error Loading Stars</div>; }
  rating = Number(rating);

  const quarter = "./icons/star-one-quarter.svg";
  const half = "./icons/star-half.svg";
  const threeQuarter = "./icons/star-three-quarter.svg";
  const full = "./icons/star-full.svg";
  const empty = "./icons/star-empty.svg";

  const fullStarCount = Math.floor(rating);
  const emptyCount = Math.floor(5 - rating)
  const remaining = (rating % 1);
  const roundedRating = Math.floor(rating) + Math.round(remaining * 4) / 4;
  const fullStars = new Array(fullStarCount).fill();
  const emptyStars = new Array(emptyCount).fill();
  const topStyle = { 'verticalAlign': 'textTop', 'marginTop': dimensions * .75, width: dimensions, height: dimensions }
  let partialStar = empty;

  if (remaining <= 1 && remaining >= .875) partialStar = full;
  else if (remaining < .875 && remaining >= .625) partialStar = threeQuarter;
  else if (remaining < .625 && remaining >= .375) partialStar = half;
  else if (remaining < .375 && remaining >= .125) partialStar = quarter;

  return (<div>
    {enableText ? roundedRating : ""}
    {fullStars.map((star, i) => <img key={rating * i} src={"./icons/star-full.svg"} alt={"full star"} style={topStyle} />)}
    {remaining ? <img src={partialStar} style={topStyle} /> : ""}
    {emptyStars.map((star, i) => <img key={rating * i} src={"./icons/star-empty.svg"} alt={"full star"} style={topStyle} />)}
  </div>
  );
}
export default StarRating;