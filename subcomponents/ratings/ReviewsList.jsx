import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews
    }
  }

  render() {
    return (
        <div id="reviewList">
          {this.props.reviews.results.map(review => <ReviewListEntry review={review}/>)}
        </div>
      // list should map ReviewListEntries two entries at a time
      // <more reviews/> button should load two more entries
    )
  }
}

export default ReviewsList;