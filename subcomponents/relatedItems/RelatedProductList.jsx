import React from 'react';
import {ProductCard} from './ProductCard.jsx';
export class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h3>list of related products</h3>
        <ProductCard clickCard={this.props.clickCard} clickStar={this.props.clickStar} />
      </>
    )
  }
}