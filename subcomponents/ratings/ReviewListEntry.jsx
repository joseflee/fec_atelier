import React from 'react';
import moment from 'moment';

var ReviewListEntry = (props) => {
  var review = props.review;
  var date = moment(review.date).format('MMMM Do YYYY');
  // console.log('date: ', date);
  // console.log('list entry reviews: ', review);
  return (
    <div>
     <div className="reviewRating">{review.rating}</div>
     <div className="reviewerName">{review.reviewer_name}</div>
     <div className="reviewDate">{date}</div>
     <div className="reviewSummary">{review.summary}</div>
     <div className="recommendedCheck">{review.recommended}</div>
     <div className="sellerResponse">{review.response}</div>
     <div className="reviewHelpfulness">{review.helpfullness}</div>
    </div>
  )
}

export default ReviewListEntry;