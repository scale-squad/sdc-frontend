import React from 'react';
const Slider = ({ segments, value, title, maxWidth = 270 }) => {
  const arrowPosition = Math.floor((value-1) / 4 * maxWidth);
  const arrowStyle={position:"relative",left:`${arrowPosition}px`,fontSize:15,width:0};
  const downArrow = <p style={arrowStyle}>&#9660;</p>
  const spaces = segments.length - 1;
  const spaceBetween = 5;
  const halfSpace = Math.floor(spaceBetween / 2);
  const spaceLength = spaces * spaceBetween;
  const remainingWidth = maxWidth - spaceLength;
  const singleSegmentWidth = Math.floor(remainingWidth / segments.length);
  const style = { 'width': `${singleSegmentWidth}px`, marginRight: halfSpace, marginLeft: halfSpace };
  const rightStyle = { ...style, marginRight: 0 };
  const leftStyle = { ...style, marginLeft: 0 };
  console.log(value);
  return (
    <div className="slider">
      <div className="slider-title">{title}</div>
      <div style={{width:maxWidth}}>{downArrow}</div>
      <table >
        <tr>
      {
        segments.map((seg, i) => {
          let currStyle = style;
          if (i === 0) currStyle = leftStyle;
          else if (i === segments.length - 1) currStyle = rightStyle;
          return <td className="slider-segment" style={currStyle}></td>
        })

      }</tr><tr>{
        segments.map((seg, i) => {
          let currStyle = style;
          if (i === 0) currStyle = leftStyle;
          else if (i === segments.length - 1) currStyle = rightStyle;
          return <td className="slider-label" style={currStyle}>{seg}</td>
        })
      }
      </tr>
      </table>

    </div>
  )
};
export default Slider;