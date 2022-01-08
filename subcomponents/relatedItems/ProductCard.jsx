import React from 'react';
import ratingToStar from '../../modules/stars.js';
import {Stars} from './StarRating.jsx';


export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.renderPrice = this.renderPrice.bind(this);
    this.renderImg = this.renderImg.bind(this);
    this.findDefault = this.findDefault.bind(this);
  }

  findDefault() {
    var defaultItem;
    this.props.itemInfo.results.forEach(item => {
      if (item['default?']) {
        defaultItem = item;
      }
    })
    if (!defaultItem) {
      defaultItem = this.props.itemInfo.results[0];
    }
    return defaultItem;
  }

  renderPrice() {
    var defaultItem = this.findDefault();
    if (defaultItem.sale_price) {
      return <div>original price {defaultItem.original_price} sale price {defaultItem.sale_price}</div>
    } else {
      return <div>{defaultItem.original_price}</div>
    }
  }

  renderImg() {
    var defaultItem = this.findDefault();
    if (defaultItem.photos[0].url) {
      return <div><img src={defaultItem.photos[0].url} className="cardImage" /></div>
    } else {
      return <div>no photo</div>
    }
  }


  render() {
    return (
      <>
        <div onClick={this.props.clickCard} data-txt={this.props.data} className="card">
          {this.renderImg()}
          <button onClick={this.props.clickStar} data-id={this.props.data} className="fas fa-star oneStar">compare</button>
          <div>{this.props.itemInfo.category}</div>
          <div>{this.props.itemInfo.name}</div>
          {this.renderPrice()}
          <Stars rating={this.props.itemInfo.rating} />
        </div>
      </>
    )
  }
}
