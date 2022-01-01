import React from 'react';
import Stars from './Stars.jsx';

var ProductInfo = (props) => {

  var name = props.product.name;
  var category = props.product.category;
  var price = props.product.default_price;
  var overview = props.product.description;

  return (

    <div className={'productInfo'}>
      <div className={'starbox'}>
        <Stars props={props} />
      </div>
      <div id={'category-overview'}>{category}</div>
      <div id={'expandedProductName-overview'} className={'productName'}>{name}</div>
      <div id={'price-overview'} className={'price'}>$ {price}</div>
    </div>

  )

};

export default ProductInfo;