import React from 'react';
const Slider = ({ segments, value, title, width }) => {
  console.log(width)
  if (value === undefined) { return <div>Error Loading Slider</div> }
  else if (value < 1 || value > 5) return <div>Value out of Bounds</div>
  const spaceBetween = 5;
  const arrowPosition = Math.floor((value - 1) / 4 * (width - 2 * spaceBetween) + spaceBetween);
  const arrowStyle = { position: "relative", left: `${arrowPosition}px`, fontSize: 15, width: 0 };
  const downArrow = <p style={arrowStyle}>&#9660;</p>
  const spaces = segments.length - 1;
  const spaceLength = spaces * spaceBetween;
  const remainingWidth = width - spaceLength;
  const singleSegmentWidth = Math.floor(remainingWidth / segments.length);
  const tableStyle = { borderSpacing: spaceBetween, width: width };

  return (
    <div className="slider">
      <div className="slider-title">{title}</div>
      <div style={{ width }}>{downArrow}</div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            {
              segments.map((seg, i) => <td key={seg + i + "val"} style={tableStyle} className="slider-segment" ></td>)

            }</tr><tr>
            {
              width / segments.length > 70 ?
                segments.map((seg, i) => <td key={seg + i + "label"} style={tableStyle} className="slider-label" >{seg}</td>)
                : ""
            }
          </tr>
        </tbody>
      </table>

    </div>
  )
};
export default Slider;