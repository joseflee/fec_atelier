import React from 'react';
import ratingToStar from '../../modules/stars.js';
import NewReviewStars from './NewReviewStars.jsx';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      addPhotos: true,
      overallRating: null
    }
    this.handleAddReview = this.handleAddReview.bind(this);
    this.handleReviewClose = this.handleReviewClose.bind(this);
    this.loadCharacteristics = this.loadCharacteristics.bind(this);
    this.handleCharRating = this.handleCharRating.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleOverallRating = this.handleOverallRating.bind(this);
  }

  loadCharacteristics(characteristics) {
    var characteristics = Object.keys(characteristics);
    characteristics.forEach((char) => {
      var id = `char${char}`;
      var element = document.getElementById(id);
      if (element) {
        element.style.display = "block";
      }
    })
  }

  handleOverallRating(value) {
    this.state.overallRating = value;
  }

  handleValidation(e) {
    e.preventDefault();

    console.log('event: ', e);
    var isValid = true;
    console.log('validation');
    //
  }

  handleChange(e) {
    // console.log('change event: ', e);
    // console.log('change event target: ', e.target.id);
    // console.log('change event value: ', e.target.value);

  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('event: ', e);
    console.log('values: ', e.target);
    // if conditions are not met
    // alert will pop up explaining which conditions need to be met
    // if all conditions are met
    // send data to server

    // if target is class is charRating
    // iterate through elements list (e.target)
    // find value
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
              <fieldset id="recommendFieldset">
                <legend>Do you recommend this product?*</legend>
                <input type="radio" name="recommend" id="recommendYes" value="yes"></input>
                <label htmlFor="recommendYes">Yes</label>

                <input type="radio" name="recommend" id="recommendNo" value="no"></input>
                <label htmlFor="recommendNo">No</label>
              </fieldset>
            </div>

            <div className="characteristicRatingSelector">Characteristic Ratings*
              <div className="characteristicRating" id="charSize">
                <fieldset id="sizeFieldset">
                  <legend>Size </legend>
                  <p className="charRatingDesc" id="sizeDesc">None selected</p>
                  <label htmlFor="size1">1</label>
                  <input type="radio" name="size1" id="size1" value="1" onClick={this.handleCharRating}></input>
                  <label htmlFor="size2">2</label>
                  <input type="radio" name="size2" id="size2" value="2" onClick={this.handleCharRating}></input>
                  <label htmlFor="size3">3</label>
                  <input type="radio" name="size3" id="size3" value="3" onClick={this.handleCharRating}></input>
                  <label htmlFor="size4">4</label>
                  <input type="radio" name="size4" id="size4" value="4" onClick={this.handleCharRating}></input>
                  <label htmlFor="size5">5</label>
                  <input type="radio" name="size5" id="size5" value="5" onClick={this.handleCharRating}></input>
                </fieldset>
              </div>

              <div className="characteristicRating" id="charWidth">
                <fieldset id="widthFieldset">
                  <legend>Width </legend>
                  <p className="charRatingDesc" id="widthDesc">None selected</p>
                  <label htmlFor="width1">1</label>
                  <input type="radio" name="width" id="width1" value="1" onClick={this.handleCharRating}></input>
                  <label htmlFor="width2">2</label>
                  <input type="radio" name="width" id="width2" value="2" onClick={this.handleCharRating}></input>
                  <label htmlFor="width3">3</label>
                  <input type="radio" name="width" id="width3" value="3" onClick={this.handleCharRating}></input>
                  <label htmlFor="width4">4</label>
                  <input type="radio" name="width" id="width4" value="4" onClick={this.handleCharRating}></input>
                  <label htmlFor="width5">5</label>
                  <input type="radio" name="width" id="width5" value="5" onClick={this.handleCharRating}></input>
                </fieldset>
              </div>

              <div className="characteristicRating" id="charComfort">
                <fieldset id="comfortFieldset">
                  <legend>Comfort </legend>
                  <p className="charRatingDesc" id="comfortDesc">None selected</p>
                  <label htmlFor="comfort1">1</label>
                  <input type="radio" name="comfort" id="comfort1" value="1" onClick={this.handleCharRating}></input>
                  <label htmlFor="comfort2">2</label>
                  <input type="radio" name="comfort" id="comfort2" value="2" onClick={this.handleCharRating}></input>
                  <label htmlFor="comfort3">3</label>
                  <input type="radio" name="comfort" id="comfort3" value="3" onClick={this.handleCharRating}></input>
                  <label htmlFor="comfort4">4</label>
                  <input type="radio" name="comfort" id="comfort4" value="4" onClick={this.handleCharRating}></input>
                  <label htmlFor="comfort5">5</label>
                  <input type="radio" name="comfort" id="comfort5" value="5" onClick={this.handleCharRating}></input>
                </fieldset>
              </div>

              <div className="characteristicRating" id="charQuality">
                <fieldset id="qualityFieldset">
                  <legend>Quality </legend>
                  <p className="charRatingDesc" id="qualityDesc">None selected</p>
                  <label htmlFor="quality1">1</label>
                  <input type="radio" name="quality" id="quality1" value="1" onClick={this.handleCharRating}></input>
                  <label htmlFor="quality2">2</label>
                  <input type="radio" name="quality" id="quality2" value="2" onClick={this.handleCharRating}></input>
                  <label htmlFor="quality3">3</label>
                  <input type="radio" name="quality" id="quality3" value="3" onClick={this.handleCharRating}></input>
                  <label htmlFor="quality4">4</label>
                  <input type="radio" name="quality" id="quality4" value="4" onClick={this.handleCharRating}></input>
                  <label htmlFor="quality5">5</label>
                  <input type="radio" name="quality" id="quality5" value="5" onClick={this.handleCharRating}></input>
                </fieldset>
              </div>

              <div className="characteristicRating" id="charLength">
                <fieldset id="lengthFieldset">
                  <legend>Length </legend>
                  <p className="charRatingDesc" id="lengthDesc">None selected</p>
                  <label htmlFor="length1">1</label>
                  <input type="radio" name="length" id="length1" value="1" onClick={this.handleCharRating}></input>
                  <label htmlFor="length2">2</label>
                  <input type="radio" name="length" id="length2" value="2" onClick={this.handleCharRating}></input>
                  <label htmlFor="length3">3</label>
                  <input type="radio" name="length" id="length3" value="3" onClick={this.handleCharRating}></input>
                  <label htmlFor="length4">4</label>
                  <input type="radio" name="length" id="length4" value="4" onClick={this.handleCharRating}></input>
                  <label htmlFor="length5">5</label>
                  <input type="radio" name="length" id="length5" value="5" onClick={this.handleCharRating}></input>
                </fieldset>
              </div>

              <div className="characteristicRating" id="charFit">
                <fieldset id="fitFieldset">
                  <legend>Fit </legend>
                  <p className="charRatingDesc" id="fitDesc">None selected</p>
                  <label htmlFor="fit1">1</label>
                  <input type="radio" name="fit" id="fit1" value="1" onClick={this.handleCharRating}></input>
                  <label htmlFor="fit2">2</label>
                  <input type="radio" name="fit" id="fit2" value="2" onClick={this.handleCharRating}></input>
                  <label htmlFor="fit3">3</label>
                  <input type="radio" name="fit" id="fit3" value="3" onClick={this.handleCharRating}></input>
                  <label htmlFor="fit4">4</label>
                  <input type="radio" name="fit" id="fit4" value="4" onClick={this.handleCharRating}></input>
                  <label htmlFor="fit5">5</label>
                  <input type="radio" name="fit" id="fit5" value="5" onClick={this.handleCharRating}></input>
                </fieldset>
              </div>
            </div>

            <div id="newReviewSummary">
              <header>Review Summary</header>
              <textarea className="reviewInputs" id="newReviewSummary" name="reviewSummary" maxLength="60" placeholder="Example: Best purchase ever!"
                spellCheck="true" onChange={this.handleChange}></textarea>
            </div>

            <div className="newReviewBody">
              <header>Review Body*</header>
              <textarea className="reviewInputs" id="newReviewBody" name="reviewBody" minLength="50" maxLength="1000" placeholder="Why did you like the product or not?"
                spellCheck="true" required={true} onChange={this.handleChange}></textarea>
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
              <input className="reviewInputs" type="text" name="nickname" placeholder="Example: jackson11!"
                spellCheck="true" maxLength="60" required={true}></input>
              <div>For privacy reasons, do not use your full name or email address</div>
            </div>

            <div className="email">
              <header>Email*</header>
              <input className="reviewInputs" type="text" name="email" placeholder="Example: jackson11@email.com"
                maxLength="60" required={true}></input>
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