import React from 'react';
import NewReview from '../subcomponents/ratings/NewReview.jsx';
import ReviewsList from '../subcomponents/ratings/ReviewsList.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews
    }
  }

  render() {
    return (
      <div id="reviewsSection">
        <h3>Ratings & Reviews</h3>
        <ReviewsList reviews={this.state.reviews}/>
      </div>

    )
  }
}

export default RatingsAndReviews;