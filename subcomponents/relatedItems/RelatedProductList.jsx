import React from 'react';
import {ProductCard} from './ProductCard.jsx';


export class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionAtList: 0,
      currentView: [],
      relatedItems: [],
      relatedStyles: []
    }
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
    this.shiftViewLeft = this.shiftViewLeft.bind(this);
    this.shiftViewRight = this.shiftViewRight.bind(this);
    this.combineProductData = this.combineProductData.bind(this);
  }

  handleLeftArrow() {
    this.shiftViewLeft();
  }

  handleRightArrow() {
    this.shiftViewRight();
  }

  shiftViewLeft() {
    var newPosition;
    if (this.state.positionAtList > 0) {
      newPosition = this.state.positionAtList - 1;
    } else {
      newPosition = 0;
    }
    var newView = this.state.relatedItems.slice(newPosition, newPosition + 3);
    this.setState({
      positionAtList: newPosition,
      currentView: newView
    })
  }

  shiftViewRight() {
    var newPosition;
    if (this.state.positionAtList < this.state.relatedItems.length - 3) {
      newPosition = this.state.positionAtList + 1;
    } else {
      newPosition = this.state.relatedItems.length - 3;
    }
    var newView = this.state.relatedItems.slice(newPosition, newPosition + 3);
    this.setState({
      positionAtList: newPosition,
      currentView: newView
    })
  }

  combineProductData(array1, array2) {
    var combinedArray = [];
    array1.forEach(obj1 => {
      array2.forEach(obj2 => {
        if ('' + obj1.id === obj2.product_id) {
          var combined = Object.assign(obj1, obj2);
          combinedArray.push(combined);
        }
      })
    })
    return combinedArray;
  }

  componentDidMount() {
    var combined = this.combineProductData(this.props.related, this.props.styles);
    // console.log('did combine work?', combined);
    var threeAtATime = combined.slice(0, 3);
    this.setState({
      currentView: threeAtATime,
      relatedItems: combined,
    })
  }

  render() {
    return (
      <>
        <h3>list of related products</h3>
        <div className="carousel">
          <div className="centerVertical">
           {this.state.positionAtList > 0 ? <div className="leftArrow" onClick={this.handleLeftArrow}></div> : null}
          </div>
          {this.state.currentView.map((item, index) => {
            return <ProductCard key={index} clickCard={this.props.clickCard} clickStar={this.props.clickStar} itemInfo={item} />
          })}
          <div className="centerVertical">
            {this.state.positionAtList < this.state.relatedItems.length - 3 ? <div className="rightArrow" onClick={this.handleRightArrow}></div> : null}
          </div>
        </div>
      </>
    )
  }
}
