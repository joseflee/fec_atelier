import React from 'react';
import $ from 'jquery';
import ImageInsert from './ImageInsert.jsx';
import ImageZoom from './ImageZoom.jsx';
import MainImage from './MainImage.jsx';


class ImageGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: props.styleIndex,
      styles: props.styles.results,
      newGallery: [],
      featureImage: 0,
      zoom: false,
      selectedIndex: props.index
    }

    this.toggleZoom = this.toggleZoom.bind(this);
    this.switchZoomDisplay = this.switchZoomDisplay.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateArrows = this.updateArrows.bind(this);
    this.syncThumbnail = this.syncThumbnail.bind(this);
    this.closeZoom = this.closeZoom.bind(this);
    this.unpackImages = this.unpackImages.bind(this);
    this.changeFeaturedImage = this.changeFeaturedImage.bind(this);

  }

  componentDidMount() {

    this.unpackImages();

  }

  componentDidUpdate() {

    if (this.state.selectedStyle !== this.props.styleIndex) {
      this.setState({
        ...this.state,
        selectedStyle: this.props.styleIndex,
        featureImage: 0
      }, () => {
        this.unpackImages();
      })
    }

  }


  unpackImages() {

    var styleImages = this.state.selectedStyle.photos;
    //var styleImages = this.state.styles[this.state.selectedIndex].photos;
    var mainURLs = [];
    var galleryIsNew = false;

    for (var i = 0; i < styleImages.length; i++) {
      mainURLs.push(styleImages[i].url);
    }

    // checks if existing gallery has been updated with new style
    for (var i = 0; i < styleImages.length; i++) {
      if (styleImages[i] !== this.state.newGallery[i]) {
        galleryIsNew = true;
      }
    }

    // if style is new or the gallery is empty, update gallery
    if (galleryIsNew === true || this.state.newGallery.length === 0) {
      this.setState({
        ...this.state,
        newGallery: mainURLs,
      }, () => {
        var i = this.state.featureImage;
        var scrollBox = $('.thumbnailScroll');
        scrollBox.children('div').eq(i).css('border', '1px solid black');
        this.updateArrows();
      })
    }

  }

  // ImageZoom component has CSS display set to "none" until toggled

  toggleZoom() {

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

  // hides/displays L/R scroll arrows based on gallery index
  updateArrows() {

    var left = $('.left_angle');
    var right = $('.right_angle');
    var index = this.state.featureImage;

    if (index === 0 && this.state.newGallery.length > 1) {
      left.css('visibility', 'hidden');
      right.css('visibility', 'visible')
    } else if (index > 0 && index < this.state.newGallery.length - 1) {
      left.css('visibility', 'visible');
      right.css('visibility', 'visible');
    } else if (index === this.state.newGallery.length - 1 && index > 0) {
      left.css('visibility', 'visible');
      right.css('visibility', 'hidden');
    } else if (this.state.newGallery.length === 1) {
      left.css('visibility', 'hidden');
      right.css('visibility', 'hidden');
    }

  }

  syncThumbnail() {

    var i = this.state.featureImage;
    var scrollBox = $('.thumbnailScroll');
    scrollBox.children().css('border', '1px solid rgba(0, 0, 0, .3)');
    scrollBox.children().eq(i).css('border', '1px solid black');

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
      this.updateArrows();
      this.syncThumbnail();
    });

  }

  closeZoom() {

    var zoomView = $('#zoomView');
    zoomView.css('display', 'none');

  }

  changeFeaturedImage(newIndex) {

    if (this.state.featureImage !== newIndex) {
      this.setState({
        ...this.state,
        featureImage: newIndex
      }, () => {
        this.updateArrows();
      })
    }

  }

  render() {

    return (

      <div className={'imageGallery'}>
        <img className={'left_angle'} src={'./assets/left_angle.png'} onClick={() => { this.handleScroll('left') }} />
        <img className={'right_angle'} src={'./assets/right_angle.png'} onClick={() => { this.handleScroll('right') }} />
        <ImageInsert featureImage={this.state.featureImage} selectedStyle={this.state.selectedStyle} cb={this.changeFeaturedImage} />
        <div className={'mainFrame'}>
          <MainImage image={this.state.newGallery[this.state.featureImage]} toggleZoom={this.toggleZoom} />
        </div>
        <ImageZoom selectedStyle={this.state.selectedStyle} featureImage={this.state.featureImage} closeZoom={this.closeZoom} />
      </div>

    )

  }

};



export default ImageGallery;

