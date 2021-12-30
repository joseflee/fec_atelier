import React from 'react';
import Stars from './Stars.jsx';

var ProductInfo = (props) => {

  var name = props.product.name;
  var category = props.product.category;
  var price = props.product.default_price;
  var overview = props.product.description;

  return (

    <div className={'productInfo'}>
      <Stars props={props}/>
      <div id={'category-overview'}>{category}</div>
      <div id={'expandedProductName-overview'}>{name}</div>
      <div id={'price-overview'}>$ {price}</div>
      <div id={'productOverview-overview'}>{overview}</div>
    </div>

  )

};

export default ProductInfo;