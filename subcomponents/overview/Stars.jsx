import React from 'react';
import ratingToStar from '../../modules/stars.js';

var Stars = (props) => {

  // Uncomment when receiving rating props
  var rating = ratingToStar(props.rating);

  var handleClick = () => {

    var click = {
      date: new Date(),
      element: 'anchor',
      module: 'Product Info'
    }

    props.trackClick(click);

  }


  return (

    <div>
      <a href={'#reviewsSection'} onClick={handleClick}>
        <div className={'stars-outer'}>
        <div className={'stars-inner'} style={{ width: rating }}></div>
        </div>
      </a>
      <a href={'#reviewsSection'} className={'readAllReviews'}>read all reviews</a>
    </div>

  )

}


export default Stars;