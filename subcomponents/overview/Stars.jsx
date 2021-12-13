import React from 'react';

var Stars = (props) => {

  var handleClick = (e) => {
    // redirect on page to ratings and reviews section
    // props.cb()
  }

  return (

    <div>
      <div onClick={handleClick}>star rating</div>
      <div onClick={handleClick}>read all reviews</div>
    </div>

  )

}

export default Stars;