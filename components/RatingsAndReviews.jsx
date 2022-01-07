import React from 'react';
import NewReview from '../subcomponents/ratings/NewReview.jsx';
import ReviewsList from '../subcomponents/ratings/ReviewsList.jsx';
import RatingBreakdown from '../subcomponents/ratings/RatingBreakdown.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews,
      reviewCount: props.reviews.results.length
    }
  }

  render() {
    return (
      <div id="reviewsSection">
        <h3>Ratings & Reviews</h3>
        <RatingBreakdown  averageRating={this.props.averageRating} percent={this.props.percent} reviewCount={this.state.reviewCount}/>
        <ReviewsList reviews={this.state.reviews} />
      </div>

    )
  }
}

export default RatingsAndReviews;