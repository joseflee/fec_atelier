import React from 'react';

var ReviewListEntry = (props) => {
  return (
    <div>
     <div className="reviewRating">4.5</div>
     <div className="reviewerName">Bozo987</div>
     <div className="reviewDate">December 12, 2099</div>
     <div className="reviewSummary">Good product</div>
     <div className="recommendedCheck">I recommend this product</div>
     <div className="sellerResponse">We're glad you enjoy the product</div>
     <div className="reviewHelpfulness">Helpful?</div>
    </div>
  )
}
// <star rating/>
    // <date of review/>
    // <review summary/>
    // <review body/>
    // <recommended check/>
    // <reviewer name/>
    // <seller response/>
    // <rating helpfulness/>

export default ReviewListEntry;