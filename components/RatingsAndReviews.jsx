import React from 'react';

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
      <div>Ratings And Reviews</div>
    )
  }
}

export default RatingsAndReviews;