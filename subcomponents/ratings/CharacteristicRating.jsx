import React from 'react';

class CharacteristicRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicatorId: `charBarIndicator${props.char}`
    }
  }

  // pull value from characteristics
  // return percentage
  // offset indicator by percentage
  // var indicatorId = `charBarIndicator${props.char}`;

  componentDidMount() {
      var rating = this.props.meta[this.props.char].value;
      var value = (rating / 5) * 100;
      var percent = `${value}%`;
      var element = document.getElementById(this.state.indicatorId);
      element.style.left = percent;
  }

  render() {
    return (
      <div className="charBreakdown">
        <header className="charBarHeader">{this.props.char}</header>
        <div className="charBarOuter">
          <div className="charBarInner"></div>
          <div className="charBarIndicator" id={this.state.indicatorId}></div>
        </div>
        <p className="charBarDesc1">Poor</p>
        <p className="charBarDesc2">Perfect</p>
      </div>
    )
  }
}

export default CharacteristicRating;