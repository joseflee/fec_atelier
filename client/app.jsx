import React from 'react';
import ReactDOM from 'react-dom';
import Overview from '../components/Overview.jsx';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers.jsx';
import RatingsAndReviews from '../components/RatingsAndReviews.jsx';
import RelatedItems from '../components/RelatedItems.jsx';
import Search from '../components/Search.jsx';


import $ from 'jquery';
import { APIkey } from '../config.js';

// importing search bar icon from react library
import { FaSistrix } from 'react-icons/fa';
import parseAverageRating from '../modules/parseRatings.js';
import mockProduct from '../mock_api/mock_product.js';
import mockStyles from '../mock_api/mock_styles.js';
import getPercentRecommended from '../modules/percentRecommended.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 59553,
      product: null,
      styles: null,
      ratings: null,
      averageRating: null,
      percentRecommended: null,
      allRelated: [],
      outfitIds: [],
      outfits: [],
      outfitView: [],
      outfitPosition: 0,
    }

    this.retrieveProduct = this.retrieveProduct.bind(this);
    this.retrieveStyles = this.retrieveStyles.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.retrieveRelatedProducts = this.retrieveRelatedProducts.bind(this);
    this.retrieveAllForRelated = this.retrieveAllForRelated.bind(this);
    this.retrieveAllForOutfits = this.retrieveAllForOutfits.bind(this);
    this.handleRelatedCardClick = this.handleRelatedCardClick.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfits = this.removeFromOutfits.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
    this.handleLeftArrow = this.handleLeftArrow.bind(this);

    this.retrieveRatings = this.retrieveRatings.bind(this);
  }

  componentDidMount() {

    this.retrieveProduct(this.state.productId);
    this.retrieveRelatedProducts(this.state.productId);
    this.retrieveRatings();


    if (localStorage.getItem('outfitIds')) {
      var outfitIds = localStorage.getItem('outfitIds').split(',');
      var outfitIds = outfitIds.map(id => {
        return Number( id );
      })
      this.setState({
        outfitIds
      }, () => {
        this.retrieveAllForOutfits(this.state.outfitIds);
      } )
    }
  }

  componentDidUpdate() {

  }

  retrieveProduct(id) {

    var self = this;

    $.ajax({
      method: 'GET',
      url: `products/${id}`
    }).done((res) => {
        this.retrieveStyles(res, this.state.productId);
    })

  }


  retrieveStyles(product, productNumber) {
    var self = this;

    $.ajax({
      method: 'GET',
      url: `styles/${productNumber}`
    }).done((res) => {
      self.setState({
        ...self.state,
        product: product,
        styles: res,
      }, () => {
        //console.log('state styles => ', self.state.styles);
      })
    })

  }

  retrieveRatings() {

    var self = this;

    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=${this.state.productId}`,
      headers: {
        "Authorization": APIkey
      }
    }).done((res) => {
      self.setState({
        ...self.state,
        ratings: res,
      }, () => {
        self.setState({
          ...self.state,
          averageRating: parseAverageRating(this.state.ratings)
        }, () => {
          self.setState({
            ...self.state,
            percentRecommended: getPercentRecommended(this.state.ratings)
          }, () => {
            // console.log('percent recommended: ', this.state.percentRecommended);
          })
        })
      })
    })

  }

  // now available for use - must use string parameter with product name
  // not case sensitive but spelling must be correct
  handleSearch(searchTerm) {

    //console.log('search toggled')

    $.ajax({
      method: 'GET',
      url: `search/${searchTerm}`,
    }).done((res) => {
      this.setState({
        ...this.state,
        productId: res
      }, () => {
        $('.searchInput').val('');
        this.retrieveProduct(this.state.productId);
      })
    })

  }




  retrieveRelatedProducts(productId) {
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${this.state.productId}/related`,
      headers: {
        "Authorization": APIkey
      },
      success: (data) => {
        var dataObj = {};
        var withoutDuplicates = [];
        data.forEach( item => {
          if ( productId !== item ) {
            dataObj[ item ] = true;
          }
        } );
        for ( var id in dataObj ) {
          withoutDuplicates.push( id );
        }
        this.retrieveAllForRelated( withoutDuplicates );
        if ( this.state.outfits.length > 0 ) {
          this.retrieveAllForOutfits( this.state.outfits )
        }
      },
      error: ( err ) => {
        console.log( 'error getting related products', err );
      }
    })
  }

  retrieveAllForRelated( ids ) {
    var ids = ids.join( '&' );
    $.ajax({
      method: 'GET',
      url: `related/${ids}`,
      success: (data) => {
        this.setState({
          allRelated: data
        }, () => {})
      },
      error: (err) => {
        console.log('error getting all for related', err)
      }
    })
  }

  retrieveAllForOutfits( ids ) {
    var ids = ids.join( '&' );
    $.ajax({
      method: 'GET',
      url: `outfits/${ids}`,
      success: ( data ) => {
        var threeAtATime = data.slice( 0, 3 );
        this.setState({
          outfits: data,
          outfitView: threeAtATime,
        }, () => {})
      },
      error: ( err ) => {
        console.log( 'error getting outfit data', err );
      }
    })
  }


  handleRelatedCardClick(e) {
    var clickedCardId = e.currentTarget.getAttribute( 'data-txt' );
    console.log('clicked card id', clickedCardId);
    this.setState( {
      productId: clickedCardId,
      allRelated: []
    }, () => {
      this.retrieveProduct( this.state.productId );
      this.retrieveStyles( this.state.productId );
      this.retrieveRelatedProducts( this.state.productId );
      this.retrieveRatings();
    }
    )
  }

  addToOutfit() {
    if ( this.state.outfitIds.indexOf( Number( this.state.productId ) ) === -1 ) {
      var outfitIds = this.state.outfitIds.concat( Number( this.state.productId ) );
      localStorage.setItem('outfitIds', outfitIds);
      this.setState({
        outfitIds,
      }, () => {
        this.retrieveAllForOutfits( this.state.outfitIds );
      })
    }
  }


  removeFromOutfits(e) {
    e.stopPropagation();
    var id = e.currentTarget.getAttribute( 'data-txt' );
    var outfitIds = this.state.outfitIds;
    var targetIndex = outfitIds.indexOf( Number( id ) );
    outfitIds.splice( targetIndex, 1 );
    localStorage.setItem('outfitIds', outfitIds);
    var outfits = this.state.outfits;
    var listIndex;
    outfits.forEach( ( item, index ) => {
      if ( item.id === Number( id ) ) {
        listIndex = index;
      }
    });
    outfits.splice( listIndex, 1 );
    var outfitView = this.state.outfitView;
    var viewIndex;
    outfitView.forEach( ( item, index ) => {
      if ( item.id === Number( id ) ) {
        viewIndex = index;
      }
    });
    outfitView.splice( viewIndex, 1 );

    this.setState( {
      outfitIds,
      outfits,
      outfitView,
    }, () => {})
  }

  handleLeftArrow() {
    var newPosition;
    if ( this.state.outfitPosition > 0 ) {
      newPosition = this.state.outfitPosition - 1;
    } else {
      newPosition = 0;
    }
    var newView = this.state.outfits.slice( newPosition, newPosition + 3 );
    this.setState( {
      outfitPosition: newPosition,
      outfitView: newView
    } )

  }

  handleRightArrow() {
    var outfitPosition;
    if (this.state.outfitPosition < this.state.outfits.length - 3) {
      outfitPosition = this.state.outfitPosition + 1;
    } else {
      outfitPosition = this.state.outfits.length - 3;
    }
    var outfitView = this.state.outfits.slice(outfitPosition, outfitPosition + 3);
    this.setState({
      outfitPosition,
      outfitView
    })

  }

  render() {

    return (
      <div>
        <div className={'topBar'}>
          <div className={'pageTitle'}>ATELIER</div>
          <div className={'searchUnit'}>
            <Search handleSearch={this.handleSearch} />
            <div className={'searchFieldUnderline'} />
          </div>
        </div>
        <div className={'siteAnnouncementBar'}>
          <div className={'announcement'}><i>SITE-WIDE ANNOUNCEMENT MESSAGE!</i> - SALE / DISCOUNT <b>OFFER</b> - NEW PRODUCT HIGHLIGHT</div>
        </div>
        <div>{this.state.product && this.state.styles ? <Overview product={this.state.product} styles={this.state.styles} rating={this.state.averageRating}/> : null }</div>
        <div>
          { this.state.allRelated.length > 0 ? <RelatedItems all={ this.state.allRelated } outfits={ this.state.outfitView } outfitLength={ this.state.outfits.length } clickCard={ this.handleRelatedCardClick } addOutfit={ this.addToOutfit } remove={ this.removeFromOutfits } name={ this.state.product } right={ this.handleRightArrow } left={ this.handleLeftArrow } position={ this.state.outfitPosition } /> : null}
        </div>
        <QuestionsAndAnswers />
        <div className="ratingsAndReviews">
        {this.state.ratings ? <RatingsAndReviews reviews={this.state.ratings} averageRating={this.state.averageRating} percent={this.state.percentRecommended}/> : null }
        </div>
      </div>
    )
  }
}

export default App;
