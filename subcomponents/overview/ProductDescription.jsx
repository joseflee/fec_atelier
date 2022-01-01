import React from 'react';

var ProductDescription = (props) => {

  return (
    <div className={'descriptionBox'}>
      <div className={'description'}>{props.description}</div>
    </div>
  )

}


export default ProductDescription;