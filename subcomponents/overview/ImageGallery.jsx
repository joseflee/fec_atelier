import React from 'react';
import $ from 'jquery';
import ImageInsert from './ImageInsert.jsx';
import ImageZoom from './ImageZoom.jsx';
import MainImage from './MainImage.jsx';


class ImageGallery extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

      selectedStyle: props.selectedStyle,
      newGallery: [],
      thumbGallery: [],
      gallery: ["image 1", 'image 2', 'image 3', 'image 4', 'image 5', 'image 6', 'image 7'],
      featureImage: 0,
      zoom: false

    }

    this.toggleZoom = this.toggleZoom.bind(this);
    this.switchZoomDisplay = this.switchZoomDisplay.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateArrows = this.updateArrows.bind(this);
    this.syncThumbnail = this.syncThumbnail.bind(this);
    this.closeZoom = this.closeZoom.bind(this);
    this.unpackImages = this.unpackImages.bind(this);

  }

  componentDidMount() {

    this.unpackImages();

  }

  unpackImages() {

    var styleImages = this.state.selectedStyle.photos;
    var thumbURLs = [];
    var mainURLs = [];

    for (var i = 0; i < styleImages.length; i++) {
      thumbURLs.push(styleImages[i].thumbnail_url);
      mainURLs.push(styleImages[i].url);
    }

    this.setState({
      ...this.state,
      newGallery: mainURLs,
      thumbGallery: thumbURLs
    }, () => {
      // console.log('state thumbnails => ', this.state.thumbGallery)
      // console.log('state gallery => ', this.state.newGallery)
      var i = this.state.featureImage;
      var scrollBox = $('.thumbnailScroll');
      scrollBox.children('div').eq(i).css('border', '1px solid black');
    })

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

  syncThumbnail() {

    console.log('sync thumbnail invoked')

    var i = this.state.featureImage;
    var scrollBox = $('.thumbnailScroll');
    scrollBox.children().css('border', '1px solid rgba(0, 0, 0, .3)');
    scrollBox.children().eq(i).css('border', '1px solid black');

  }

  handleScroll(direction) {

    console.log('handle scroll toggle')

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
      this.updateArrows();
      this.syncThumbnail();
    });


  }

  closeZoom() {

    var zoomView = $('#zoomView');
    zoomView.css('display', 'none');

  }

  render() {

    return (

      <div className={'imageGallery'}>
        <img className={'left_angle'} src={'./assets/left_angle.png'} onClick={() => { this.handleScroll('left') }} />
        <img className={'right_angle'} src={'./assets/right_angle.png'} onClick={() => { this.handleScroll('right') }} />
        <MainImage image={this.state.newGallery[this.state.featureImage]} toggleZoom={this.toggleZoom} />
        <ImageInsert gallery={this.state.thumbGallery} featureImage={this.state.featureImage} />
        <ImageZoom props={this.state.gallery[this.state.featureImage]} closeZoom={this.closeZoom} />
      </div>

    )

  }

};

export default ImageGallery;

