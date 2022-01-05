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
      <div>Ratings And Reviews
        <ReviewsList reviews={this.state.reviews}/>
        <NewReview />
      </div>

    )
  }
}

export default RatingsAndReviews;