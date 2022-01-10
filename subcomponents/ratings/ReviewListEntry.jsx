import React from 'react';
import moment from 'moment';
import Stars from './Stars.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: props.review.helpfulness
    }
    this.handleHelpful = this.handleHelpful.bind(this);
  }

  handleHelpful() {
    this.setState((state) => ({ helpfulness: (state.helpfulness + 1) }), () => {
    });
  }

  render() {
    return (
      <div className="reviewListEntry">
        <div className="reviewEntryTop">
          <div className="reviewRating">
            <Stars rating={this.props.review.rating} />
          </div>
          <div className="reviewerName">{this.props.review.reviewer_name}</div>
          <div className="reviewDate">{moment(this.props.review.date).format('MMMM Do YYYY')}</div>
        </div>

        <div className="reviewSummary">{this.props.review.summary}</div>
        <div className="reviewBody">{this.props.review.body}</div>
        {this.props.review.photos.length > 0 ? <ReviewPhotos photos={this.props.review.photos} /> : null}
        {this.props.review.recommend ? <div className="recommendedCheck">I recommend this product</div> : null}
        {this.props.review.response ? <div className="sellerResponse">
          <div className="responseHeader">Response:</div>
          <div className="responseText">{this.props.review.response}</div>
        </div> : null}
        <div className="reviewEntryBottom">
          <div className="reviewHelpfulness">
            <div className="helpfulText">Helpful?</div>
            <div className="helpfulYes" onClick={this.handleHelpful}>Yes</div>
            <div className="helpfulCount">({this.state.helpfulness})</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewListEntry;