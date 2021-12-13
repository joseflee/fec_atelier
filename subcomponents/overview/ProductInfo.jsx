import React from 'react';
import Stars from './Stars.jsx';

var ProductInfo = (props) => {


  return (

    <div className={'productInfo'}>
      <Stars props={props}/>
      <div id={'category-overview'}>Category</div>
      <div id={'expandedProductName-overview'}>Expanded Product Name</div>
      <div id={'price-overview'}>Price</div>
      <div id={'productOverview-overview'}>Product Overview</div>
    </div>

  )


};

export default ProductInfo;