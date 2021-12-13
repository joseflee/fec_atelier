import React from 'react';
import Style from './Style.jsx';

class StyleSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // when props are being received, render method will be refactored to map-render avaliable styles

  render() {
    return (

      <Style props={this.props} />

    )
  }

};

export default StyleSelector;

