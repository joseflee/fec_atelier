import React from 'react';
import {ProductCard} from './ProductCard.jsx';




var mockRelatedItems = [
  {picture: 'image', category: 'shirt', price: '$50', rating: 4},
  {picture: 'image', category: 'pants', price: '$197', rating: 3.8},
  {picture: 'image', category: 'jacket', price: '$79', rating: 2.2},
  {picture: 'image', category: 'hat', price: '$99', rating: 1.5},
  {picture: 'image', category: 'scarf', price: '$47', rating: 5},
  {picture: 'image', category: 'socks', price: '$8', rating: 3.33},
  {picture: 'image', category: 'briefs', price: '$2', rating: 4.88},
  {picture: 'image', category: 'hoodie', price: '$197', rating: 4.35},
  {picture: 'image', category: 'sweater', price: '$1000', rating: 3.9},
  {picture: 'image', category: 'coat', price: '$999', rating: 1.1},
  {picture: 'image', category: 'shoes', price: '$444', rating: 4},
  {picture: 'image', category: 'belt', price: '$1', rating: 3.3},
]

var fiveAtOnce = mockRelatedItems.slice

//where to keep the related items state
//related items will be got from the api and will be in related Items component
//from there pass it as props to related list
//in related list there will be a current view container. this will be located in the list component and not the parent component.


export class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionAtList: 0,
      currentView: [],
    }
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
    this.shiftViewLeft = this.shiftViewLeft.bind(this);
    this.shiftViewRight = this.shiftViewRight.bind(this);
  }

  handleLeftArrow() {
    console.log('left arrow clicked');
    this.shiftViewLeft();
  }

  handleRightArrow() {
    console.log('right arrow clicked');
    this.shiftViewRight();
  }

  shiftViewLeft() {
    var newPosition;
    if (this.state.positionAtList > 0) {
      newPosition = this.state.positionAtList - 1;
    } else {
      newPosition = 0;
    }
    var newView = mockRelatedItems.slice(newPosition, newPosition + 5);
    this.setState({
      positionAtList: newPosition,
      currentView: newView
    })
  }

  shiftViewRight() {
    var newPosition;
    //need to change this when real data
    if (this.state.positionAtList < mockRelatedItems.length - 5) {
      newPosition = this.state.positionAtList + 1;
    } else {
      newPosition = mockRelatedItems.length - 5;
    }
    var newView = mockRelatedItems.slice(newPosition, newPosition + 5);
    this.setState({
      positionAtList: newPosition,
      currentView: newView
    })
  }


  componentDidMount() {
    //var startingPosition = this.state.positionAtList;
    var fiveAtATime = mockRelatedItems.slice(0, 5);
    this.setState({
      currentView: fiveAtATime
    })
  }

  render() {
    return (
      <>
        <h3>list of related products</h3>
        <div className="carousel">
          <div className="centerVertical">
            <div className="leftArrow" onClick={this.handleLeftArrow}></div>
          </div>
          {this.state.currentView.map((item, index) => {
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