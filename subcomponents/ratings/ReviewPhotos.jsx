import React from 'react';

class ReviewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedURL: null,
      modal: false
    };
    this.handleModalView = this.handleModalView.bind(this);
    this.unpackImages = this.unpackImages.bind(this);
    this.handleModalView = this.handleModalView.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    this.unpackImages();
  }

  unpackImages() {
    var photos = [];
    for (var i = 0; i < this.props.photos.length; i++) {
      photos.push(this.props.photos[i]);
    }
    this.setState({photos: photos});
  }

  handleModalClose() {
    this.setState({
      modal: false
    })
  }

  handleModalView(e) {
    var selected = Number(e.target.id);
    var photos = this.state.photos;

    for (var i = 0; i < photos.length; i++) {
      if (photos[i].id === selected) {
        this.setState({
          modal: true,
          selectedURL: photos[i].url
        });
      }
    }

  }


    render() {
      return (
        <div className="reviewPhotos">
          {this.state.modal ? <div className="reviewPhotoWindow" onClick={this.handleModalClose}>
            <img className="reviewModalImg" src={this.state.selectedURL}></img>
          </div> : null}
          {this.props.photos ? this.props.photos.map((photo, index) => (
            <img className="reviewImage" key={index} src={photo.url} onClick={this.handleModalView} id={photo.id}></img>
          )) : null}
        </div>
      )
    }
}

export default ReviewPhotos;