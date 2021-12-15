import React from 'react';

var ImageInsert = (props) => {

  var temporaryImageProps = ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'];

  return (
    <div className={'thumbnailGallery'}>{temporaryImageProps.map((item, i) => (
      <div key={i} className={'thumbnailItem'}>{item}</div>
    ))}</div>
  )

}

export default ImageInsert;
