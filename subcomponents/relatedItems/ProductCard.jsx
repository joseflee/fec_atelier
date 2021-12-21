import React from 'react';
import ratingToStar from '../../modules/stars.js';

//var starClass = 'stars-outer stars-outer::before stars-inner stars-inner::before';
//var starClass = 'stars-outer stars-outer::before';
var starClass = 'stars-outer';

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div onClick={this.props.clickCard} className="card">
          <button onClick={this.props.clickStar}>compare</button>
          <div>{this.props.itemInfo.picture}</div>
          <div>{this.props.itemInfo.category}</div>
          <div>{this.props.itemInfo.price}</div>
          <div className={starClass}>{ratingToStar(this.props.itemInfo.rating)}</div>
        </div>
      </>
    )
  }
}