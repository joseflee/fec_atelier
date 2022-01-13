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
      outfitsList: [],
      currentItem: {},
      modal: false,
      clickedCardFeatures: [],
      relatedItemsList: []
    }

    this.handleRelatedStarClick = this.handleRelatedStarClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  handleRelatedStarClick(e) {
    e.stopPropagation();
    var id = e.currentTarget.getAttribute('data-id');
    var comparedFeatures;
    this.state.relatedItemsList.forEach(product => {
      if (product.id === Number(id)) {
        comparedFeatures = product;
      }
    })
    this.setState({
      modal: true,
      clickedCardFeatures: comparedFeatures
    })
  }

  closeModal() {
    this.setState({
      modal: false
    })
  }

  componentDidMount() {
    this.setState({
      relatedItemsList: this.props.all,
    })
  }

  render() {
    return (
      <>
        <RelatedProductList clickCard={this.props.clickCard} clickStar={this.handleRelatedStarClick} all={this.props.all} />
        <OutfitList outfits={this.props.outfits} add={this.props.addOutfit} remove={this.props.remove} right={this.props.right} left={this.props.left} position={this.props.position} />
        {(this.state.modal) ? <ComparisonModal close={this.closeModal} features={this.props.features} relatedFeatures={this.state.clickedCardFeatures} name={this.props.name} /> : null}
      </>
    )
  }
}

export default RelatedItems;