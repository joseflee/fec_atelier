import React from 'react';

export class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFeatures: [],
      clickedCardFeatures: [],
      combinedFeatures: [],
      details: [],
    }
    this.renderRows = this.renderRows.bind(this);
    this.organizeFeatures = this.organizeFeatures.bind(this);

  }

  componentDidMount() {
    console.log('props', this.props);
    this.organizeFeatures();
  }

  organizeFeatures() {
    var currentFeatures = this.props.name.features;
    var clickedItemFeatures = this.props.relatedFeatures.features;
    var sortedFeatures = [];
    currentFeatures.forEach(item => {
      var storage = {};
      storage.feature = item.feature;
      storage.left = item.value;
      sortedFeatures.push(storage);
    });
    sortedFeatures.forEach(item => {
      for (var i = 0; i < clickedItemFeatures.length; i++) {
        if (clickedItemFeatures[i].feature === item.feature) {
          item.right = clickedItemFeatures[i].value;
          clickedItemFeatures.splice(i, 1);
          i = i--;
        }
      }
    });
    clickedItemFeatures.forEach(item => {
      var storage = {};
      storage.feature = item.feature;
      storage.right = item.value;
      sortedFeatures.push(storage);
    });
    this.setState({
      combinedFeatures: sortedFeatures
    }, () => {

    })

  }

  renderRows() {
    if (this.state.combinedFeatures.length > 0) {
      return (
        this.state.combinedFeatures.map((feature, index) => {
          return(
            <tr key={index} className="rowCharacteristic">
              <th className="comparisonRow thSize leftAndRight">{feature.left ? feature.left : null}</th>
              <th className="comparisonRow thSize middleColumn">{feature.feature}</th>
              <th className="comparisonRow thSize leftAndRight">{feature.right ? feature.right : null}</th>
            </tr>
          )
        })
      )
    }
  }

  render() {
    return (
      <div onClick={this.props.close} className="comparisonModal">
        <div className="comparingHeader">Comparing</div>
        <table>
          <thead>
            <tr>
              <th className="comparisonTopRow thSize">{this.props.name.name}</th>
              <th className="thSize"></th>
              <th className="comparisonTopRow thSize">{this.props.relatedFeatures.name}</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}


