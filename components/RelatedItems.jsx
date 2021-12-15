import React from 'react';
import {RelatedProductList} from '../subcomponents/relatedItems/RelatedProductList.jsx';
import {ProductCard} from '../subcomponents/relatedItems/ProductCard.jsx';
import {OutfitList} from '../subcomponents/relatedItems/OutfitList.jsx';
import {OutfitCard} from '../subcomponents/relatedItems/OutfitCard.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.handleRelatedCardClick = this.handleRelatedCardClick.bind(this);
    this.handleRelatedStarClick = this.handleRelatedStarClick.bind(this);
  }

  //when a card on the related items list is clicked, it will navigate to that page
  handleRelatedCardClick(e) {
    console.log('hello')
  }
  //when the star on the related item card is clicked, a comparison modal will be opened up
  handleRelatedStarClick() {

  }

  render() {
    return (
      <>
      <div>Related Items</div>
      <RelatedProductList clickCard={this.handleRelatedCardClick}/>
      <OutfitList />
      </>
    )
  }
}

export default RelatedItems;