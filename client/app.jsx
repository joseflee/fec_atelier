import React from 'react';
import ReactDOM from 'react-dom';
import Overview from '../components/Overview.jsx';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers.jsx';
import RatingsAndReviews from '../components/RatingsAndReviews.jsx';
import RelatedItems from '../components/RelatedItems.jsx';
import $ from 'jquery';

import mockProduct from '../mock_api/mock_product.js';
import mockStyles from '../mock_api/mock_styles.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 1,
      product: mockProduct,
      styles: mockStyles,
    }
  }

  componentDidMount() {
    // invoke retrieveProduct
  }

  retrieveProduct() {
    // uses AJAX call to server route which retrieves product info from API based on this.state.productId
  }

  render() {

    return (
      <div>
        <div>ATELIER</div>
        <Overview product={this.state.product} styles={this.state.styles}/>
        <RelatedItems />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
      </div>
    )

  }


}

export default App;