import React from 'react';
import ratingToStar from '../../modules/stars.js';

var Stars = (props) => {

  // Uncomment when receiving rating props
  var rating = ratingToStar(props.rating);
  // console.log("rating: ", rating);

  //var rating = ratingToStar(4);

  return (

    <div id="ratingBreakdownStars">
      <div className={'stars-outer'}>
      <div className={'stars-inner'} style={{ width: rating }}></div>
      </div>
    </div>

  )

}


export default Stars;