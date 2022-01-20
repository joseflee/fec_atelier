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
          <CharacteristicRating key={index} meta={this.props.ratingsMeta.characteristics} char={key} descriptions={this.props.descriptions} />) : null}
      </div>
    )
  }
}

export default ProductBreakdown;