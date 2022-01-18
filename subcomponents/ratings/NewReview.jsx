import React from 'react';
import NewReviewStars from './NewReviewStars.jsx';
import CharacteristicsForm from './CharacteristicsForm.jsx';
import axios from 'axios';
import $ from 'jquery';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      addPhotos: true,
      overallRating: null,
      characteristics: [],
      invalidInputs: [],
      allInputsValid: true
    }
    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleReviewClose = this.handleReviewClose.bind(this);
    this.loadCharacteristics = this.loadCharacteristics.bind(this);
    this.handleCharRating = this.handleCharRating.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleOverallRating = this.handleOverallRating.bind(this);
    this.findInvalidInputs = this.findInvalidInputs.bind(this);
  }

  loadCharacteristics(characteristics) {
    var characteristics = Object.keys(characteristics);
    this.setState({ characteristics: characteristics });
  }

  handleOverallRating(value) {
    this.state.overallRating = value;
  }

  findInvalidInputs(allInputs, validInputs) {
    var invalidInputs = [];

    allInputs.forEach((input) => {
      if (validInputs.indexOf(input) === -1) {
        invalidInputs.push(input);
      }
    })

    return invalidInputs;
  }

  handleValidation(e) {
    e.preventDefault();

    var isValid = true;
    var requiredInputs = document.getElementsByClassName('required');
    var allInputs = [];
    var checked = [];
    var data = {
      characteristics: {}
    };

    if (!this.state.overallRating) {
      allInputs.push('Overall Rating');
      isValid = false;
    } else {
      allInputs.push('Overall Rating');
      checked.push('Overall Rating');
    }


    for (var i = 0; i < requiredInputs.length; i++) {
      var fieldset = requiredInputs[i].children;

      for (var j = 0; j < fieldset.length; j++) {
        if (fieldset[j].checked !== null && fieldset[j].checked !== undefined) {
          if (allInputs.indexOf(fieldset[j].name) === -1) {
            allInputs.push(fieldset[j].name);
          }
          if (fieldset[j].checked === true) {
            if (fieldset[j].name === 'recommend') {
              data['recommend'] = (fieldset[j].value === 'true');
            } else {
              var id = this.props.characteristics[fieldset[j].name].id;
              data.characteristics[id] = Number(fieldset[j].value);
            }

            checked.push(fieldset[j].name);
          }
        }
      }
    }

    if (checked.length !== allInputs.length) {
      isValid = false;
    }

    if (!isValid) {
      var invalid = this.findInvalidInputs(allInputs, checked);
      this.setState({
        invalidInputs: invalid,
        allInputsValid: false
      }, () => {
        var message = 'You must enter the following: \n';
        this.state.invalidInputs.forEach((input) => {
          message += `${input} \n`;
        })
        alert(message);
      })
      console.log('Fill in required inputs');
    } else {
      this.handleSubmit(e, data);
      console.log('All inputs are valid');
    }

  }

  handleSubmit(e, data) {
    e.preventDefault();

    var rating = this.state.overallRating;
    var summary = document.getElementById('newReviewSummary').value;
    var body = document.getElementById('newReviewBody').value;
    var name = document.getElementById('newReviewName').value;
    var email = document.getElementById('newReviewEmail').value;

    var formatted = {
      product_id: this.props.productId,
      rating: this.state.overallRating,
      summary: summary,
      body: body,
      recommend: data.recommend,
      name: name,
      email: email,
      photos: this.state.photos,
      characteristics: data.characteristics
    }
    var json = JSON.stringify(formatted);

    $.ajax({
      method: 'POST',
      url: '/reviews',
      contentType: 'application/json',
      data: json
    }).done((res) => {
      console.log('response from server: ', res)
    })

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

    var char = e.target.name;
    var index = e.target.value - 1;
    var description = this.props.descriptions[char][index];
    var lowercase = char.toLowerCase();
    var id = `${lowercase}Desc`;
    var element = document.getElementById(id);
    element.innerHTML = description;

    this.forceUpdate();

  }

  render() {
    return (
      <div className="newReview">
        <button id="addReview" onClick={this.handleAddReview}>Add A Review +</button>
        <div id="reviewModal">
          <span id="reviewClose" onClick={this.handleReviewClose}>x</span>
          <form id="reviewForm" onSubmit={this.handleValidation}>
            <label>
              Overall Rating*
              <NewReviewStars handleOverallRating={this.handleOverallRating} />

            </label>

            <div className="recommend">
              <fieldset className="required" id="recommendFieldset" data-validate="true">
                <legend>Do you recommend this product?*</legend>
                <input type="radio" name="recommend" id="recommendYes" value={true}></input>
                <label htmlFor="recommendYes">Yes</label>

                <input type="radio" name="recommend" id="recommendNo" value={false}></input>
                <label htmlFor="recommendNo">No</label>
              </fieldset>
            </div>

            <div className="characteristicRatingSelector">Characteristic Ratings*

              {this.state.characteristics.map((char, i) => (
                <CharacteristicsForm key={i} char={char} handleCharRating={this.handleCharRating} />
              ))}

            </div>

            <div id="newReviewSummaryContainer">
              <header>Review Summary</header>
              <textarea className="reviewInputs" id="newReviewSummary" name="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!"
                spellCheck="true"></textarea>
            </div>

            <div className="newReviewBodyContainer" data-validate="true">
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