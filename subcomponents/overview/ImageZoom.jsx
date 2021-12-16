import React from 'react';

class ImageZoom extends React.Component {

  // props will need to include full gallery

  constructor(props) {
    super(props);
    this.state = {
      gallery: ['image zoom 1', 'image zoom 2', 'image zoom 3', 'image zoom 4', 'image zoom 5'],
      currentImageIndex: 0,
      zoom: false
    }

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {

    // receives clicked dot index and sets currentImageIndex
    var value = Number(e.target.innerHTML[30]);

    //console.log('handle image change innerHTML = ', newIndex);

    this.setState({
      ...this.state,
      currentImageIndex: value,
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