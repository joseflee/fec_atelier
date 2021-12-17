import React from 'react';
import {OutfitCard} from './OutfitCard.jsx';
import {AddToOutfitCard} from './AddToOutfitCard.jsx';

export class OutfitList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>list of outfits</h3>
        <AddToOutfitCard add={this.props.add}/>
      </div>
    )
  }
}