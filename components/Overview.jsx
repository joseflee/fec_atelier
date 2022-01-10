import React from 'react';
import AddToCart from '../subcomponents/overview/AddToCart.jsx';
import ImageGallery from '../subcomponents/overview/ImageGallery.jsx';
import ProductInfo from '../subcomponents/overview/ProductInfo.jsx';
import StyleSelector from '../subcomponents/overview/StyleSelector.jsx';
import ProductDescription from '../subcomponents/overview/ProductDescription.jsx';

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

  }

  componentDidUpdate() {

  }


  changeStyle(newIndex) {
    this.setState({
      ...this.state,
      selectedStyle: newIndex
    })
  }

  render() {

    return (
      <div id={'overview'}>
        <div className={'leftPanel'}>
          <ImageGallery styleIndex={this.props.styles.results[this.state.selectedStyle]} styles={this.props.styles} index={this.state.selectedStyle} style={this.props.styles.results[this.state.selectedStyle]} />
          <ProductDescription description={this.props.product.description}/>
        </div>
        <div className={'rightPanel'}>
          <ProductInfo product={this.props.product} rating={this.props.rating} />
          <StyleSelector styles={this.props.styles} changeStyle={this.changeStyle} />
          <AddToCart state={this.state} />
        </div>
      </div>
    )

  }

}

export default Overview;