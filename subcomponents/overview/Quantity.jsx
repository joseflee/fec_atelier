import React from 'react';

var Quantity = (props) => {


  var temporaryQuantityProp = 30;
  var temporaryQuantitiesProp = quantityToArray(temporaryQuantityProp);

  return (

    <select name={'quantities'} id={'quantitiesDropdown'}>{temporaryQuantitiesProp.map((item, i) => (
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