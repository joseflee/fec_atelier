import React from 'react';
import AddToCart from '../subcomponents/overview/AddToCart.jsx';
import ImageGallery from '../subcomponents/overview/ImageGallery.jsx';
import ProductInfo from '../subcomponents/overview/ProductInfo.jsx';
import StyleSelector from '../subcomponents/overview/StyleSelector.jsx';

class Overview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      styles: props.styles,
      selectedStyle: 0,
    }

    this.changeStyle = this.changeStyle.bind(this);

  }

  componentDidMount() {
    console.log('component did mount');
    //console.log('styles =', this.state.styles)
  }

  handleChange() {

    // passes state changes (featured item) up to central App state for coordination
    // with other widgets when needed

  }

  changeStyle(name) {
    // updates state - selected style images for dist to image gallery

  }

  render() {

    return (
      <div id={'overview'}>
        <ProductInfo props={this.state}/>
        <ImageGallery selectedStyle={this.state.styles.results[this.state.selectedStyle]}/>
        <StyleSelector styles={this.state.styles} changeStyle={this.changeStyle}/>
        <AddToCart props={this.state}/>
      </div>
    )

  }

}

export default Overview;