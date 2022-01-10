import React from 'react';

var MainImage = (props) => {

  var clickHandler = () => {
    props.toggleZoom();
  }

  return (
    <div className={'mainImageFrame'}>
        <img className={'mainImage'} onClick={clickHandler} src={props.image}></img>
    </div>
  )

}

export default MainImage;