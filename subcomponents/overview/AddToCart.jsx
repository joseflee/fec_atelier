import React from 'react';
import Size from './Size.jsx';
import Quantity from './Quantity.jsx';

class AddToCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inventory: null,
      quantitySelected: null,
      quantityAvailable: null,
      styleSelected: null,
      sizesAvailable: null,
      sizeSelected: null,
    }

    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.starItem = this.starItem.bind(this);

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
        <Size props={this.state.sizesAvailable} cb={this.validateForm}/>
        <Quantity props={this.state.quantityAvailable} cb={this.validateForm}/>
        <button onClick={this.submitForm}>Add to Cart</button>
        <button onClick={this.starItem}>star item</button>

      </div>

    )
  }

};

export default AddToCart;