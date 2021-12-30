import React from 'react';
import Style from './Style.jsx';
import $ from 'jquery';

class StyleSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      styleNames: [],
      featuredIndex: 0
    }

    this.changeStyle = this.changeStyle.bind(this);
    this.unpackStyles = this.unpackStyles.bind(this);

  }

  componentDidMount() {

    this.unpackStyles();

  }

  unpackStyles() {

    // converts style objects into arrays formatted for rendering each style component
    var styles = this.props.styles.results;
    var imageUrls = [];
    var styleNames = [];

    for (var i = 0; i < styles.length; i++) {
      styleNames.push(styles[i].name);
      imageUrls.push(styles[i].photos[0].url);
    }

    this.setState({

      ...this.state,
      styles: imageUrls,
      styleNames: styleNames

    })

  }

  changeStyle(index) {
    this.setState({
      ...this.state,
      featuredIndex: index
    }, () => {
      this.props.changeStyle(this.state.featuredIndex);
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

