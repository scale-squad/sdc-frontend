/*import React from 'react';
const StarSelection = ({ val, setVal }) => {
  val = val || 0;
  const full = "../../icons/star-full.svg";
  const empty = "../../icons/star-empty.svg";
  const fullStars = Number(val);
  const emptyStars = 5 - fullStars;
  const fullArray = new Array(fullStars).fill();
  let emptyArray = new Array(emptyStars).fill()
  const handleClick = (e) => {
    if (!setVal) { return console.warn('no setVal defined for StarSelection so star selection is read-only') }
    const clickValue = e.target.dataset.value;
    if (clickValue !== val) {
      setVal(clickValue);
    }
  }
  return (<span>
    {
      fullArray.map((star, i) => <img data-value={i + 1} key={i + 1} src={full} onClick={handleClick} />)
    }
    {
      emptyArray.map((star, i) => <img data-value={fullArray.length + i + 1} key={fullArray.length + i + 1} src={empty} onClick={handleClick} />)
    }
    {
      ['Poor', 'Fair', 'Average', 'Good', 'Great'][fullStars-1]
    }
  </span>)
}
export default StarSelection*/
