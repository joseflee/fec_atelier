import React from 'react';
import Stars from './Stars.jsx';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="ratingBreakdown">
        <div id="ratingSummary">
          <div id="ratingNumber">{this.props.averageRating}</div>
          <Stars rating={this.props.averageRating}/>
          <div id="percentRecommended">{this.props.percent}% of reviews recommend this product</div>
        </div>
      </div>
      // rating summary: average rating depicted by stars & number
      // breakdown: graph indicating amount of ratings grouped by stars
      // recommendations: precentage of reviews that recommend product
    )
  }
}

export default RatingBreakdown;