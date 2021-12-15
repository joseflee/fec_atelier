import React from 'react';

export class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div onClick={this.props.clickCard}>
          <button onClick={this.props.clickCard}>test</button>
          <div>Picture</div>
          <div>Category</div>
          <div>Price</div>
          <div>Rating</div>
        </div>
      </>
    )
  }
}