import React from 'react';

var Sort = (props) => {

  return (
    <div id="sortReviews">
      Sort on
      <div id="sortDropdown">
        <div className="sortOption" onClick={props.handleSort}>Relevance</div>
        <div className="sortOption" onClick={props.handleSort}>Helpfulness</div>
        <div className="sortOption" onClick={props.handleSort}>Newest</div>
      </div>
    </div>
    // when clicked should open a drop down menu that sorts by:
    // helpful reviews, newest, and relevant (combination of helpful/newest)
  )
};

export default Sort;