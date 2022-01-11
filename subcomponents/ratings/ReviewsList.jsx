import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import NewReview from './NewReview.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews,
      visibleReviews: []
    }
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
  }

  componentDidMount() {
    var firstTwo = [];
    firstTwo.push(this.props.reviews.results[0]);
    firstTwo.push(this.props.reviews.results[1]);
    this.setState({ visibleReviews: firstTwo });
  }

  handleMoreReviews() {
    var reviews = this.state.reviews.results;
    var start = this.state.visibleReviews.length;
    var end = start + 2;
    var nextTwo = reviews.slice(start, end);
    var newState = this.state.visibleReviews.concat(nextTwo);
    var button = document.getElementById("moreReviews");
    this.setState({ visibleReviews: newState }, () => {
      if (this.state.visibleReviews.length === this.state.reviews.results.length) {
        button.style.display = "none";
      }
    });
    // future enhancement:
    // button should disappear after max height of element is reached
    // list should become scrollable
  }

  render() {
    return (
      <div id="reviewListContainer">
        <div id="reviewList">
          {this.state.visibleReviews.map((review, index) => <ReviewListEntry key={index} review={review} />)}
        </div>
        <button id="moreReviews" onClick={this.handleMoreReviews}>More Reviews</button>
        <NewReview characteristics={this.props.characteristics} />
      </div>
    )
  }
}

export default ReviewsList;