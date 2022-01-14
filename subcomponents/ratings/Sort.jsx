import React from 'react';

var Sort = (props) => {

  return (
    <div id="sortReviews">
      Sort on
      <ul id="sortDropdown">
        <li><span onClick={props.handleSort}>Relevance</span></li>
        <li><span onClick={props.handleSort}>Helpfulness</span></li>
        <li><span onClick={props.handleSort}>Newest</span></li>
      </ul>
    </div>
    // when clicked should open a drop down menu that sorts by:
    // helpful reviews, newest, and relevant (combination of helpful/newest)
  )
};

export default Sort;