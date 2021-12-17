import React from 'react';
import {RelatedProductList} from '../subcomponents/relatedItems/RelatedProductList.jsx';
import {ProductCard} from '../subcomponents/relatedItems/ProductCard.jsx';
import {OutfitList} from '../subcomponents/relatedItems/OutfitList.jsx';
import {OutfitCard} from '../subcomponents/relatedItems/OutfitCard.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedItemsList: [],
      outfitsList: [],
    }

    this.handleRelatedCardClick = this.handleRelatedCardClick.bind(this);
    this.handleRelatedStarClick = this.handleRelatedStarClick.bind(this);
    this.addToOutfits = this.addToOutfits.bind(this);
    this.removeFromOutfits = this.removeFromOutfits.bind(this);
    this.addToRelatedItems = this.addToRelatedItems.bind(this);
  }

  //when a card on the related items list is clicked, it will navigate to that page
  handleRelatedCardClick(e) {
    console.log('clicked on the card')
  }
  //when the star on the related item card is clicked, a comparison modal will be opened up
  handleRelatedStarClick(e) {
    e.stopPropagation();
    console.log('clicked on the star')
  }

  //function to add items to outfitlist
  addToOutfits(e) {
    console.log('added to outfit list')
  }

  //function to remove items from outfitList
  removeFromOutfits(e) {
    console.log('delete from outfit list');
  }

  //function to add items to the related Items List
  addToRelatedItems() {
  }


  render() {
    return (
      <>
        <div>Related Items</div>
        <RelatedProductList clickCard={this.handleRelatedCardClick} clickStar={this.handleRelatedStarClick} />
        <OutfitList add={this.addToOutfits} remove={this.removeFromOutfits} />
      </>
    )
  }
}

export default RelatedItems;