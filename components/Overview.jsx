import React from 'react';
import AddToCart from '../subcomponents/overview/AddToCart.jsx';
import ImageGallery from '../subcomponents/overview/ImageGallery.jsx';
import ProductInfo from '../subcomponents/overview/ProductInfo.jsx';
import StyleSelector from '../subcomponents/overview/StyleSelector.jsx';

class Overview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      styles: props.styles,
      selectedStyle: 0
    }

    this.changeStyle = this.changeStyle.bind(this);

  }

  componentDidMount() {
    console.log('component did mount');
  }


  changeStyle(newIndex) {
    this.setState({
      ...this.state,
      selectedStyle: newIndex
    }, () => {
      //console.log('new overview state selected style => ', this.state.selectedStyle);
    })

  }

  render() {

    return (
      <div id={'overview'}>
        <ProductInfo product={this.state.product}/>
        <ImageGallery styleIndex={this.state.styles.results[this.state.selectedStyle]} styles={this.state.styles} index={this.state.selectedStyle}/>
        <StyleSelector styles={this.state.styles} changeStyle={this.changeStyle}/>
        <AddToCart state={this.state}/>
      </div>
    )

  }

}

export default Overview;