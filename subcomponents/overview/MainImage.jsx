import React from 'react';

var MainImage = (props) => {

  var clickHandler = () => {
    props.toggleZoom();
  }

  return (

    <img className={'mainImage'} onClick={clickHandler} src={props.image}></img>

  )

}

export default MainImage;