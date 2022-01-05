import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Reviews
        <ReviewListEntry />
      </div>
      // list should map ReviewListEntries two entries at a time
      // <more reviews/> button should load two more entries
    )
  }
}

export default ReviewsList;