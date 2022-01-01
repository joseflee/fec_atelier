import React from 'react';

export class ComparisonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    }
  }


  render() {
    return (
      <div onClick={this.props.close} className="comparisonModal">
        <h5>Comparing</h5>
        <table>

        </table>
      </div>
    )
  }
}


/*


Need a table
table will have three columns
the rows will be rendered dynamically
*/