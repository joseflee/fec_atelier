import React from 'react';
import $ from 'jquery';


class ImageInsert extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      temporaryImageProps: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'],
    }

    this.updateArrows = this.updateArrows.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

  }



  updateArrows(e) {

    // for mockup purposes offset top: 216 is at topmost position of gallery
    // bottom position is 142
    // values will change when restyling

    var gallery = $('.thumbnailScroll');
    var offset = gallery.offset();
    var upAngle = $('.up_angle');
    var downAngle = $('.down_angle');

    if (offset.top === 216) {
      console.log('block entered')
      upAngle.css('visibility', 'hidden');
      downAngle.css('visibility', 'visible');
    } else if (offset.top === 142) {
      console.log('other block entered')
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

    if (direction === 'down' && offset.top > 142) {
      shift = offset.top - 20;
      gallery.offset({ top: shift, left: 20 });
    } else if (direction === 'up' && offset.top < 216) {
      shift = offset.top + 20;
      gallery.offset({ top: shift, left: 20 });
    }

    this.updateArrows();

  }



  render() {
    return (
      <div>
      <img src={'./assets/up_angle.jpg'} className={"up_angle"} onClick={() => {this.handleScroll('up')}}></img>
      <div className={'thumbnailGallery'} onScroll={this.updateArrows}>
        <div className={'thumbnailScroll'}>{this.state.temporaryImageProps.map((item, i) => (
          <div key={i} className={'thumbnailItem'}></div>
        ))}</div>
      </div>
      <img src={'./assets/down_angle.jpg'} className={"down_angle"} onClick={() => {this.handleScroll('down')}}></img>
      </div>
    )
  }


}



export default ImageInsert;
