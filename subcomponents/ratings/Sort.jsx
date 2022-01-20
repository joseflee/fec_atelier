import React from 'react';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false
    };
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleDropdown() {
    this.setState({ showOptions: !this.state.showOptions });
  }

  render() {
    return (
      <div id="sortReviews">
        <div id="sortBar">
          <div id="reviewCount">{this.props.reviewCount} reviews, </div>
          <div id="sortTitle" onClick={this.handleDropdown}> sort by <span id="sortCaret"></span></div>
        </div>
        {this.state.showOptions ? <div id="sortDropdown">
          <div className="sortOption" onClick={this.props.handleSort}>Relevance</div>
          <div className="sortOption" onClick={this.props.handleSort}>Helpfulness</div>
          <div className="sortOption" onClick={this.props.handleSort}>Newest</div>
        </div> : null}
      </div>
    )
  }
};

export default Sort;