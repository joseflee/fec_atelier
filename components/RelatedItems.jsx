import React from 'react';
import {RelatedProductList} from '../subcomponents/relatedItems/RelatedProductList.jsx';
import {ProductCard} from '../subcomponents/relatedItems/ProductCard.jsx';
import {OutfitList} from '../subcomponents/relatedItems/OutfitList.jsx';
import {OutfitCard} from '../subcomponents/relatedItems/OutfitCard.jsx';
import {ComparisonModal} from '../subcomponents/relatedItems/ComparisonModal.jsx';


class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedItemsList: [],
      relatedStyles: [],
      outfitsList: [],
      currentItem: {},
      modal: false,
    }

    //this.handleRelatedCardClick = this.handleRelatedCardClick.bind(this);
    this.handleRelatedStarClick = this.handleRelatedStarClick.bind(this);
    this.addToOutfits = this.addToOutfits.bind(this);
    this.removeFromOutfits = this.removeFromOutfits.bind(this);
    this.addToRelatedItems = this.addToRelatedItems.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleRelatedStarClick(e) {
    e.stopPropagation();
    console.log('clicked on the star')
    this.setState({
      modal: true
    })
  }

  closeModal() {
    console.log('hello')
    this.setState({
      modal: false
    })
  }

  //function to add items to outfitlist
  addToOutfits(e) {
    console.log('added to outfit list')
  }

  //function to remove items from outfitList
  removeFromOutfits(e) {
    console.log('delete from outfit list');
  }

  //function to add items to the related Items List; might need to do this in the database helpers
  addToRelatedItems() {
  }

  componentDidMount() {
    this.setState({
      relatedItemsList: this.props.items,
      relatedStyles: this.props.styles
    });
  }

  render() {
    return (
      <>
        <div>Related Items</div>
        {this.state.relatedItemsList.length > 0 ? <RelatedProductList clickCard={this.props.clickCard} clickStar={this.handleRelatedStarClick} related={this.state.relatedItemsList} styles={this.state.relatedStyles} /> : null}
        <OutfitList add={this.addToOutfits} remove={this.removeFromOutfits} />
        {this.state.modal ? <ComparisonModal close={this.closeModal} features={this.props.features} /> : null}
      </>
    )
  }
}

export default RelatedItems;