import React from 'react';
import {ProductCard} from './ProductCard.jsx';




var mockRelatedItems = [
  {picture: 'sample', category: 'shirt', price: '$50', rating: 4},
  {picture: 'sample', category: 'pants', price: '$197', rating: 3.8},
  {picture: 'sample', category: 'jacket', price: '$79', rating: 2.2},
  {picture: 'sample', category: 'hat', price: '$99', rating: 1.5},
  {picture: 'sample', category: 'scarf', price: '$47', rating: 5},
  {picture: 'sample', category: 'socks', price: '$25', rating: 3.6}
]

//where to keep the related items state
//related items will be got from the api and will be in related Items component
//from there pass it as props to related list
//in related list there will be a current view container. this will be located in the list component and not the parent component.


export class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: [],
    }
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
  }

  handleLeftArrow() {
    console.log('left arrow clicked');
  }

  handleRightArrow() {
    console.log('right arrow clicked');
  }

  render() {
    return (
      <>
        <h3>list of related products</h3>
        <div className="carousel">
          <div className="centerVertical">
            <div className="leftArrow" onClick={this.handleLeftArrow}></div>
          </div>
          {mockRelatedItems.map((item, index) => {
            return <ProductCard key={index} clickCard={this.props.clickCard} clickStar={this.props.clickStar} itemInfo={item} />
          })}
          <div className="centerVertical">
            <div className="rightArrow" onClick={this.handleRightArrow}></div>
          </div>
        </div>
      </>
    )
  }
}
//<ProductCard clickCard={this.props.clickCard} clickStar={this.props.clickStar} />