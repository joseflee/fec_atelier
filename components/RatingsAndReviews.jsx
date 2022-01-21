import React from 'react';
import NewReview from '../subcomponents/ratings/NewReview.jsx';
import ReviewsList from '../subcomponents/ratings/ReviewsList.jsx';
import RatingBreakdown from '../subcomponents/ratings/RatingBreakdown.jsx';
import ProductBreakdown from '../subcomponents/ratings/ProductBreakdown.jsx';
import Sort from '../subcomponents/ratings/Sort.jsx';

var RatingsAndReviews = (props) => {

    return (
      <div id="reviewsSection">
        <div id="reviewsHeader" id={'ratingsAndReviewsHeader'}><b>Ratings & Reviews</b></div>
        <Sort handleSort={props.handleSort} reviewCount={props.reviewCount} />
        <RatingBreakdown averageRating={props.averageRating} percent={props.percent} reviewCount={props.reviewCount} filterByStars={props.filterByStars} ratingsMeta={props.ratingsMeta} />
        <ProductBreakdown ratingsMeta={props.ratingsMeta} descriptions={props.descriptions} />
        <ReviewsList reviews={props.currentReviews} visibleReviews={props.visibleReviews} characteristics={props.characteristics} ratings={props.ratingsMeta.ratings} productId={props.productId} handleMoreReviews={props.handleMoreReviews} descriptions={props.descriptions}/>
      </div>

    )
}

export default RatingsAndReviews;