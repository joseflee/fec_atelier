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
          <div>Picture {this.props.itemInfo.picture}</div>
          <div>Category {this.props.itemInfo.category}</div>
          <div>Price {this.props.itemInfo.price}</div>
          <div>Rating {this.props.itemInfo.rating}</div>
        </div>
      </>
    )
  }
}