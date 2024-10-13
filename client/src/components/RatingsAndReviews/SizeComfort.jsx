import React from 'react';
import Slider from './Slider.jsx';
const SizeComfort = ({ characteristics, width }) => {

  const { Comfort, Fit, Length, Quality } = characteristics;
  const fitSegments = ['Too Small', 'Perfect', 'Too Large'];
  const comfortSegments = ['Poor', '', '', 'Perfect'];
  console.log(width);
  return (
    <div className="size-comfort">
      <Slider segments={fitSegments} value={Fit.value} title={"Size"} width={width/3} />
      <Slider segments={comfortSegments} value={Comfort.value} title={"Comfort"} width={width/3} />
    </div>
  )
};
export default SizeComfort;