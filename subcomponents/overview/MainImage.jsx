import React from 'react';

var MainImage = (props) => {

  var clickHandler = () => {
    props.toggleZoom();
  }

  return (
      <div className={'mainImageFrame'}>
        <img className={'mainImage'} onClick={clickHandler} src={props.image} alt={'Atelier main clothing image'}></img>
      </div>

  )

}

export default MainImage;