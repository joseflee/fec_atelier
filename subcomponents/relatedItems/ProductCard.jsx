import React from 'react';

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div onClick={this.props.clickCard} className="card">
          <button onClick={this.props.clickStar}>compare</button>
          <div>Picture</div>
          <div>Category</div>
          <div>Price</div>
          <div>Rating</div>
        </div>
      </>
    )
  }
}