import React from 'react';
import moment from 'moment';

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: props.review.helpfulness
    }
    this.handleHelpful = this.handleHelpful.bind(this);
    // var review = props.review;
    // var date = moment(review.date).format('MMMM Do YYYY');
  }

  handleHelpful() {
    console.log('click');
    // console.log('props: ', this.props)
    // console.log(this.state);
    // console.log(this.props.helpfulness);
    this.setState((state) => ({ helpfulness: (state.helpfulness + 1) }), () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div className="reviewListEntry">
        <div className="reviewRating">{this.props.rating}</div>
        <div className="reviewerName">{this.props.reviewer_name}</div>
        <div className="reviewDate">{moment(this.props.date).format('MMMM Do YYYY')}</div>
        <div className="reviewSummary">{this.props.summary}</div>
        {this.props.recommend ? <div className="recommendedCheck">I recommend this product</div> : null}
        {this.props.response ? <div className="sellerResponse">Response: {this.props.response}</div> : null}
        <div className="reviewHelpfulness">Helpful?
          <div id="helpfulYes" onClick={this.handleHelpful}>Yes</div>
          ({this.state.helpfulness})
        </div>
      </div>
    )
  }
}

export default ReviewListEntry;