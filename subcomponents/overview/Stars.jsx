import React from 'react';
import ratingToStar from '../../modules/stars.js';

var Stars = (props) => {

  // Uncomment when receiving rating props
  var rating = ratingToStar(props.rating);

  //var rating = ratingToStar(4);

  return (

    <div>
      <a href={'#reviewsSection'}>
        <div className={'stars-outer'}>
        <div className={'stars-inner'} style={{ width: rating }}></div>
        </div>
      </a>
      <a href={'#reviewsSection'} className={'readAllReviews'}>read all reviews</a>
    </div>

  )

}


export default Stars;