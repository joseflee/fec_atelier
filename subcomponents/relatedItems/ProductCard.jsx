import React from 'react';
import ratingToStar from '../../modules/stars.js';
import { Stars } from './StarRating.jsx';
import { BiStar } from 'react-icons/bi';


export class ProductCard extends React.Component {
  constructor( props ) {
    super( props );
    this.renderPrice = this.renderPrice.bind( this );
    this.renderImg = this.renderImg.bind( this );
    this.findDefault = this.findDefault.bind( this );
  }

  findDefault() {
    var defaultItem;
    this.props.itemInfo.results.forEach( item => {
      if ( item [ 'default?' ] ) {
        defaultItem = item;
      }
    })
    if ( !defaultItem ) {
      defaultItem = this.props.itemInfo.results[ 0 ];
    }
    return defaultItem;
  }

  renderPrice() {
    var defaultItem = this.findDefault();
    if ( defaultItem.sale_price ) {
      return <div>original price { defaultItem.original_price } sale price { defaultItem.sale_price }</div>
    } else {
      return <div>{ defaultItem.original_price }</div>
    }
  }

  renderImg() {
    var defaultItem = this.findDefault();
    if ( defaultItem.photos[0].url ) {
      var sizedImage = defaultItem.photos[0].url.split('');
      sizedImage.splice(sizedImage.length - 33, 33);
      sizedImage = sizedImage.join('').concat('&w=190&h=auto');
      return <div><img src={ sizedImage } className="cardImage" alt="product image" width={'190px'} height={'220px'} /></div>
    } else {
      return <div className="noPhoto centerVertical">No Photo Available</div>
    }
  }


  render() {
    return (
        <div onClick={ this.props.clickCard } data-txt={ this.props.data } className="card">
          <div className="cardImage">{ this.renderImg() }</div>
          <div className="RIcompare">
            <BiStar onClick={ this.props.clickStar } data-id={ this.props.data } />
          </div>
          <div className="RIproductInfo">
            <div className="RIcategory">{ this.props.itemInfo.category }</div>
            <div className='RIname'>{ this.props.itemInfo.name }</div>
            <div className='RIprice'>{ this.renderPrice() }</div>
            <div className="RIstars">
              <Stars rating={ this.props.itemInfo.rating } />
            </div>
          </div>
        </div>
    )
  }
}
