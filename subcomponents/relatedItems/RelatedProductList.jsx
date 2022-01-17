import React from 'react';
import { ProductCard } from './ProductCard.jsx';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

export class RelatedProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionAtList: 0,
      currentView: [],
      relatedItems: [],
    }
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
    this.shiftViewLeft = this.shiftViewLeft.bind(this);
    this.shiftViewRight = this.shiftViewRight.bind(this);
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
    var newView = this.state.relatedItems.slice(newPosition, newPosition + 4);
    this.setState({
      positionAtList: newPosition,
      currentView: newView
    })
  }

  shiftViewRight() {
    var newPosition;
    if (this.state.positionAtList < this.state.relatedItems.length - 4) {
      newPosition = this.state.positionAtList + 1;
    } else {
      newPosition = this.state.relatedItems.length - 4;
    }
    var newView = this.state.relatedItems.slice(newPosition, newPosition + 4);
    this.setState({
      positionAtList: newPosition,
      currentView: newView
    })
  }

  componentDidMount() {
    var relatedProductData = this.props.all
    var fourAtATime = relatedProductData.slice(0, 4);
    this.setState({
      currentView: fourAtATime,
      relatedItems: relatedProductData,
    }, () => {

    })
  }

 render() {
    return (
      <>
        <h3>Related Products</h3>
        <div className="carousel">
          <div className="centerVertical">
            {this.state.positionAtList > 0 ? <div onClick={this.handleLeftArrow}><FaArrowLeft className="arrows" /></div> : null}
          </div>
          {this.state.currentView.map((item) => {
            return <ProductCard key={item.id} data={item.id} clickCard={this.props.clickCard} clickStar={this.props.clickStar} itemInfo={item} />
          })}
          <div className="centerVertical">
            {this.state.positionAtList < this.state.relatedItems.length - 4 ? <div onClick={this.handleRightArrow}><FaArrowRight className="arrows RIarrow" /></div> : null}
          </div>
        </div>
      </>
    )
  }
}

