import React from 'react';
import ratingToStar from '../../modules/stars.js';
import NewReviewStars from './NewReviewStars.jsx';
import CharacteristicsForm from './CharacteristicsForm.jsx';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      addPhotos: true,
      overallRating: null,
      characteristics: []
    }
    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleReviewClose = this.handleReviewClose.bind(this);
    this.loadCharacteristics = this.loadCharacteristics.bind(this);
    this.handleCharRating = this.handleCharRating.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleOverallRating = this.handleOverallRating.bind(this);
  }

  loadCharacteristics(characteristics) {
    var characteristics = Object.keys(characteristics);
    this.setState({ characteristics: characteristics });
  }

  handleOverallRating(value) {
    this.state.overallRating = value;
  }

  handleValidation(e) {
    e.preventDefault();

    var isValid = true;
    var requiredInputs = document.getElementsByClassName('required');
    var validLength = this.state.characteristics.length + 1;
    var checked = [];

    if (!this.state.overallRating) {
      isValid = false;
    }

    for (var i = 0; i < requiredInputs.length; i++) {
      var fieldset = requiredInputs[i].children;

      for (var j = 0; j < fieldset.length; j++) {
        if (fieldset[j].checked === true) {
          checked.push(fieldset[j].name);
        }
      }
    }

    if (checked.length < validLength) {
      isValid = false;
    }

    if (!isValid) {
      console.log('Fill in required inputs');
    } else {
      console.log('All inputs are valid');
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('event: ', e);
    console.log('values: ', e.target);
    // if conditions are not met
    // alert will pop up explaining which conditions need to be met
    // if all conditions are met
    // send data to server

  }

  handlePhotos(e) {
    var photoPaths = [];
    var input = document.getElementById('photoUploads');

    for (var key in e.target.files) {
      if (Number(key) >= 0) {
        var url = URL.createObjectURL(e.target.files[key])
        photoPaths.push(url);
      }
    }

    if (photoPaths.length > 5) {
      input.value = '';
      alert('Cannot upload more than 5 photos');
    } else if (photoPaths.length === 5) {
      input.style.visibility = 'hidden';
      this.setState({
        photos: photoPaths,
        addPhotos: false
      })
    } else {
      this.setState({ photos: photoPaths })
    }

  }

  handleAddReview() {
    var modal = document.getElementById("reviewModal");
    var form = document.getElementById("reviewForm");

    this.loadCharacteristics(this.props.characteristics);

    modal.style.display = "block";
    form.style.display = "block";
  }

  handleReviewClose() {
    var modal = document.getElementById("reviewModal");

    modal.style.display = "none"
  }

  handleCharRating(e) {
    // move the descriptions object to main component state
    var descriptions = {
      size: ['A size too small', 'Half a size too small', 'Perfect', 'Half a size too big', 'A size too wide'],
      width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly Wide', 'Too wide'],
      comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
      quality: ['Poor', 'Below Average', 'What I expect', 'Pretty great', 'Perfect'],
      length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
      fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slighly long', 'Runs long']
    }

    var char = e.target.name;
    var index = e.target.value - 1;
    var description = descriptions[char][index];
    var id = `${char}Desc`;
    var element = document.getElementById(id);
    element.innerHTML = description;

    this.forceUpdate();

  }

  render() {
    return (
      <div className="newReview">
        <button id="addReview" onClick={this.handleAddReview}>Add A Review +</button>
        <div id="reviewModal">
          <span id="reviewClose" onClick={this.handleReviewClose}>X</span>
          <form id="reviewForm" onSubmit={this.handleValidation}>
            <label>
              Overall Rating*
              <NewReviewStars handleOverallRating={this.handleOverallRating} />

            </label>

            <div className="recommend">
              <fieldset className="required" id="recommendFieldset" data-validate="true">
                <legend>Do you recommend this product?*</legend>
                <input type="radio" name="recommend" id="recommendYes" value="yes"></input>
                <label htmlFor="recommendYes">Yes</label>

                <input type="radio" name="recommend" id="recommendNo" value="no"></input>
                <label htmlFor="recommendNo">No</label>
              </fieldset>
            </div>

            <div className="characteristicRatingSelector">Characteristic Ratings*

              {this.state.characteristics.map((char, i) => (
                <CharacteristicsForm key={i} char={char} handleCharRating={this.handleCharRating} />
              ))}

            </div>

            <div id="newReviewSummary">
              <header>Review Summary</header>
              <textarea className="reviewInputs" id="newReviewSummary" name="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!"
                spellCheck="true"></textarea>
            </div>

            <div className="newReviewBody" data-validate="true">
              <header>Review Body*</header>
              <textarea className="reviewInputs" id="newReviewBody" name="reviewBody" minLength="50" maxLength="1000" placeholder="Why did you like the product or not?"
                spellCheck="true" required={true}></textarea>
            </div>

            <div className="uploadPhotos">
              <header>Upload Photos</header>
              <input type="file" name="photos" id="photoUploads" onChange={this.handlePhotos} multiple></input>
              {this.state.photos ? <div className="newReviewThumbnails">
                {this.state.photos.map((photo, i) => (
                  <img className="newReviewThumbnail" src={photo} key={i}></img>
                ))}
              </div> : null}
            </div>

            <div className="nickname">
              <header>Nickname*</header>
              <input className="reviewInputs" id="newReviewName" type="text" name="nickname" placeholder="Example: jackson11!"
                spellCheck="true" maxLength="60" required={true}></input>
              <div>For privacy reasons, do not use your full name or email address</div>
            </div>

            <div className="email">
              <header>Email*</header>
              <input className="reviewInputs" id="newReviewEmail" type="text" name="email" placeholder="Example: jackson11@email.com"
                maxLength="60" required={true} required pattern="^\S+@\S+$"></input>
              <div>For authentication reasons, you will not be emailed</div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewReview;