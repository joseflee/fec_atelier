import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
const Overview = lazy(() => import('../components/Overview.jsx'));
const QuestionsAndAnswers = lazy(() => import('../components/QuestionsAndAnswers.jsx'));
const RatingsAndReviews = lazy(() => import('../components/RatingsAndReviews.jsx'));
const RelatedItems = lazy(() => import('../components/RelatedItems.jsx'));
import Search from '../components/Search.jsx';


import $ from 'jquery';
import { APIkey } from '../config.js';

import { FaSistrix } from 'react-icons/fa';
import parseAverageRating from '../modules/parseRatings.js';
import mockProduct from '../mock_api/mock_product.js';
import mockStyles from '../mock_api/mock_styles.js';
import getPercentRecommended from '../modules/percentRecommended.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 64620,
      product: null,
      styles: null,
      ratings: null,
      ratingsMeta: {},
      averageRating: null,
      percentRecommended: null,
      allRelated: [],
      outfitIds: [],
      outfits: [],
      outfitView: [],
      outfitPosition: 0,
      visibleReviews: [],
      currentReviews: [],
      reviewCount: null,
      characteristics: null,
      descriptions: {
        Size: ['A size too small', 'Half a size too small', 'Perfect', 'Half a size too big', 'A size too wide'],
        Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly Wide', 'Too wide'],
        Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
        Quality: ['Poor', 'Below Average', 'What I expect', 'Pretty great', 'Perfect'],
        Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
        Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slighly long', 'Runs long']
      },
      clicks: []
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
    this.retrieveRatingsMeta = this.retrieveRatingsMeta.bind(this);

    this.filterByStars = this.filterByStars.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.compareHelpfulness = this.compareHelpfulness.bind(this);
    this.compareNewest = this.compareNewest.bind(this);
    this.compareRelevance = this.compareRelevance.bind(this);
    this.handleFirstTwoReviews = this.handleFirstTwoReviews.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);

    this.trackClick = this.trackClick.bind(this);
  }

  componentDidMount() {

    this.retrieveProduct(this.state.productId);
    this.retrieveRelatedProducts(this.state.productId);
    this.retrieveRatings();
    this.retrieveRatingsMeta();


    if (localStorage.getItem('outfitIds')) {
      var outfitIds = localStorage.getItem('outfitIds').split(',');
      var outfitIds = outfitIds.map(id => {
        return Number(id);
      })
      this.setState({
        outfitIds
      }, () => {
        this.retrieveAllForOutfits(this.state.outfitIds);
      })
    }
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
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=${this.state.productId}&count=200`,
      headers: {
        "Authorization": APIkey
      }
    }).done((res) => {
      var reviews = res.results;
      var count = reviews.length;
      var firstTwo = this.handleFirstTwoReviews(reviews);
      var percent = getPercentRecommended(reviews);
      self.setState({
        ...self.state,
        ratings: res,
        visibleReviews: firstTwo,
        currentReviews: reviews,
        reviewCount: count,
        percentRecommended: percent
      }, () => {
        self.setState({
          ...self.state,
          averageRating: parseAverageRating(this.state.ratings)
        })
      })
    })

  }

  retrieveRatingsMeta() {
    $.ajax({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${this.state.productId}`,
      headers: {
        'Authorization': APIkey
      }
    }).done((res) => {
      var characteristics = Object.keys(res.characteristics);
      // console.log('after ratingsMeta api: ', characteristics);
      this.setState({
        ratingsMeta: res,
        characteristics: characteristics
      }, () => {
        // console.log('ratings meta in state: ', this.state.ratingsMeta);
      })
    })
  }

  // not case sensitive but spelling must be correct (product name)
  handleSearch(searchTerm) {

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
        if (data.length === 0) {
          this.retrieveAllForRelated(59553);
        } else {
          var dataObj = {};
          var withoutDuplicates = [];
          data.forEach(item => {
            if ( Number( productId ) !== Number ( item ) ) {
              dataObj[item] = true;
            }
          });
          for (var id in dataObj) {
            withoutDuplicates.push(id);
          }
          this.retrieveAllForRelated(withoutDuplicates);
          if (this.state.outfits.length > 0) {
            this.retrieveAllForOutfits(this.state.outfitIds)
          }
        }
      },
      error: (err) => {
        console.log('error getting related products', err);
      }
    })
  }

  retrieveAllForRelated(ids) {
    //var ids = ids.join( '&' );
    if (typeof (ids) === 'number') {
      ids = ids;
    } else {
      ids = ids.join('&');
    }
    $.ajax({
      method: 'GET',
      url: `related/${ids}`,
      success: (data) => {
        this.setState({
          allRelated: data
        }, () => { })
      },
      error: (err) => {
        console.log('error getting all for related', err)
      }
    })
  }

  retrieveAllForOutfits(ids) {
    var ids = ids.join('&');
    $.ajax({
      method: 'GET',
      url: `outfits/${ids}`,
      success: (data) => {
        var threeAtATime = data.slice(0, 3);
        this.setState({
          outfits: data,
          outfitView: threeAtATime,
        }, () => { })
      },
      error: (err) => {
        console.log('error getting outfit data', err);
      }
    })
  }


  handleRelatedCardClick(e) {
    var clickedCardId = e.currentTarget.getAttribute('data-txt');
    this.setState({
      productId: clickedCardId,
      allRelated: []
    }, () => {
      this.retrieveProduct(this.state.productId);
      this.retrieveRelatedProducts(this.state.productId);
      this.retrieveRatings();
      this.retrieveRatingsMeta();
    }
    )
  }

  addToOutfit() {
    if (this.state.outfitIds.indexOf(Number(this.state.productId)) === -1) {
      var outfitIds = this.state.outfitIds.concat(Number(this.state.productId));
      localStorage.setItem('outfitIds', outfitIds);
      this.setState({
        outfitIds,
      }, () => {
        this.retrieveAllForOutfits(this.state.outfitIds);
      })
    }
  }


  removeFromOutfits(e) {
    e.stopPropagation();
    var id = e.currentTarget.getAttribute('data-txt');
    var outfitIds = this.state.outfitIds;
    var targetIndex = outfitIds.indexOf(Number(id));
    outfitIds.splice(targetIndex, 1);
    localStorage.setItem('outfitIds', outfitIds);
    var outfits = this.state.outfits;
    var listIndex;
    outfits.forEach((item, index) => {
      if (item.id === Number(id)) {
        listIndex = index;
      }
    });
    outfits.splice(listIndex, 1);
    var outfitView = this.state.outfitView;
    var viewIndex;
    outfitView.forEach((item, index) => {
      if (item.id === Number(id)) {
        viewIndex = index;
      }
    });
    outfitView.splice(viewIndex, 1);

    this.setState({
      outfitIds,
      outfits,
      outfitView,
    }, () => { })
  }

  handleLeftArrow() {
    var newPosition;
    if (this.state.outfitPosition > 0) {
      newPosition = this.state.outfitPosition - 1;
    } else {
      newPosition = 0;
    }
    var newView = this.state.outfits.slice(newPosition, newPosition + 3);
    this.setState({
      outfitPosition: newPosition,
      outfitView: newView
    })

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

  // reviews handlers
  handleFirstTwoReviews(reviewsList) {
    var firstTwo = [];
    if (reviewsList.length === 1) {
      firstTwo.push(reviewsList[0]);
    } else if (reviewsList.length > 1) {
      firstTwo.push(reviewsList[0]);
      firstTwo.push(reviewsList[1]);
    }
    return firstTwo;
  }

  handleMoreReviews() {
    var reviewsList = this.state.currentReviews;
    var start = this.state.visibleReviews.length;
    var end = start + 2;
    var nextTwo = reviewsList.slice(start, end);
    var newState = this.state.visibleReviews.concat(nextTwo);
    var button = document.getElementById("moreReviews");
    this.setState({ visibleReviews: newState }, () => {
      if (this.state.visibleReviews.length === this.state.currentReviews.length) {
        button.style.display = "none";
      }
    });
    // future enhancement:
    // button should disappear after max height of element is reached
    // list should become scrollable
  }

  filterByStars(e) {
    var rating = Number(e.target.innerHTML[0]);
    var newReviews = this.state.ratings.results;
    var filtered = [];
    var button = document.getElementById("moreReviews");

    button.style.display = "block";

    newReviews.forEach((review) => {
      if (review.rating === rating) {
        filtered.push(review);
      }
    })

    newReviews = filtered;
    var firstTwo = this.handleFirstTwoReviews(newReviews);
    this.setState({
      ...this.state,
      visibleReviews: firstTwo,
      currentReviews: newReviews,
      isFiltered: true,
      changedSort: (this.state.changedSort + 1)
    })
  }

  compareRelevance(a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return b.helpfulness - a.helpfulness || d - c;
  }

  compareHelpfulness(a, b) {
    return b.helpfulness - a.helpfulness;
  }

  compareNewest(a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d - c;
  }

  handleSort(e) {
    var option = e.target.innerHTML;
    var reviews = this.state.currentReviews;
    var newReviews;
    var firstTwo;

    if (option === 'Helpfulness') {
      newReviews = reviews.sort(this.compareHelpfulness);
    }

    if (option === 'Newest') {
      newReviews = reviews.sort(this.compareNewest);
    }

    if (option === 'Relevance') {
      newReviews = reviews.sort(this.compareRelevance);
    }

    firstTwo = this.handleFirstTwoReviews(newReviews);

    this.setState({
      ...this.state,
      currentReviews: reviews,
      visibleReviews: firstTwo
      // changedSort: (this.state.changedSort + 1)
    })
  }

  trackClick(clickObj) {

    var newClicks = this.state.clicks;
    newClicks.push(clickObj);

    this.setState({
      ...this.state,
      clicks: newClicks
    }, () => {
      console.log('central state click counter => ', this.state.clicks)
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

        <div id={'overviewPlaceholder'}>
          <Suspense fallback={<div>Loading...</div>}>
            <div>{this.state.product && this.state.styles ? <Overview product={this.state.product} styles={this.state.styles} rating={this.state.averageRating} trackClick={this.trackClick} /> : null}</div>
          </Suspense>
        </div>

        <div id={'relatedPlaceholder'}>
          <Suspense fallback={<div>Loading...</div>}>
            {this.state.allRelated.length > 0 ? <RelatedItems all={this.state.allRelated} outfits={this.state.outfitView} outfitLength={this.state.outfits.length} clickCard={this.handleRelatedCardClick} addOutfit={this.addToOutfit} remove={this.removeFromOutfits} name={this.state.product} right={this.handleRightArrow} left={this.handleLeftArrow} position={this.state.outfitPosition} /> : null}
          </Suspense>
        </div>

        <div id={'questionsPlaceholder'}>
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsAndAnswers />
        </Suspense>
        </div>

        <div id={'ratingsPlaceholder'}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="ratingsAndReviews">
            {this.state.percentRecommended && this.state.averageRating && this.state.ratingsMeta ? <RatingsAndReviews reviews={this.state.currentReviews} averageRating={this.state.averageRating} percent={this.state.percentRecommended} ratingsMeta={this.state.ratingsMeta}
              productId={this.state.productId} descriptions={this.state.descriptions} visibleReviews={this.state.visibleReviews} handleSort={this.handleSort} filterByStars={this.filterByStars} handleMoreReviews={this.handleMoreReviews} reviewCount={this.state.reviewCount} characteristics={this.state.characteristics} /> : null}
          </div>
        </Suspense>
        </div>

      </div >
    )
  }
}

export default App;
