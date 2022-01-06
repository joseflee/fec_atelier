const express = require('express');
const expressStaticGzip = require('express-static-gzip')

const app = express();
const { retrieveProduct, conductSearch } = require('./apiMethods.js');

var port = 3000;

app.listen(port, () => {
  console.log('serving on 3000');
})

//app.use(express.static('public'));

// G-zipped static service
app.use('/', expressStaticGzip('public'));



// GET single product by ID
app.get('/products/:id', (req, res) => {

  var id = req.params.id;

  retrieveProduct(id).then((data) => {
    res.send(data.data);
  }).catch((err) => {
    console.log(err);
  });

})



// GET product by search term
app.get('/search/:searchTerm', (req, res) => {

  var query = req.params.searchTerm;

  conductSearch(query).then(data => {
    res.send(200, data);
  }).catch((err) => {
    console.log(err);
  });

})