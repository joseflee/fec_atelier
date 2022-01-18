import React from 'react';
import moment from 'moment';
import Stars from './Stars.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';

var ReviewListEntry = (props) => {
  var helpfulness = props.review.helpfulness;

  var handleHelpful = () => {
    helpfulness = helpfulness + 1;
    // console.log('handle: ', helpfulness);
  };

  // render() {
    return (
      <div className="reviewListEntry">
        <div className="reviewEntryTop">
          <div className="reviewRating">
            <Stars rating={props.review.rating} />
          </div>
          <div className="reviewerName">{props.review.reviewer_name}</div>
          <div className="reviewDate">{moment(props.review.date).format('MMMM Do YYYY')}</div>
        </div>

        <div className="reviewSummary">{props.review.summary}</div>
        <div className="reviewBody">{props.review.body}</div>
        {props.review.photos.length > 0 ? <ReviewPhotos photos={props.review.photos} /> : null}
        {props.review.recommend ? <div className="recommendedCheck">I recommend this product</div> : null}
        {props.review.response ? <div className="sellerResponse">
          <div className="responseHeader">Response:</div>
          <div className="responseText">{props.review.response}</div>
        </div> : null}
        <div className="reviewEntryBottom">
          <div className="reviewHelpfulness">
            <div className="helpfulText">Helpful?</div>
            <div className="helpfulYes" onClick={handleHelpful}>Yes</div>
            <div className="helpfulCount">({helpfulness})</div>
          </div>
        </div>
      </div>
    )
  // }
}

export default ReviewListEntry;