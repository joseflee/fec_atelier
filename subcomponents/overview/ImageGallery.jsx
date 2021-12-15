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

    this.toggleZoom = this.toggleZoom.bind(this);
    this.switchZoomDisplay = this.switchZoomDisplay.bind(this);

  }

  // ImageZoom component has CSS display set to "none" until toggled

  toggleZoom() {
    // handles click on image to produce zoomed image
    var newZoom;

    if (this.state.zoom === true) {
      newZoom = false;
    } else {
      newZoom = true;
    }

    this.setState({
      ...this.state,
      zoom: newZoom
    }, () => {
      this.switchZoomDisplay();
    })



  }

  switchZoomDisplay() {

    var zoomView = $('#zoomView');

    if (this.state.zoom === true) {
      zoomView.css('display', 'inline-block');
    } else {
      zoomView.css('display', 'none');
    }

  }


  render() {

    return (

      <div className={'imageGallery'}>
        <div onClick={this.toggleZoom}>Main Image</div>
        <ImageInsert props={this.props} />
        <ImageZoom props={this.state} />
      </div>

    )

  }

};

export default ImageGallery;

