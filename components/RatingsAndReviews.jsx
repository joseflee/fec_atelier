import React from 'react';
import NewReview from '../subcomponents/ratings/NewReview.jsx';
import ReviewsList from '../subcomponents/ratings/ReviewsList.jsx';
import RatingBreakdown from '../subcomponents/ratings/RatingBreakdown.jsx';
import ProductBreakdown from '../subcomponents/ratings/ProductBreakdown.jsx';
import Sort from '../subcomponents/ratings/Sort.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      reviewList: null,
      visibleReviews: [],
      isReady: false,
      changedSort: 0,
      reviewCount: props.reviews.results.length,
      characteristics: props.ratingsMeta.characteristics,
      descriptions: {
        Size: ['A size too small', 'Half a size too small', 'Perfect', 'Half a size too big', 'A size too wide'],
        Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly Wide', 'Too wide'],
        Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
        Quality: ['Poor', 'Below Average', 'What I expect', 'Pretty great', 'Perfect'],
        Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
        Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slighly long', 'Runs long']
      }
    };
    this.filterByStars = this.filterByStars.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.compareHelpfulness = this.compareHelpfulness.bind(this);
    this.compareNewest = this.compareNewest.bind(this);
    this.compareRelevance = this.compareRelevance.bind(this);
    this.handleFirstTwoReviews = this.handleFirstTwoReviews.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
  }


  componentDidMount() {
    var reviews = this.props.reviews;
    var reviewsList = this.props.reviews.results;
    var firstTwo = this.handleFirstTwoReviews(reviewsList);
    this.setState({
      ...this.state,
      reviewsList: reviewsList,
      visibleReviews: firstTwo,
      isReady: true
    }, () => {
      // console.log('state after mount', this.state);
    })
  }

  handleFirstTwoReviews(reviewsList) {
    var firstTwo = [];
    firstTwo.push(reviewsList[0]);
    firstTwo.push(reviewsList[1]);
    return firstTwo;
  }

  handleMoreReviews() {
    var reviewsList = this.state.reviewsList;
    var start = this.state.visibleReviews.length;
    var end = start + 2;
    var nextTwo = reviewsList.slice(start, end);
    var newState = this.state.visibleReviews.concat(nextTwo);
    var button = document.getElementById("moreReviews");
    this.setState({ visibleReviews: newState }, () => {
      if (this.state.visibleReviews.length === this.state.reviewsList.length) {
        button.style.display = "none";
      }
    });
    // future enhancement:
    // button should disappear after max height of element is reached
    // list should become scrollable
  }


  filterByStars(e) {
    // console.log('clicked');
    console.log('event: ', e);
    var rating = Number(e.target.innerHTML[0]);
    var newReviews = this.state.reviews;
    var filtered = [];
    console.log('rating: ', rating);
    newReviews.results.forEach((review) => {
      if (review.rating === rating) {
        filtered.push(review);
      }
    })

    newReviews.results = filtered;
    console.log('filtered reviews: ', newReviews);
    this.setState({
      ...this.state,
      reviews: newReviews,
      changedSort: (this.state.changedSort + 1)
    })
  }

  compareRelevance(a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return b.helpfulness - a.helpfulness || d - c;
  }

  compareHelpfulness(a, b) {
    return b.helpfulness - a.helpfulness;
  }

  compareNewest(a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d - c;
  }

  handleSort(e) {
    var option = e.target.innerHTML;
    var reviews = this.props.reviews;

    if (option === 'Helpfulness') {
      reviews.results = reviews.results.sort(this.compareHelpfulness);
      this.setState({
        ...this.state,
        reviews: reviews,
        changedSort: (this.state.changedSort + 1)
      }, () => {
        // console.log('changedSort: ', this.state.changedSort);
      })
    }

    if (option === 'Newest') {
      reviews.results = reviews.results.sort(this.compareNewest);
      this.setState({
        ...this.state,
        reviews: reviews,
        changedSort: (this.state.changedSort + 1)
      }, () => {
        // console.log('changedSort: ', this.state.changedSort);
      })
    }

    if (option === 'Relevance') {
      reviews.results = reviews.results.sort(this.compareRelevance);
      this.setState({
        ...this.state,
        reviews: reviews,
        changedSort: (this.state.changedSort + 1)
      }, () => {
        // console.log('relevance state', this.state);
      })
    }

  }

  render() {
    return (
      <div id="reviewsSection">
        <h3 id="reviewsHeader">Ratings & Reviews</h3>
        <Sort handleSort={this.handleSort} reviewCount={this.state.reviewCount} />
        <RatingBreakdown averageRating={this.props.averageRating} percent={this.props.percent} reviewCount={this.state.reviewCount} filterByStars={this.filterByStars} ratingsMeta={this.props.ratingsMeta} />
        <ProductBreakdown ratingsMeta={this.props.ratingsMeta} descriptions={this.state.descriptions} />
        {this.state.isReady ? <ReviewsList key={this.state.changedSort} reviews={this.state.reviewsList} visibleReviews={this.state.visibleReviews} characteristics={this.props.ratingsMeta.characteristics} ratings={this.props.ratingsMeta.ratings} productId={this.props.productId} handleMoreReviews={this.handleMoreReviews} /> : null}
      </div>

    )
  }
}

export default RatingsAndReviews;