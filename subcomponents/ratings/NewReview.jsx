import React from 'react';
import ratingToStar from '../modules/stars.js';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="newReview">
        <button>Add A Review +</button>
        <form className="reviewForm">
          <label>Overall Rating*
            <ratingToStar />
          </label>
          <label>Do you recommend this product?*
            <input type="radio"></input>
          </label>
        </form>
      </div>
      // when button is clicked, should open a form with field inputs for:
      // overall rating* : text should appear next to stars describing rating
      // do you recommend?*
      // characteristic rating*
      // review summary
      // review body*
      // upload photos
      // nickname*
      // email*
      // submit button
    )
  }
}

export default NewReview;