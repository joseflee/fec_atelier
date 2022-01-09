var Promise = require('bluebird');
var { APIkey } = require('../config.js');
const axios = require('axios');
const parseAverageRating = require('../modules/parseRatingsInServer.js');

// retrieves product using id, returns a promise
var retrieveProduct = (id) => {

  var self = this;

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










var retrieveRelatedData = (ids, cb) => {
  //3 api calls per id
  console.log('ids', ids);
  var allData = [];
  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    let idData = {};
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, {
      headers: {
        authorization: APIkey
      }
    })
    .then((data) => {
      idData = {...data.data}
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, {
        headers: {
          authorization: APIkey
        }
      })
      .then((data) => {
        idData = {...idData, ...data.data}
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/?product_id=${id}`, {
          headers: {
            authorization: APIkey
          }
        })
        .then((data) => {
          var averagedRating = parseAverageRating.parseAverageRating(data.data);
          var ratingObj = {rating: averagedRating};
          idData = {...idData, ...ratingObj};
          //console.log('data', idData);
          allData.push(idData);
          //console.log('allData', allData);
          if (ids.length === allData.length) {
            //console.log('all datasss', allData);
            cb(allData);
          }
        })
        .catch((err) => {
          console.log('error in the promise chain', err)
        })
      })
    })
  }
}


module.exports ={
  retrieveProduct: retrieveProduct,
  conductSearch: conductSearch,
  retrieveRelatedData: retrieveRelatedData,
}