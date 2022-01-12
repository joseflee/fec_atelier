import React from 'react';
import Style from './Style.jsx';
import $ from 'jquery';

class StyleSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      styleObj: props.styles,
      styles: [],
      styleNames: [],
      featuredIndex: 0
    }

    this.changeStyle = this.changeStyle.bind(this);
    //this.unpackStyles = this.unpackStyles.bind(this);
    this.unpackStyles = this.unpackStyles.bind(this);
    this.unpackNames = this.unpackNames.bind(this);

  }

  componentDidMount() {

    //this.unpackStyles();

  }

  componentDidUpdate() {

    //this.unpackStyles();
  }

  unpackStyles() {

    var styles = this.props.styles.results;
    var imageUrls = [];

    for (var i = 0; i < styles.length; i++) {
      imageUrls.push(styles[i].photos[0].url);
    }

    return imageUrls;

  }

  unpackNames() {

    var styles = this.props.styles.results;
    var styleNames = [];

    for (var i = 0; i < styles.length; i++) {
      styleNames.push(styles[i].name);
    }

    return styleNames;

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
      <div>
        <div className={'styleIndicator'}><b>STYLE > </b>{this.unpackNames()[this.state.featuredIndex]}</div>
        <Style styles={this.unpackStyles()} styleNames={this.unpackNames()} featuredIndex={this.state.featuredIndex} changeStyle={this.changeStyle}/>
      </div>
    )
  }

};

export default StyleSelector;

