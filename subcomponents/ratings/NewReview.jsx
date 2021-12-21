import React from 'react';
import ratingToStar from '../../modules/stars.js';

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
            {/* <ratingToStar /> */}
          </label>

          <div className="recommend">Do you recommend this product?*
            <input type="radio" name="recommend" id="recommendYes" value="yes"></input>
            <label htmlFor="recommendYes">Yes</label>

            <input type="radio" name="recommend" id="recommendNo" value="no"></input>
            <label htmlFor="recommendNo">No</label>
          </div>

          <div className="characteristicRating">Characteristic Ratings*

          </div>

          <div className="reviewSummary">Review Summary
            <textarea name="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!"
            spellCheck="true"></textarea>
          </div>

          <div className="reviewBody">Review Body*
            <textarea name="reviewBody" maxLength="1000" placeholder="Why did you like the product or not?"
            spellCheck="true" required="true"></textarea>
          </div>

          <div className="uploadPhotos">Upload Photos

          </div>

          <div className="nickname">Nickname*
          <input type="text" name="nickname" placeholder="Example: jackson11!"
          spellcheck="true" maxlength="60" required="true"></input>
          <div>For privacy reasons, do not use your full name or email address</div>
          </div>

          <div className="email">Email*

          </div>

          <button type="submit">Submit</button>
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