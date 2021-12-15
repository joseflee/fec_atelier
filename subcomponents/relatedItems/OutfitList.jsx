import React from 'react';
import {OutfitCard} from './OutfitCard.jsx';

export class OutfitList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h3>list of outfits</h3>
        <OutfitCard />
      </>
    )
  }
}