var Promise = require('bluebird');
var { APIkey } = require('../config.js');
const axios = require('axios');
const parseAverageRating = require('../modules/parseRatingsInServer.js');

// retrieves product using id, returns a promise
var retrieveProduct = (id) => {

  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, {
    headers: {
      authorization: APIkey
    }
  }).then((response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  })

}

// retrieves styles using product id
var retrieveStyles = (id) => {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, {
    headers: {
      authorization: APIkey
    }
  }).then((response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  })

}


//retrieves product using search string, returns a promise
var conductSearch = (searchTerm) => {

  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', {
    headers: {
      authorization: APIkey
    }
  }).then((response) => {
    return parseResults(response.data, searchTerm)
  }).catch((err) => {
    console.log(err);
  })

}


// helper function to search products for target item
var parseResults = (array, term) => {

  var result = 'item not found';

  for (var i = 0; i < array.length; i++) {
    // console.log('product name', array[i].name.toLowerCase())
    // console.log('term', term);
    if (array[i].name.toLowerCase() === term) {
      result = array[i].id;
    }
  }
  return result;
}




var retrieveRelatedData = ( ids ) => {
  var prefix = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
  var headers = { authorization: APIkey };

  var getProducts = ( id ) => {
    return axios.get(`${prefix}/products/${id}`, {
      headers: headers
    })
  };
  var getStyles = ( id ) => {
    return axios.get(`${prefix}/products/${id}/styles`, {
      headers: headers
    })
  };
  var getReviews = ( id ) => {
    return axios.get(`${prefix}/reviews/?product_id=${id}`, {
      headers: headers
    })
  };

  var getAll = ( ids ) => {
    var allForId = ids.map( id => {
      var product = getProducts( id );
      var style = getStyles( id );
      var review = getReviews( id );
      return Promise.all( [ product, style, review ] );
    })

    var allForIds = Promise.all( allForId );
    var state = allForIds.map( data => {
      var [ productData, stylesData, reviewsData ] = data;

      return {
        ...productData.data,
        ...stylesData.data,
        rating: parseAverageRating.parseAverageRating (reviewsData.data ),
      }
    })
    return state;
  }

  return getAll(ids );
}

var postReview = (data) => {
  console.log('data: ', data);
  // data = JSON.stringify(data);
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', data, {
    headers: {
      'Content-Type': 'application/json',
      authorization: APIkey
    }
  }).then((res) => {
    return res;
  }).catch((err) => {
    console.log('Error in posting review: ', err);
  })
}

var updateHelpfulness = (data) => {
  console.log('data: ', data);
  var helpfulness = data.helpfulness.toString();
  return axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${data.reviewId}/helpful`, helpfulness, {
    headers: {
      authorization: APIkey
    }
  }).then((res) => {
    console.log('response from API: ', res.status, res.statusText);
    return res;
  }).catch((err) => {
    console.log('Error in updating helpfulness: ', err);
  })
}









module.exports ={

  retrieveProduct: retrieveProduct,
  conductSearch: conductSearch,
  retrieveStyles: retrieveStyles,
  retrieveRelatedData: retrieveRelatedData,
  postReview: postReview,
  updateHelpfulness: updateHelpfulness

}
