import React from 'react';
import moment from 'moment';
import Stars from './Stars.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';
import $ from 'jquery';

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: null,
      entries: null
    };
    this.handleHelpful = this.handleHelpful.bind(this);
  }

  componentDidMount() {
    var helpfulness = this.props.review.helpfulness;
    this.setState({
      helpfulness: helpfulness
    })
  }

  handleHelpful() {
    if (this.state.entries < 1) {
      this.setState({
        helpfulness: (this.state.helpfulness + 1),
        entries: 1
      }, () => {
        var data = {
          reviewId: this.props.review.review_id,
          helpfulness: this.state.helpfulness
        };

        var json = JSON.stringify(data);

        $.ajax({
          method: 'PUT',
          url: '/helpful',
          contentType: 'application/json',
          data: json
        }).done((res) => {
          console.log('client side: ', res);
        })
      })
    }
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