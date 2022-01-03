import React from 'react';
import ReactDOM from 'react-dom';
import Overview from '../components/Overview.jsx';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers.jsx';
import RatingsAndReviews from '../components/RatingsAndReviews.jsx';
import RelatedItems from '../components/RelatedItems.jsx';
import $ from 'jquery';
import { APIkey } from '../config.js';

import mockProduct from '../mock_api/mock_product.js';
import mockStyles from '../mock_api/mock_styles.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 59553,
      product: mockProduct,
      styles: mockStyles,
      products: null,
      currentItemFeatures: [],
      relatedItems: [],
      relatedStyles: [],
      relatedIds: [],
    }

    this.retrieveProduct = this.retrieveProduct.bind(this);
    this.retrieveStyles = this.retrieveStyles.bind(this);
    this.retrieveRelatedProducts = this.retrieveRelatedProducts.bind(this);
    this.retrieveProductForRelated = this.retrieveProductForRelated.bind(this);
    this.retrieveStyleForRelated = this.retrieveStyleForRelated.bind(this);
    this.renderRelatedItems = this.renderRelatedItems.bind(this);
  }

  componentDidMount() {
    // invoke retrieveProduct
    this.retrieveProduct();
    this.retrieveStyles(this.state.productId);
    this.retrieveRelatedProducts(this.state.productId);
  }

  componentDidUpdate() {

  }

  retrieveProduct() {
    var self = this;
    console.log(APIkey);

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
        console.log('state styles => ', self.state.styles);
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
        <div className={'pageTitle'}>ATELIER</div>
        <Overview product={this.state.product} styles={this.state.styles}/>
        {this.renderRelatedItems()}
        <QuestionsAndAnswers />
        <RatingsAndReviews />
      </div>
    )

  }


}

export default App;
