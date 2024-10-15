import React from 'react';
const RatingGraph = ({ ratings, width = 270, setStarFilter, starFilter }) => {
  if (typeof ratings !== 'object') { return <div>Cannot Display Element</div> }
  const allFiltersEnabled = starFilter.every(enabled => !enabled);
  const totalCount =
    Object
      .values(ratings)
      .reduce((sum, x) => sum + Number(x), 0);

  const ratingCounts =
    new Array(5)
      .fill()
      .map((rating, i) => ratings[5 - i] || 0);

  const toggleSelectedStar = (starNumber) => {
    const newStarFilter = starFilter.slice();
    newStarFilter[starNumber - 1] = !newStarFilter[starNumber - 1];
    setStarFilter([]);
    setStarFilter(newStarFilter);
  }

  const handleRemoveFilters = () => {
    setStarFilter([false,false,false,false,false]);
  }

  return (<div>
    {
      ratingCounts.map((count, i) => {

        const starNumber = 5 - i;
        const fullWidth = Math.floor(count / totalCount * width);
        const emptyWidth = width - fullWidth;
        const fullStyle = { width: fullWidth, position: "relative" }
        const emptyStyle = { width: emptyWidth }

        return (<div key={i}
          className={!allFiltersEnabled && starFilter[starNumber - 1] ? 'star-breakdown-selected' : 'star-breakdown'}
          onClick={() => toggleSelectedStar(starNumber)} >
          <p className={'star-graph-label'}>{starNumber} stars</p>

          <div className={'star-graph-full'} style={fullStyle}></div>
          {width > 250 ?
            <span>
              <div className={'star-graph-empty'} style={emptyStyle}>
              </div>
              <span>
                {count}
              </span>
            </span>
            : ""
          }

        </div>)
      })}
    {
      starFilter ? starFilter.map((x, i) => starFilter && x ? <div key ={i}>{i + 1} stars Filter enabled </div> : "") : ""
    }
    {
      starFilter.some(x=>x)?

        <div > <a href="" onClick={handleRemoveFilters}>Remove Filters</a></div> : ""
    }

  </div >
  )
};

export default RatingGraph;