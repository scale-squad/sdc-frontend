import React from 'react';
const RatingGraph = ({ ratings, width = 270 }) => {
  if (typeof ratings !== 'object') { return <div>Cannot Display Element</div> }
  const totalCount = Object.values(ratings).reduce((sum, x) => sum + Number(x), 0);
  const ratingCounts = new Array(5).fill().map((rating, i) => ratings[5 - i] || 0);
  return (<div>
    {
      ratingCounts.map((count, i) => {
        const fullWidth = Math.floor(count / totalCount * width);
        const emptyWidth = width - fullWidth;
        const fullStyle = { width: fullWidth, position: "relative" }
        const emptyStyle = { width: emptyWidth }
        return <div key={2 << (7 + i) + count}>
          <p className={'star-graph-label'}>{5 - i} stars</p>

          <div className={'star-graph-full'} style={fullStyle}></div>
          {width > 250 ? <span><div className={'star-graph-empty'} style={emptyStyle}></div><span>{count}</span></span> : ""}

        </div>
      })}
  </div>
  )
};

export default RatingGraph;