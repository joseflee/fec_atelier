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
    this.organizeFeatures();
    console.log('self', this.props.self, this.props.features)
    // this.setState({
    //   currentFeatures: this.props.features,
    //   clickedCardFeatures: this.props.relatedFeatures,
    // }, () => {

    // })
  }

  organizeFeatures() {
    var currentFeatures = this.props.self.features;
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
            <tr key={index}>
              <th className="comparisonRow">{feature.left ? feature.left : null}</th>
              <th className="comparisonRow">{feature.feature}</th>
              <th className="comparisonRow">{feature.right ? feature.right : null}</th>
            </tr>
          )
        })
      )
    }
  }

  render() {
    return (
      <div onClick={this.props.close} className="comparisonModal">
        <h5>Comparing</h5>
        <table>
          <thead>
            <tr>
              <th className="comparisonTopRow">{this.props.self.name}</th>
              <th className="comparisonTopRow"></th>
              <th className="comparisonTopRow">{this.props.relatedFeatures.name}</th>
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


