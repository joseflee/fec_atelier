var Promise = require('bluebird');
var APIkey = require('../config.js');


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

module.exports ={
  retrieveProducts: retrieveProducts
}