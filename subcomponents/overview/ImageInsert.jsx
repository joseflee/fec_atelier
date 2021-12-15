import React from 'react';
import $ from 'jquery';


class ImageInsert extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      temporaryImageProps: ['image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'],
    }

    this.updateScroll = this.updateScroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

  }



  updateScroll(e) {

    // for mockup purposes offset top: 213 is at topmost position of gallery
    // bottom position is 139

    var gallery = $('.thumbnailScroll');
    var offset = gallery.offset();
    var upAngle = $('.up_angle');
    var downAngle = $('.down_angle');

    console.log('offset.top = ', offset.top)


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
    console.log('handle scroll in this direction ', direction)
  }



  render() {
    return (
      <div>
      <img src={'./assets/up_angle.jpg'} className={"up_angle"} onClick={this.handleScroll}></img>
      <div className={'thumbnailGallery'} onScroll={this.updateScroll}>
        <div className={'thumbnailScroll'}>{this.state.temporaryImageProps.map((item, i) => (
          <div key={i} className={'thumbnailItem'}></div>
        ))}</div>
      </div>
      <img src={'./assets/down_angle.jpg'} className={"down_angle"} onClick={this.handleScroll}></img>
      </div>
    )
  }


}



export default ImageInsert;
