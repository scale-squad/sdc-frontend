import React from 'react';
import Slider from './Slider.jsx';
const SizeComfort = ({characteristics}) => {
  const maxWidth = 270
  const {Comfort,Fit,Length,Quality} = characteristics;
  console.log(characteristics)
  const fitSegments = ['Too Small','Perfect','Too Large'];
  const comfortSegments =['Poor','','','Perfect'];
  // const megaSegments =new Array(10).fill().map((x,i)=>String.fromCharCode(97+i));
  // <Slider segments={megaSegments} value={Comfort.value} title={"Mega"}/>
  return (
    <div className="size-comfort">
      <Slider segments={fitSegments} value={Fit.value} title={"Size"}/>
      <Slider segments={comfortSegments} value={Comfort.value} title={"Comfort"}/>
    </div>
  )
};
export default SizeComfort;