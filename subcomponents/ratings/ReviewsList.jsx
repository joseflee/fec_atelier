import React from 'react';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Reviews List
      </div>
      // list should map ReviewListEntries two entries at a time
      // <more reviews/> button should load two more entries
    )
  }
}

export default ReviewsList;