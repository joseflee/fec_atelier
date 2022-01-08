import React from 'react';
import ratingToStar from '../../modules/stars.js';

export var Stars = (props) => {

  var rating = ratingToStar(props.rating);

  return (

    <div>
      <a href={'#ratingsAndReviewsSectionIdHere'}>
        <div className={'stars-outer'}>
        <div className={'stars-inner'} style={{ width: rating }}></div>
        </div>
      </a>
    </div>

  )

}

