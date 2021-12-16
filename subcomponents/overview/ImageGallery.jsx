import React from 'react';
import $ from 'jquery';
import ImageInsert from './ImageInsert.jsx';
import ImageZoom from './ImageZoom.jsx';
import MainImage from './MainImage.jsx';


class ImageGallery extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

      gallery: ["image 1", 'image 2', 'image 3', 'image 4', 'image 5', 'image 6', 'image 7'],
      featureImage: 0,
      zoom: false

    }

    this.toggleZoom = this.toggleZoom.bind(this);
    this.switchZoomDisplay = this.switchZoomDisplay.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateArrows = this.updateArrows.bind(this);

  }

  componentDidMount() {


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

  updateArrows() {

    var left = $('.left_angle');
    var right = $('.right_angle');
    var index = this.state.featureImage;

    if (index === 0) {
      left.css('visibility', 'hidden');
      right.css('visibility', 'visible')
    } else if (index > 0 && index < this.state.gallery.length - 1) {
      left.css('visibility', 'visible');
      right.css('visibility', 'visible');
    } else if (index === this.state.gallery.length - 1) {
      left.css('visibility', 'visible');
      right.css('visibility', 'hidden');
    }

  }

  handleScroll(direction) {

    var newIndex;

    if (direction === 'right') {
      newIndex = this.state.featureImage + 1;
    } else if (direction === 'left') {
      newIndex = this.state.featureImage - 1;
    }

    this.setState({
      ...this.state,
      featureImage: newIndex
    }, () => {
      this.updateArrows()
    })


  }

  render() {

    return (

      <div className={'imageGallery'}>
        <img className={'left_angle'} src={'./assets/left_angle.png'} onClick={() => { this.handleScroll('left') }}/>
        <img className={'right_angle'} src={'./assets/right_angle.png'} onClick={() => { this.handleScroll('right') }}/>
        <MainImage image={this.state.gallery[this.state.featureImage]} toggleZoom={this.toggleZoom}/>
        <ImageInsert gallery={this.state.gallery} featureImage={this.state.featureImage}/>
        <ImageZoom props={this.state} />
      </div>

    )

  }

};

export default ImageGallery;

