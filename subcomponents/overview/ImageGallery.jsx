import React from 'react';
import ImageInsert from './ImageInsert.jsx';
import ImageZoom from './ImageZoom.jsx';

class ImageGallery extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

      gallery: [],
      featureImage: null,
      zoom: false

    }
  }

  // ImageZoom component has CSS display set to "none" until toggled

  toggleZoom() {
    // handles click on image to produce zoomed image
  }


  render() {

    return (

      <div className={'imageGallery'}>
        <div>Image Gallery</div>
        <ImageInsert props={this.props} />
        <ImageZoom props={this.state}/>
      </div>

    )

  }

};

export default ImageGallery;

