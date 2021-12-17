import React from 'react';

export class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="card">
          <button onClick={this.props.remove}>delete</button>
          <div>Picture</div>
          <div>Category</div>
          <div>Price</div>
          <div>Rating</div>
        </div>
      </>
    )
  }
}