import React from 'react';

var ReviewListEntry = (props) => {
  var review = props.review;
  // console.log('list entry reviews: ', review);
  return (
    <div>
     <div className="reviewRating">{review.rating}</div>
     <div className="reviewerName">{review.reviewer_name}</div>
     <div className="reviewDate">{review.date}</div>
     <div className="reviewSummary">{review.summary}</div>
     <div className="recommendedCheck">{review.recommended}</div>
     <div className="sellerResponse">{review.response}</div>
     <div className="reviewHelpfulness">{review.helpfullness}</div>
    </div>
  )
}

export default ReviewListEntry;