import React from 'react';
import $ from 'jquery';


class ImageInsert extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gallery: props.gallery,
      featureImage: props.featureImage,
      thumbGallery: [],
      selectedStyle: props.selectedStyle
    }

    this.updateArrows = this.updateArrows.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateThumbnailBorder = this.updateThumbnailBorder.bind(this);
    this.unpackImages = this.unpackImages.bind(this);
    this.changeFeaturedImage = this.changeFeaturedImage.bind(this);

  }

  componentDidMount() {

    this.unpackImages();

  }

  componentDidUpdate() {

    if (this.props.selectedStyle !== this.state.selectedStyle) {
      this.setState({
        ...this.state,
        selectedStyle: this.props.selectedStyle
      }, () => {
        this.unpackImages();
      })
    }

  }

  unpackImages() {

    var styleImages = this.state.selectedStyle.photos;
    var thumbURLs = [];
    var galleryIsNew = false;

    for (var i = 0; i < styleImages.length; i++) {
      thumbURLs.push(styleImages[i].thumbnail_url);
    }

    for (var i = 0; i < thumbURLs.length; i++) {
      if (thumbURLs[i] !== this.state.thumbGallery[i]) {
        galleryIsNew = true;
      }
    }

    if (galleryIsNew === true || this.state.thumbGallery.length === 0) {
      this.setState({
        ...this.state,
        thumbGallery: thumbURLs
      }, () => {
        var i = this.state.featureImage;
        var scrollBox = $('.thumbnailScroll');
        scrollBox.children('div').eq(i).css('border', '1px solid black');
      })
    }

  }

  updateThumbnailBorder() {

  }

  updateArrows(e) {

    // for mockup purposes offset top: 266 is at topmost position of gallery
    // bottom position is 166
    // values will change when restyling

    var gallery = $('.thumbnailScroll');
    var offset = gallery.offset();
    var upAngle = $('.up_angle');
    var downAngle = $('.down_angle');

    //console.log('offset top => ', offset.top)

    if (Math.floor(offset.top) >= 266) {
      upAngle.css('visibility', 'hidden');
      downAngle.css('visibility', 'visible');
    } else if (Math.floor(offset.top) <= 166) {
      upAngle.css('visibility', 'visible');
      downAngle.css('visibility', 'hidden');
    } else {
      upAngle.css('visibility', 'visible');
      downAngle.css('visibility', 'visible');
    }

  }

  handleScroll(direction) {

    var gallery = $('.thumbnailScroll');
    var offset = gallery.offset();
    var shift;

    if (direction === 'down' && Math.floor(offset.top) > 166) {
      shift = offset.top - 20;
      gallery.offset({ top: shift, left: 115 });
    } else if (direction === 'up' && Math.floor(offset.top) < 266) {
      shift = offset.top + 20;
      gallery.offset({ top: shift, left: 115 });
    }

    this.updateArrows();

  }

  changeFeaturedImage(e) {
    var newIndex;
    for (var i = 0; i < this.state.thumbGallery.length; i++) {
      if (this.state.thumbGallery[i] === e.target.src) {
        newIndex = i;
      }
    }
    this.props.cb(newIndex);
  }


  render() {
    return (
      <div className={'imageInsert'}>
      <img src={'./assets/up_angle.png'} className={"up_angle"} onClick={() => {this.handleScroll('up')}}></img>
      <div className={'thumbnailGallery'} onScroll={this.updateArrows}>
        <div className={'thumbnailScroll'}>{this.state.thumbGallery.map((item, i) => (
          <img key={i} className={'thumbnailItem'} src={item} onClick={this.changeFeaturedImage}/>
        ))}</div>
      </div>
      <img src={'./assets/down_angle.png'} className={"down_angle"} onClick={() => {this.handleScroll('down')}}></img>
      </div>
    )
  }


}



export default ImageInsert;
