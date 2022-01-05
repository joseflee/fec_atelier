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


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 59553,
      product: null,
      styles: null,
      ratings: null,
      averageRating: null,
      products: null,
      currentItemFeatures: [],
      relatedItems: [],
      relatedStyles: [],
      relatedIds: [],
    }

    this.retrieveProduct = this.retrieveProduct.bind(this);
    this.retrieveStyles = this.retrieveStyles.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.retrieveRelatedProducts = this.retrieveRelatedProducts.bind(this);
    this.retrieveProductForRelated = this.retrieveProductForRelated.bind(this);
    this.retrieveStyleForRelated = this.retrieveStyleForRelated.bind(this);
    this.renderRelatedItems = this.renderRelatedItems.bind(this);
    this.retrieveRatings = this.retrieveRatings.bind(this);
  }

  componentDidMount() {
    // invoke retrieveProduct
    this.retrieveProduct();
    this.retrieveStyles(this.state.productId);
    this.retrieveRelatedProducts(this.state.productId);
    this.retrieveRatings();
  }

  componentDidUpdate() {

  }

  retrieveProduct() {
    var self = this;

    //console.log(APIkey);

    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${this.state.productId}`,
      headers: {
        "Authorization": APIkey
      }
    }).done((res) => {
      self.setState({
        ...self.state,
        product: res,
        currentItemFeatures: res.features,
      }, () => {
        this.retrieveStyles(this.state.productId);
        //console.log('state product => ', self.state.product);
      })
    })

  }


  retrieveStyles(productNumber) {
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
        styles: res,
      }, () => {
        //console.log('state styles => ', self.state.styles);
      })
    })

  }
  retrieveReviews() {

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
        //console.log('state styles => ', self.state.styles);
        self.setState({
          ...self.state,
          averageRating: parseAverageRating(this.state.ratings)
        }, () => {
          // console.log('average rating ', this.state.averageRating)
        })
      })
    })


  }

  handleSearch(searchTerm) {

    // this method will retrieve search term from topbar on page and use a
    // server route + modularized helpers to construct search query and perform
    // API pull.
    // Then state will be updated with new product / styles

  }

  retrieveRelatedProducts(productId) {
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${this.state.productId}/related`,
      headers: {
        "Authorization": APIkey
      },
      success: (data) => {
        this.setState({
          relatedIds: data
        });
        data.forEach(id => {
          this.retrieveProductForRelated(id);
          this.retrieveStyleForRelated(id);
        })
      },
      error: (err) => {
        console.log('error getting related products', err);
      }
    })
  }




  retrieveProductForRelated(productId) {
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`,
      headers: {
        "Authorization": APIkey
      },
      success: (data) => {
        var relatedData = this.state.relatedItems.concat(data);
        this.setState({
          relatedItems: relatedData
        });
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  retrieveStyleForRelated(productNumber) {
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productNumber}/styles`,
      headers: {
        "Authorization": APIkey
      },
      success: (data) => {
        var relatedStyle = this.state.relatedStyles.concat(data);
        this.setState({
          relatedStyles: relatedStyle
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  renderRelatedItems() {
    if (this.state.relatedIds.length > 0) {
      if (this.state.relatedIds.length === this.state.relatedItems.length && this.state.relatedIds.length === this.state.relatedStyles.length) {
        return <RelatedItems items={this.state.relatedItems} styles={this.state.relatedStyles} features={this.state.currentItemFeatures} />
      }
    }
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
        {this.renderRelatedItems()}
        <QuestionsAndAnswers />
        <RatingsAndReviews />
      </div>
    )

  }


}

export default App;
