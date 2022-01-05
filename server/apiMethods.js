var Promise = require('bluebird');
var { APIkey } = require('../config.js');
const axios = require('axios');

var retrieveProducts = () => {

  var self = this;

  // $.ajax({
  //   method: 'GET',
  //   url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/',
  //   headers: {
  //     "Authorization": APIkey
  //   }
  // }).done((res) => {
  //   return new Promise((resolve, reject) => {
  //     resolve(res);
  //   })
  // })

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