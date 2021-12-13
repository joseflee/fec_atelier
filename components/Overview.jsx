import React from 'react';
import AddToCart from '../subcomponents/overview/AddToCart.jsx';
import ImageGallery from '../subcomponents/overview/ImageGallery.jsx';
import ProductInfo from '../subcomponents/overview/ProductInfo.jsx';
import StyleSelector from '../subcomponents/overview/StyleSelector.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id={'overview'}>
        <ProductInfo props={this.state}/>
        <ImageGallery props={this.state}/>
        <StyleSelector props={this.state}/>
        <AddToCart props={this.state}/>
      </div>
    )
  }

}

export default Overview;