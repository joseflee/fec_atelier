import React from 'react';

var MainImage = (props) => {

  var clickHandler = () => {
    props.toggleZoom();
  }

  return (

    <div className={'mainImage'} onClick={clickHandler}>{props.image}</div>

  )

}

export default MainImage;