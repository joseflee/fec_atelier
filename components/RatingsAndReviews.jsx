import React from 'react';
import NewReview from '../subcomponents/ratings/NewReview.jsx';
import ReviewsList from '../subcomponents/ratings/ReviewsList.jsx';
import RatingBreakdown from '../subcomponents/ratings/RatingBreakdown.jsx';
import ProductBreakdown from '../subcomponents/ratings/ProductBreakdown.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews,
      reviewCount: props.reviews.results.length,
      characteristics: props.ratingsMeta.characteristics
    };
    this.filterByStars = this.filterByStars.bind(this);
  }

  filterByStars() {
    console.log('clicked');
  }

  render() {
    return (
      <div id="reviewsSection">
        <h3 id="reviewsHeader">Ratings & Reviews</h3>
        <RatingBreakdown  averageRating={this.props.averageRating} percent={this.props.percent} reviewCount={this.state.reviewCount} filterByStars={this.filterByStars} ratingsMeta={this.props.ratingsMeta}/>
        <ProductBreakdown ratingsMeta={this.props.ratingsMeta}/>
        <ReviewsList reviews={this.state.reviews} characteristics={this.props.ratingsMeta.characteristics} ratings={this.props.ratingsMeta.ratings} productId={this.props.productId}/>
      </div>

    )
  }
}

export default RatingsAndReviews;