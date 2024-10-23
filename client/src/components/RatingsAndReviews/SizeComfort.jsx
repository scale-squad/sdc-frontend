import React from 'react';
import Slider from './Slider.jsx';
const SizeComfort = ({ characteristics, width = 270 }) => {
  if (!characteristics) return (<div>Error Loading Component</div>)
  const { Comfort, Fit, Length, Quality, Size } = characteristics;
  const WidthValue = characteristics.width;

  const sizeSegments = ['Too Small', 'Perfect', 'Too Large'];
  const widthSegments = ['Too Narrow', 'Perfect', 'Too Wide'];
  const comfortSegments = ['Uncomfortable', 'OK', 'Perfect'];
  const qualitySegments = ['Poor', 'OK', 'Perfect'];
  const lengthSegments = ['Runs short', 'Perfect', 'Runs long'];
  const fitSegments = ['Runs tight', 'Perfect', 'Runs long'];

  return (
    <div className="size-comfort">
      {Size ? <Slider segments={sizeSegments} value={Size.value} title={"Size"} width={width / 3} /> : ""}
      {WidthValue ? <Slider segments={widthSegments} value={WidthValue.value} title={"Width"} width={width / 3} /> : ""}
      {Comfort ? <Slider segments={comfortSegments} value={Comfort.value} title={"Comfort"} width={width / 3} /> : ""}
      {Quality ? <Slider segments={qualitySegments} value={Quality.value} title={"Quality"} width={width / 3} /> : ""}
      {Length ? <Slider segments={lengthSegments} value={Length.value} title={"Length"} width={width / 3} /> : ""}
      {Fit ? <Slider segments={fitSegments} value={Fit.value} title={"Fit"} width={width / 3} /> : ""}
    </div>
  )
};
export default SizeComfort;