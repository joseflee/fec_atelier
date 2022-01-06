var Promise = require('bluebird');
var { APIkey } = require('../config.js');
const axios = require('axios');

var retrieveProducts = (id) => {

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

var parseResults = (array, term) => {

  var result;

  for (var i = 0; i < array.length; i++) {
    if (array[i].name.toLowerCase() === term) {
      result = array[i].name;
    } else {
      result = 'item not found'
    }
  }
  return result;
}

module.exports ={
  retrieveProducts: retrieveProducts,
  conductSearch: conductSearch
}