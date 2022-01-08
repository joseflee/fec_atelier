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
    this.unpackStylesNew = this.unpackStylesNew.bind(this);
    this.unpackNamesNew = this.unpackNamesNew.bind(this);

  }

  componentDidMount() {

    //this.unpackStyles();

  }

  componentDidUpdate() {

    //this.unpackStyles();
  }

  unpackStylesNew() {

    var styles = this.props.styles.results;
    var imageUrls = [];

    for (var i = 0; i < styles.length; i++) {
      imageUrls.push(styles[i].photos[0].url);
    }

    return imageUrls;

  }

  unpackNamesNew() {

    var styles = this.props.styles.results;
    var styleNames = [];

    for (var i = 0; i < styles.length; i++) {
      styleNames.push(styles[i].name);
    }

    return styleNames;

  }

  // unpackStyles() {

  //   var styles = this.props.styles.results;
  //   var imageUrls = [];
  //   var styleNames = [];
  //   var isNewGallery = false;
  //   var index = this.state.featuredIndex;


  //   for (var i = 0; i < styles.length; i++) {
  //     styleNames.push(styles[i].name);
  //     imageUrls.push(styles[i].photos[0].url);
  //   }

  //   for (var i = 0; i < styles.length; i++) {
  //     if (styles[i].photos[0].url !== this.state.styles[i]) {
  //       isNewGallery = true;
  //     }
  //   }

  //   if (isNewGallery === true || this.state.styles.length === 0) {

  //     this.setState({
  //       ...this.state,
  //       stylesObj: this.props.styles,
  //       styles: imageUrls,
  //       styleNames: styleNames
  //     }, () => {
  //       //console.log('set state ran... this is now styles in state -> ', this.state.styles)
  //     })
  //   }


  // }

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
        <div className={'styleIndicator'}><b>STYLE > </b>{this.unpackNamesNew()[this.state.featuredIndex]}</div>
        <Style styles={this.unpackStylesNew()} styleNames={this.unpackNamesNew()} featuredIndex={this.state.featuredIndex} changeStyle={this.changeStyle}/>
      </div>
    )
  }

};

export default StyleSelector;

