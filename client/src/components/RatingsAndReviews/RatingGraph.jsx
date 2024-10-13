import React from 'react';
const RatingGraph = ({ ratings ,width=270}) => {
  console.log(width)
  if (typeof ratings !== 'object') { return <div>Cannot Display Element</div> }
  const totalCount = Object.values(ratings).reduce((sum, x) => sum + Number(x), 0);
  const ratingCounts = new Array(5).fill().map((rating, i) => ratings[5 - i] || 0);
  return (<div>
    {
      ratingCounts.map((count, i) => {
        const fullWidth = Math.floor(count / totalCount * width);
        const emptyWidth = width - fullWidth;
        const fullStyle = { width: fullWidth }
        const emptyStyle = { width: emptyWidth }
        return <div key={2 << (7 + i) + count}>
          <p className={'star-graph-label'}>{5 - i} stars</p><span className={'star-graph-full'} style={fullStyle}></span>
          <span className={'star-graph-empty'} style={emptyStyle}></span>
          <span>{count}</span>
        </div>
      })}
  </div>
  )
};

export default RatingGraph;