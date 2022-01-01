import React from 'react';
import {ProductCard} from './ProductCard.jsx';


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


  componentDidMount() {
      var fiveAtATime = this.props.related.slice(0, 3);
      this.setState({
        currentView: fiveAtATime,
        relatedItems: this.props.related,
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
