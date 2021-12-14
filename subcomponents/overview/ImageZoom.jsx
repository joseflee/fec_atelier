import React from 'react';

class ImageZoom extends React.Component {

  // props will need to include full gallery

  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      currentImageIndex: 0
    }
  }

  handleImageChange() {
    // receives clicked dot index and sets currentImageIndex
  }

  // map-render index dots w/click handlers

  render() {

    return (

      <div id={'zoomView'}>
        <div>main image</div>
        <div>index dots</div>
      </div>

    )

  }

}


export default ImageZoom;