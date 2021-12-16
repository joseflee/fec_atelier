import React from 'react';

var Size = (props) => {

  var temporarySizesProp = ['x-small', 'small', 'medium', 'large', 'x-large'];

  return (

    <select name={'sizes'} id={'sizesDropdown'}>{temporarySizesProp.map((item, i) => (
      <option key={i} value={`${item}`}>{item}</option>
    ))}</select>

  )

}

export default Size;