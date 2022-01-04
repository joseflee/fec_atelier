import React from 'react';
import Size from './Size.jsx';
import Quantity from './Quantity.jsx';

class AddToCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      SKUbySize: null,
      inventoryBySize: null,
      quantitySelected: null,
      quantityAvailable: null,
      styleSelected: null,
      availableSizes: [],
      sizeSelected: null,
      selectedIndex: null,
    }

    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.starItem = this.starItem.bind(this);
    this.unpackProps = this.unpackProps.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);

  }

  componentDidMount() {
    this.unpackProps();
  }

  componentDidUpdate() {
    this.unpackProps();
  }

  unpackProps() {

    var props = this.props.state;
    var selectedIndex = props.selectedStyle;
    var styles = props.styles.results;
    var selectedStyle = styles[selectedIndex];

    var SKUbySize = {};
    var inventoryBySize = {};
    var availableSizes = [];

    var isNewStyle = false;

    // sort inventory by sku
    for (var key in selectedStyle.skus) {
      var size = selectedStyle.skus[key].size;
      SKUbySize[size] = key;
    }

    // sort inventory by size / quantity
    for (var key in selectedStyle.skus) {
      var size = selectedStyle.skus[key]['size'];
      inventoryBySize[size] = selectedStyle.skus[key]['quantity']
    }

    // gather available sizes
    for (var key in selectedStyle.skus) {
      availableSizes.push(selectedStyle.skus[key]['size']);
    }

    var selectedSize = availableSizes[0];
    var quantityAvailable = inventoryBySize[selectedSize];

    // check if incoming props contain new style

    if (selectedIndex !== this.state.selectedIndex) {
      this.setState({
        ...this.state,
        selectedIndex: selectedIndex,
        SKUbySize: SKUbySize,
        inventoryBySize: inventoryBySize,
        availableSizes: availableSizes,
        sizeSelected: selectedSize,
        quantityAvailable: quantityAvailable
      }, () => {
        this.updateQuantity();
      })
    }

  }

  // checks size selected and updates quantity available
  updateQuantity(size) {

    var sizeSelected = this.state.sizeSelected;

    if (this.state.sizeSelected !== size) {
      sizeSelected = size;
    }

    var currentQuantityAvailable = this.state.quantityAvailable;
    var inventory = this.state.inventoryBySize;
    var available = inventory[sizeSelected];

    if (available !== currentQuantityAvailable) {
      this.setState({
        ...this.state,
        quantityAvailable: available
      }, () => {
        //console.log('this is the quantity available ', this.state.quantityAvailable)
      })
    }

  }

  validateForm() {

    // checks this.state.inventory against form field selections
    // and responds by setting correct form field values in state
    // (i.e. size received from form, quantityAvailable is based on size selected)

  }

  submitForm() {
    // form submission handling
  }

  starItem() {
    // uses passed-in callback to update central app state with starred item for user
  }

  render() {

    var star = '&#9733';

    return (

      <div className={'addToCart'}>
        <div className={'addToCartRow1'}>
          <Size availableSizes={this.state.availableSizes} updateQuantity={this.updateQuantity} />
          <Quantity quantity={this.state.quantityAvailable} cb={this.validateForm} />
        </div>
        <div className={'addToCartRow2'}>
          <button onClick={this.submitForm} className={'addToCartButton'}>ADD TO BAG</button>
          <button onClick={this.starItem} className={'starButton'}>★</button>
        </div>
      </div>

    )
  }

};

export default AddToCart;