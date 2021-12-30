import React from 'react';
import Size from './Size.jsx';
import Quantity from './Quantity.jsx';

class AddToCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inventoryBySKU: null,
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

    var inventoryBySKU = {};
    var inventoryBySize = {};
    var availableSizes = [];

    var isNewStyle = false;

    // sort inventory by sku
    for (var key in selectedStyle.skus) {
      inventoryBySKU[key] = [selectedStyle.skus[key]['quantity'], selectedStyle.skus[key]['size']]
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

    // check if incoming props contain new style

    if (selectedIndex !== this.state.selectedIndex) {
      this.setState({
        ...this.state,
        selectedIndex: selectedIndex,
        inventoryBySKU: inventoryBySKU,
        inventoryBySize: inventoryBySize,
        availableSizes: availableSizes,
        sizeSelected: selectedSize
      }, () => {
        this.updateQuantity();
      })
    }

  }

  // checks size selected and updates quantity available
  updateQuantity() {

    var sizeSelected = this.state.sizeSelected;
    var quantityAvailable = this.state.quantityAvailable;
    var inventory = this.state.inventoryBySize;
    var available = this.state.inventoryBySize[sizeSelected];

    if (inventory[sizeSelected] !== quantityAvailable) {
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

    return (

      <div className={'addToCart'}>

        <Size availableSizes={this.state.availableSizes} cb={this.validateForm}/>
        <Quantity quantity={this.state.quantityAvailable} cb={this.validateForm}/>
        <button onClick={this.submitForm}>Add to Cart</button>
        <button onClick={this.starItem}>star item</button>

      </div>

    )
  }

};

export default AddToCart;