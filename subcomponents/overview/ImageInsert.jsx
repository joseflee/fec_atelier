import React from 'react';
import $ from 'jquery';


class ImageInsert extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      temporaryImageProps: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'],
      gallery: props.gallery,
      featureImage: props.featureImage
    }

    this.updateArrows = this.updateArrows.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateThumbnailBorder = this.updateThumbnailBorder.bind(this);

  }

  componentDidMount() {

    console.log('state gallery in image insert => ', this.props)

  }

  updateThumbnailBorder() {


  }


  updateArrows(e) {

    // for mockup purposes offset top: 216 is at topmost position of gallery
    // bottom position is 142
    // values will change when restyling

    var gallery = $('.thumbnailScroll');
    var offset = gallery.offset();
    var upAngle = $('.up_angle');
    var downAngle = $('.down_angle');


    if (Math.floor(offset.top) >= 249) {
      upAngle.css('visibility', 'hidden');
      downAngle.css('visibility', 'visible');
    } else if (Math.floor(offset.top) <= 175) {
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

    // For spacing calibration after restyling
    //console.log(offset);

    if (direction === 'down' && Math.floor(offset.top) > 175) {
      shift = offset.top - 20;
      gallery.offset({ top: shift, left: 20 });
    } else if (direction === 'up' && Math.floor(offset.top) < 249) {
      shift = offset.top + 20;
      gallery.offset({ top: shift, left: 20 });
    }

    this.updateArrows();

  }


  render() {
    return (
      <div>
      <img src={'./assets/up_angle.png'} className={"up_angle"} onClick={() => {this.handleScroll('up')}}></img>
      <div className={'thumbnailGallery'} onScroll={this.updateArrows}>
        <div className={'thumbnailScroll'}>{this.state.gallery.map((item, i) => (
          <img key={i} className={'thumbnailItem'} src={item}/>
        ))}</div>
      </div>
      <img src={'./assets/down_angle.png'} className={"down_angle"} onClick={() => {this.handleScroll('down')}}></img>
      </div>
    )
  }


}



export default ImageInsert;
