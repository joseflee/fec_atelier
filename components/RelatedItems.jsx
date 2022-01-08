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
      relatedRatings: [],
      outfitsList: [],
      currentItem: {},
      modal: false,
      clickedCardFeatures: [],
    }

    this.handleRelatedStarClick = this.handleRelatedStarClick.bind(this);
    this.removeFromOutfits = this.removeFromOutfits.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  handleRelatedStarClick(e) {
    e.stopPropagation();
    var id = e.currentTarget.getAttribute('data-id');
    console.log(id);
    var comparedFeatures;
    this.state.relatedItemsList.forEach(product => {
      if (product.id === Number(id)) {
        comparedFeatures = product;
        //console.log(comparedFeatures);
      }
    })
    this.setState({
      modal: true,
      clickedCardFeatures: comparedFeatures
    }, () => {

    })
  }

  closeModal() {
    console.log('hello')
    this.setState({
      modal: false
    })
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
      relatedStyles: this.props.styles,
      relatedRatings: this.props.ratings,
    });
  }

  render() {
    return (
      <>
        <div>Related Items</div>
        <RelatedProductList clickCard={this.props.clickCard} clickStar={this.handleRelatedStarClick} related={this.props.items} styles={this.props.styles} ratings={this.props.ratings}/>
        <OutfitList add={this.addToOutfits} remove={this.removeFromOutfits} />
        {(this.state.modal && this.state.clickedCardFeatures) ? <ComparisonModal close={this.closeModal} features={this.props.features} self={this.props.self} relatedFeatures={this.state.clickedCardFeatures} /> : null}
      </>
    )
  }
}

export default RelatedItems;