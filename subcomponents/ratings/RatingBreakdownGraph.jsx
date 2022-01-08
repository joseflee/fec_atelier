import React from 'react';

var RatingBreakdownGraph = (props) => {
  // console.log('meta: ', props.ratingsMeta);

  var populateRatings = (props) => {
    // console.log('meta: ', meta);
    var total = props.reviewCount;
    // iterate over ratings
    // get width by dividing current value by total
    // set width of corresponding innerBar
  };

  populateRatings(props);

  return (
    <div className="ratingGraph">
      <div className="ratingContainer">
        <label className="breakdownLabel" htmlFor="outerBar5" onClick={props.filterByStars}>5 stars</label>
        <div className="outerBar" id="outerBar5">
          <div className="innerBar" id="innerBar5"></div>
        </div>
      </div>

      <div className="ratingContainer">
        <label className="breakdownLabel" htmlFor="outerBar4" onClick={props.filterByStars}>4 stars</label>
        <div className="outerBar" id="outerBar4">
          <div className="innerBar" id="innerBar4"></div>
        </div>
      </div>

      <div className="ratingContainer">
        <label className="breakdownLabel" htmlFor="outerBar3" onClick={props.filterByStars}>3 stars</label>
        <div className="outerBar" id="outerBar3">
          <div className="innerBar" id="innerBar3"></div>
        </div>
      </div>

      <div className="ratingContainer">
        <label className="breakdownLabel" htmlFor="outerBar2" onClick={props.filterByStars}>2 stars</label>
        <div className="outerBar" id="outerBar2">
          <div className="innerBar" id="innerBar2"></div>
        </div>
      </div>

      <div className="ratingContainer">
        <label className="breakdownLabel" htmlFor="outerBar1" onClick={props.filterByStars}>1 stars</label>
        <div className="outerBar" id="outerBar1"></div>
        <div className="innerBar" id="innerBar1"></div>
      </div>
    </div>
  )
}

// when rating is clicked
// filter function is called to rerender reviewlist

export default RatingBreakdownGraph;