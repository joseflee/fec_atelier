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

  componentDidUpdate() {
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
          <div className="charBarInner">
            <div className="charBarGap"></div>
            <div className="charBarGap"></div>
            <div className="charBarGap"></div>
            <div className="charBarGap"></div>
          </div>
          <div className="charBarIndicator" id={this.state.indicatorId}></div>
        </div>
        <div className="charBarDescContainer">
          <span className="charBarDesc1">{this.props.descriptions[this.props.char][0]}</span>
          <span className="charBarDesc2">{this.props.descriptions[this.props.char][this.props.descriptions[this.props.char].length - 1]}</span>
        </div>
      </div>
    )
  }
}

export default CharacteristicRating;