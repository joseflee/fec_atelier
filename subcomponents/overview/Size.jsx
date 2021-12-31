import React from 'react';

var Size = (props) => {

  if (props.availableSizes.length === 0) {
    return (
      <div>awaiting props</div>
    )
  }

  var handleChange = (e) => {
    var size = e.target.value
    props.updateQuantity(size)
  }

  return (

    <select name={'sizes'} id={'sizesDropdown'} onChange={handleChange}>{props.availableSizes.map((item, i) => (
      <option key={i} value={`${item}`}>{item}</option>
    ))}</select>

  )

}

export default Size;