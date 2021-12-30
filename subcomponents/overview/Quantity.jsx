import React from 'react';

var Quantity = (props) => {


  if (props.quantity === null) {
    return (
      <div>awaiting props</div>
    )
  }

  var quantity = quantityToArray(props.quantity);

  return (

    <select name={'quantities'} id={'quantitiesDropdown'}>{quantity.map((item, i) => (
      <option key={i} value={`${item}`}>{item}</option>
    ))}</select>

  )

}

// helper - converts quantity to array for map-render

var quantityToArray = (quantity) => {

  var result = [];

  for (var i = 1; i <= quantity; i++) {
    result.push(i);
  }

  if (result.length > 15) {
    result = result.splice(0, 15);
  }

  return result;

}



export default Quantity;