import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import NewReview from './NewReview.jsx';

var ReviewsList = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     reviews: null,
  //     visibleReviews: []
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.reviews.results != prevProps.reviews.results) {
  //     this.setState({ reviews: this.props.reviews.results})
  //   }
  // }

  // componentDidMount() {
  //   // console.log('props on mount: ', this.props);
  //   var firstTwo = [];
  //   firstTwo.push(this.props.reviews.results[0]);
  //   firstTwo.push(this.props.reviews.results[1]);
  //   this.setState({
  //     reviews: this.props.reviews.results,
  //     visibleReviews: firstTwo
  //   }, () => {
  //     // console.log('state after mount in child: ', this.state);
  //   });
  // }

  // handleMoreReviews() {
  //   var reviews = this.props.reviews.results;
  //   var start = this.state.visibleReviews.length;
  //   var end = start + 2;
  //   var nextTwo = reviews.slice(start, end);
  //   var newState = this.state.visibleReviews.concat(nextTwo);
  //   var button = document.getElementById("moreReviews");
  //   this.setState({ visibleReviews: newState }, () => {
  //     if (this.state.visibleReviews.length === this.state.reviews.length) {
  //       button.style.display = "none";
  //     }
  //   });
  //   // future enhancement:
  //   // button should disappear after max height of element is reached
  //   // list should become scrollable
  // }

    return (
      <div id="reviewListContainer">
        <div id="reviewList">
          {props.reviews ? props.visibleReviews.map((review, index) => <ReviewListEntry key={index} review={review} />) : null}
        </div>
        <button id="moreReviews" onClick={props.handleMoreReviews}>More Reviews</button>
        <NewReview characteristics={props.characteristics} productId={props.productId}/>
      </div>
    )
}

export default ReviewsList;