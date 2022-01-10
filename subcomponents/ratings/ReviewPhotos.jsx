import React from 'react';

class ReviewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: null
    };
    this.handleModalView = this.handleModalView.bind(this);
    // this.unpackImages = this.unpackImages.bind(this);
  }

  // componentDidMount() {
  //   this.unpackImages();
  // }

  // unpackImages() {
  //   var photos = [];
  //   for (var i = 0; i < this.props.photos.length; i++) {
  //     console.log('url: ', this.props.photos[i].url);
  //     photos.push(this.props.photos[i]);
  //   }
  //   this.setState({photos: photos}, () => {
  //     console.log('state: ', this.state.photos);
  //   });
  // }

  handleModalView() {
    // create modal window for selected thumbnail
  }

    render() {
      return (
        <div className="reviewPhotos">
          {this.props.photos ? this.props.photos.map((photo, index) => (
            <img className="reviewImage" key={index} src={photo.url} onClick={this.handleModalView}></img>
          )) : null}
        </div>
      )
    }
}

export default ReviewPhotos;