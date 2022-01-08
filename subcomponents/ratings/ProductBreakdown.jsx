import React from 'react';
import CharacteristicRating from './CharacteristicRating.jsx';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="productBreakdown">
        {this.props.ratingsMeta.characteristics ? Object.keys(this.props.ratingsMeta.characteristics).map((key, index) =>
          <CharacteristicRating key={index} meta={this.props.ratingsMeta} char={key} />) : null}
      </div>
      // a graph decpicting average ratings of individual characteristics
    )
  }
}

// {if (this.props.ratingsMeta.characteristics) ? Object.keys(this.props.ratingsMeta.characteristics).map((char) => {
//   <CharacteristicRating char={char}/>
// }) : null}

{/* <CharacteristicRating char={this.props.ratingsMeta.characteristics}/> */ }

export default ProductBreakdown;