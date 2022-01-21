import React from 'react';

var MainImage = (props) => {

  var clickHandler = () => {
    props.toggleZoom();
  }

  if (props.image !== undefined) {

    var sizedImage = props.image.split('');
  sizedImage.splice(sizedImage.length - 33, 33);
  sizedImage = sizedImage.join('').concat('&w=400&h=600');

  return (
      <div className={'mainImageFrame'}>
        <img className={'mainImage'} onClick={clickHandler} src={sizedImage} alt={'Atelier main clothing image'} width={400} height={600}></img>
      </div>
  )

  } else {
    return <div>Loading...</div>
  }

}

export default MainImage;