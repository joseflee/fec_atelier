import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import NewReview from './NewReview.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews
    }
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
  }

  handleMoreReviews() {
    // add functionality to expand review list
  }

  render() {
    return (
        <div id="reviewList">
          {this.props.reviews.results.map(review => <ReviewListEntry review={review}/>)}
          <button id="moreReviews">More Reviews</button>
          <NewReview/>
        </div>
      // list should map ReviewListEntries two entries at a time
      // <more reviews/> button should load two more entries
    )
  }
}

export default ReviewsList;