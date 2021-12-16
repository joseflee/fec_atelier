import React from 'react';

class ImageZoom extends React.Component {

  // props will need to include full gallery

  constructor(props) {
    super(props);
    this.state = {
      gallery: ['main image'],
      currentImageIndex: 0
    }
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {

    // receives clicked dot index and sets currentImageIndex
    var value = e.target.innerHTML;
    var newIndex = Number(value.split('').splice(1).join(''));

    this.setState({
      ...this.state,
      currentImageIndex: newIndex,
    })

  }

  // map-render index dots w/click handlers

  render() {

    return (

      <div id={'zoomView'}>
        <div>{this.state.gallery[this.state.currentImageIndex]}</div>
        <div>{this.state.gallery.map((item, i) => (
          <div key={i} className={'scrollDot'} onClick={this.handleImageChange}>.<span className={'invisibleIndex'}>{i}</span></div>
        ))
        }</div>
      </div>

    )

  }

}

export default ImageZoom;