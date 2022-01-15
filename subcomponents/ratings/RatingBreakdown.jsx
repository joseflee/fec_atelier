import React from 'react';
import Stars from './Stars.jsx';
import RatingBreakdownGraph from './RatingBreakdownGraph.jsx';

var RatingBreakdown = (props) => {

  return (
    <div id="ratingBreakdown">
      <div id="ratingSummary">
        <div id="ratingNumStarContainer">
          <div id="ratingNumber">{props.averageRating ? props.averageRating.toFixed(1) : null}</div>
          <div id="ratingBreakdownStars">
            <Stars rating={props.averageRating} />
          </div>
        </div>
        <div id="percentRecommended">{props.percent}% of reviews recommend this product</div>
      </div>
      <RatingBreakdownGraph filterByStars={props.filterByStars} ratingsMeta={props.ratingsMeta} reviewCount={props.reviewCount} />
    </div>
    // rating summary: average rating depicted by stars & number
    // breakdown: graph indicating amount of ratings grouped by stars
    // recommendations: precentage of reviews that recommend product
  )
}

export default RatingBreakdown;