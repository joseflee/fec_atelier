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
      //products: null,
      percentRecommended: null,
      allRelated: [],
      outfitIds: [],
      outfits: [],
    }

    this.retrieveProduct = this.retrieveProduct.bind(this);
    this.retrieveStyles = this.retrieveStyles.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.retrieveRelatedProducts = this.retrieveRelatedProducts.bind(this);
    this.handleRelatedCardClick = this.handleRelatedCardClick.bind(this);
    this.retrieveAllForRelated = this.retrieveAllForRelated.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfits = this.removeFromOutfits.bind(this);
    this.retrieveAllForOutfits = this.retrieveAllForOutfits.bind(this);

    this.retrieveRatings = this.retrieveRatings.bind(this);
  }

  componentDidMount() {

    this.retrieveProduct(this.state.productId);
    this.retrieveStyles(this.state.productId);
    this.retrieveRelatedProducts(this.state.productId);
    this.retrieveRatings();
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
        //console.log('state product => ', self.state.product);
    })

  }


  retrieveStyles(product, productNumber) {
    var self = this;

    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productNumber}/styles`,
      headers: {
        "Authorization": APIkey
      }
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

  //after getting all of the related products in an array
  //perform calls to the api to get all of the data
  //then arrange the data in the server, send it back and set state


  retrieveRelatedProducts(productId) {
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${this.state.productId}/related`,
      headers: {
        "Authorization": APIkey
      },
      success: (data) => {
        this.retrieveAllForRelated(data);
        if (this.state.outfits.length > 0) {
          this.retrieveAllForOutfits(this.state.outfits)
        }
      },
      error: (err) => {
        console.log('error getting related products', err);
      }
    })
  }

  retrieveAllForRelated(ids) {

    var ids = ids.join('&');

    $.ajax({
      method: 'GET',
      url: `related/${ids}`,
      success: (data) => {
        console.log('data', data)
        this.setState({
          allRelated: data
        }, () => {})
      },
      error: (err) => {
        console.log('error getting all for related', err)
      }
    })
  }

  retrieveAllForOutfits(ids) {
    var ids = ids.join('&');
    console.log('ids', ids);
    $.ajax({
      method: 'GET',
      url: `outfits/${ids}`,
      success: (data) => {
        console.log('data for outfits', data);
        this.setState({
          outfits: data
        }, () => {
          console.log(this.state.outfits);
        })
      },
      error: (err) => {
        console.log('error getting outfit data', err);
      }
    })
  }

   //function to remove items from outfitList

  handleRelatedCardClick(e) {
    var clickedCardId = e.currentTarget.getAttribute('data-txt');
    this.setState({
      productId: clickedCardId,

    }, () => {
      this.retrieveProduct(this.state.productId);
      this.retrieveStyles(this.state.productId);
      this.retrieveRelatedProducts(this.state.productId);
      this.retrieveRatings();

    }
    )
  }

  addToOutfit() {
    console.log('working');
    var outfits = this.state.outfitIds.concat(this.state.productId);
    this.setState({
      outfitIds: outfits,
    }, () => {
      console.log(this.state.outfitIds)
      this.retrieveAllForOutfits(this.state.outfitIds);
    })
  }

  removeFromOutfits(e) {
    console.log('delete from outfit list');
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
        {this.state.allRelated.length > 0 ? <RelatedItems all={this.state.allRelated} outfits={this.state.outfits} clickCard={this.handleRelatedCardClick} addOutfit={this.addToOutfit} remove={this.removeFromOutfits} name={this.state.product} /> : null}
        <QuestionsAndAnswers />
        <div className="ratingsAndReviews">
        {this.state.ratings ? <RatingsAndReviews reviews={this.state.ratings} averageRating={this.state.averageRating} percent={this.state.percentRecommended}/> : null }
        </div>
      </div>
    )
  }
}

export default App;
