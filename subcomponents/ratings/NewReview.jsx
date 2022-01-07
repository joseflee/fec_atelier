import React from 'react';
import ratingToStar from '../../modules/stars.js';
import NewReviewStars from './NewReviewStars.jsx';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleReviewClose = this.handleReviewClose.bind(this);
  }

  handleAddReview() {
    var modal = document.getElementById("reviewModal");
    var form = document.getElementById("reviewForm");
    modal.style.display = "block";
    form.style.display = "block";
  }

  handleReviewClose() {
    var modal = document.getElementById("reviewModal");

    modal.style.display = "none"
  }

  render() {
    return (
      <div className="newReview">
        <button id="addReview" onClick={this.handleAddReview}>Add A Review +</button>
        <div id="reviewModal">
          <span id="reviewClose" onClick={this.handleReviewClose}>X</span>
          <form id="reviewForm">
            <label>Overall Rating*
              <NewReviewStars />

            </label>

            <div className="recommend">Do you recommend this product?*
              <input type="radio" name="recommend" id="recommendYes" value="yes"></input>
              <label htmlFor="recommendYes">Yes</label>

              <input type="radio" name="recommend" id="recommendNo" value="no"></input>
              <label htmlFor="recommendNo">No</label>
            </div>

            <div className="characteristicRating">Characteristic Ratings*

            </div>

            <div id="newReviewSummary">Review Summary
              <textarea id="reviewSummaryText" name="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!"
                spellCheck="true"></textarea>
            </div>

            <div className="newReviewBody">Review Body*
              <textarea name="reviewBody" maxLength="1000" placeholder="Why did you like the product or not?"
                spellCheck="true" required={true}></textarea>
            </div>

            <div className="uploadPhotos">
              <label htmlFor="photos">Upload Photos</label>
              <input type="file" name="photos" multiple></input>
              <div className="photoThumbnails"></div>
            </div>

            <div className="nickname">Nickname*
              <input type="text" name="nickname" placeholder="Example: jackson11!"
                spellCheck="true" maxLength="60" required={true}></input>
              <div>For privacy reasons, do not use your full name or email address</div>
            </div>

            <div className="email">Email*
              <input type="text" name="email" placeholder="Example: jackson11@email.com"
                maxLength="60" required={true}></input>
              <div>For authentication reasons, you will not be emailed</div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
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