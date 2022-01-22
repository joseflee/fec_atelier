import React, { Suspense, lazy } from 'react';
import ProductInfo from '../subcomponents/overview/ProductInfo.jsx';
import ProductDescription from '../subcomponents/overview/ProductDescription.jsx';

//import StyleSelector from '../subcomponents/overview/StyleSelector.jsx';
//import AddToCart from '../subcomponents/overview/AddToCart.jsx';
//import ImageGallery from '../subcomponents/overview/ImageGallery.jsx';

const AddToCart = lazy(() => import('../subcomponents/overview/AddToCart.jsx'));
const ImageGallery = lazy(() => import('../subcomponents/overview/ImageGallery.jsx'));
const StyleSelector = lazy(() => import('../subcomponents/overview/StyleSelector.jsx'));


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

  changeStyle(newIndex) {
    this.setState({
      ...this.state,
      selectedStyle: newIndex
    })
  }

  render() {

    return (
      <div id={'overview'} height={'750'} width={'100%'}>

        <div className={'leftPanel'}>

          <Suspense fallback={<div>Loading...</div>}>
            <ImageGallery styleIndex={this.props.styles.results[this.state.selectedStyle]} styles={this.props.styles} index={this.state.selectedStyle} style={this.props.styles.results[this.state.selectedStyle]} />
          </Suspense>

          <ProductDescription description={this.props.product.description} />

        </div>

        <div className={'rightPanel'}>

          <ProductInfo product={this.props.product} rating={this.props.rating} trackClick={this.props.trackClick} />

          <Suspense fallback={<div>Loading...</div>}>
            <StyleSelector styles={this.props.styles} changeStyle={this.changeStyle} />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <AddToCart state={this.state} />
          </Suspense>

        </div>
      </div>
    )

  }

}

export default Overview;