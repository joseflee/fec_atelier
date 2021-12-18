import React from 'react';
import NewReview from '../subcomponents/ratings/NewReview.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    console.log('component did mount');
  }

  render() {
    return (
      <div>Ratings And Reviews
        <NewReview />
      </div>

    )
  }
}

export default RatingsAndReviews;