import React from 'react';

var MainImage = (props) => {

  var clickHandler = () => {
    props.toggleZoom();
  }

  var sizedImage = props.image.split('');
  sizedImage.splice(sizedImage.length - 33, 33);
  sizedImage = sizedImage.join('').concat('&w=400&h=600');

  return (
      <div className={'mainImageFrame'}>
        <img className={'mainImage'} onClick={clickHandler} src={sizedImage} alt={'Atelier main clothing image'}></img>
      </div>

  )

}

export default MainImage;