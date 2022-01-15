import React from 'react';
import moment from 'moment';
import Stars from './Stars.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: null,
      isReady: false
    }
    this.handleHelpful = this.handleHelpful.bind(this);
  }

  componentDidMount() {
    this.setState({
      helpfulness: this.props.review.helpfulness,
      isReady: true
    }, () => {
      console.log('state after mount: ', this.state);
    })
  }

  // componentWillUnmount() {
  //   this.setState({
  //     isReady: false
  //   })
  // }

  handleHelpful() {
    this.setState((state) => ({ helpfulness: (this.state.helpfulness + 1) }), () => {
    });
  }

  render() {
    return (
      <div className="reviewListEntry">
        <div className="reviewEntryTop">
          <div className="reviewRating">
            {this.state.isReady ? <Stars rating={this.props.review.rating} /> : null}
          </div>
          {this.state.isReady ? <div className="reviewerName">{this.props.review.reviewer_name}</div> : null}
          {this.state.isReady ? <div className="reviewDate">{moment(this.props.review.date).format('MMMM Do YYYY')}</div> : null }
        </div>

        {this.state.isReady ? <div className="reviewSummary">{this.props.review.summary}</div> : null}
        {this.state.isReady ? <div className="reviewBody">{this.props.review.body}</div> : null}
        {this.state.isReady && this.props.review.photos.length > 0 ? <ReviewPhotos photos={this.props.review.photos} /> : null}
        {this.state.isReady && this.props.review.recommend ? <div className="recommendedCheck">I recommend this product</div> : null}
        {this.state.isReady && this.props.review.response ? <div className="sellerResponse">
          <div className="responseHeader">Response:</div>
          <div className="responseText">{this.props.review.response}</div>
        </div> : null}
        {this.state.isReady ? <div className="reviewEntryBottom">
          <div className="reviewHelpfulness">
            <div className="helpfulText">Helpful?</div>
            <div className="helpfulYes" onClick={this.handleHelpful}>Yes</div>
            <div className="helpfulCount">({this.state.helpfulness})</div>
          </div>
        </div> : null}
      </div>
    )
  }
}

export default ReviewListEntry;