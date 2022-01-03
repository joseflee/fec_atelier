import React from 'react';

export class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFeatures: [],
      details: [],
    }
    this.renderRows = this.renderRows.bind(this);
  }

  componentDidMount() {
    console.log(this.props.features);
    this.setState({
      currentFeatures: this.props.features,
    })
  }

  renderRows() {
    if (this.state.currentFeatures.length > 0) {
      return (
        this.state.currentFeatures.map((feature, index) => {
          return(
            <tr key={index}>
              <th>{feature.value}</th>
              <th>{feature.feature}</th>
              <th></th>
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
              <th>column 1</th>
              <th>characteristic</th>
              <th>column 2</th>
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


