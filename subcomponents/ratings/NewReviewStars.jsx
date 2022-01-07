import React from 'react';

class NewReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  setText(starNum) {
    var text = document.getElementById("overallRatingText");
    if(starNum === 1) {
      text.innerHTML = "Poor";
    }
    if(starNum === 2) {
      text.innerHTML = "Fair";
    }
    if(starNum === 3) {
      text.innerHTML = "Average";
    }
    if(starNum === 4) {
      text.innerHTML = "Good";
    }
    if(starNum === 5) {
      text.innerHTML = "Great";
    }
  }

  handleStarClick(e) {
    var innerStarIds = ["innerStar1", "innerStar2", "innerStar3", "innerStar4", "innerStar5"];
    var eventNumber = e.target.id.match(/\d/);
    var index = Number(eventNumber[0]);
    var selectedStars = innerStarIds.slice(0, index);

    innerStarIds.forEach((star) => {
      var element = document.getElementById(star);
      element.style.display = "none";
    })

    selectedStars.forEach((star) => {
      var element = document.getElementById(star);
      element.style.display = "inline-block";
    });

    this.setText(index);
    this.forceUpdate();
  }

  render() {
    return (
      <div id="overallRating">
        <div className="reviewStarsOuter" id="outerStar1" onClick={this.handleStarClick}>
          <div className="reviewStarsInner" id="innerStar1"></div>
        </div>
        <div className="reviewStarsOuter" id="outerStar2" onClick={this.handleStarClick}>
          <div className="reviewStarsInner" id="innerStar2"></div>
        </div>
        <div className="reviewStarsOuter" id="outerStar3" onClick={this.handleStarClick}>
          <div className="reviewStarsInner" id="innerStar3"></div>
        </div>
        <div className="reviewStarsOuter" id="outerStar4" onClick={this.handleStarClick}>
          <div className="reviewStarsInner" id="innerStar4"></div>
        </div>
        <div className="reviewStarsOuter" id="outerStar5" onClick={this.handleStarClick}>
          <div className="reviewStarsInner" id="innerStar5"></div>
        </div>
        <span id="overallRatingText"></span>
      </div>
    )
  }
}

export default NewReviewStars;