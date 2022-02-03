import React from 'react';
import { OutfitCard } from './OutfitCard.jsx';
import { AddToOutfitCard } from './AddToOutfitCard.jsx';
import { ProductCard } from './ProductCard.jsx';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

export class OutfitList extends React.Component {
  constructor( props ) {
    super( props );

    this.renderOutfitList = this.renderOutfitList.bind( this );
  }

  renderOutfitList() {
    if ( this.props.outfits.length > 0 ) {
      return ( this.props.outfits.map( item => {
        return <OutfitCard key={ item.id } itemInfo={ item } remove={ this.props.remove } clickCard={ this.props.clickCard} />
      } ) )
    }
  }

  componentDidMount() {
  }


  render() {
    return (
      <>
        <div className="RIHeadings">Your Outfit</div>
        <div className="carousel">
          <AddToOutfitCard add={ this.props.add }/>
          <div className="centerVertical">
            { this.props.position > 0 ? <div onClick={ this.props.left }><FaArrowLeft className="arrows" /></div> : null }
          </div>
          { this.renderOutfitList() }
          <div className="centerVertical">
            { this.props.position < ( this.props.outfitLength - 3 ) ? <div onClick={ this.props.right }> <FaArrowRight className="arrows RIarrow" /> </div> : null }
          </div>
        </div>
      </>
    )
  }
}