import React from 'react';
import Style from './Style.jsx';
import $ from 'jquery';

class StyleSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      styles: ['', '', '', '', '', '', '', '', ''],
      styleNames: ['name 1', 'name 2', 'name 3', 'name 4', 'name 5', 'name 6', 'name 7', 'name 8', 'name 9'],
      featuredIndex: 0
    }

    this.changeStyle = this.changeStyle.bind(this);

  }

  componentDidMount() {

  }

  changeStyle(index) {
    this.props.changeStyle(this.state.styles[index]);
    this.setState({
      ...this.state,
      featuredIndex: index
    })
  }

  // selected style must render first ***

  render() {
    return (

      <Style styles={this.state.styles} styleNames={this.state.styleNames} featuredIndex={this.state.featuredIndex} changeStyle={this.changeStyle}/>

    )
  }

};

export default StyleSelector;

