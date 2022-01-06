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
    this.unpackStyles = this.unpackStyles.bind(this);

  }

  componentDidMount() {

    this.unpackStyles();

  }

  componentDidUpdate() {
    //console.log('style selector updated with these props ', this.props);
    this.unpackStyles();
  }

  unpackStyles() {

    // console.log('styles prop received by style selector ', this.props.styles);
    // console.log('current styles in state ', this.state.styles);


    // converts style objects into arrays formatted for rendering each style component
    var styles = this.props.styles.results;
    var imageUrls = [];
    var styleNames = [];
    var isNewGallery = false;
    var index = this.state.featuredIndex;


    for (var i = 0; i < styles.length; i++) {
      styleNames.push(styles[i].name);
      imageUrls.push(styles[i].photos[0].url);
    }

    //console.log('styles props', this.props.styles.results)

    for (var i = 0; i < styles.length; i++) {
      if (styles[i].photos[0].url !== this.state.styles[i]) {
        isNewGallery = true;
      }
    }


    if (isNewGallery === true || this.state.styles.length === 0) {

      this.setState({
        ...this.state,
        stylesObj: this.props.styles,
        styles: imageUrls,
        styleNames: styleNames
      }, () => {
        //console.log('set state ran... this is now styles in state -> ', this.state.styles)
      })
    }


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
        <div className={'styleIndicator'}><b>STYLE > </b>{this.state.styleNames[this.state.featuredIndex]}</div>
        <Style styles={this.state.styles} styleNames={this.state.styleNames} featuredIndex={this.state.featuredIndex} changeStyle={this.changeStyle}/>
      </div>
    )
  }

};

export default StyleSelector;

