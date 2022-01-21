const express = require('express');
const expressStaticGzip = require('express-static-gzip')
const bodyParser = require('body-parser');

const app = express();

const { retrieveProduct, retrieveStyles, conductSearch, retrieveRelatedData, postReview, updateHelpfulness } = require('./apiMethods.js');

var jsonParser = bodyParser.json();
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

// GET styles by product ID
app.get('/styles/:id', (req, res) => {

  var id = req.params.id;

  retrieveStyles(id).then((data) => {
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





//GET all related data
app.get('/related/:ids', (req, res) => {

  var reqParam = req.params.ids;
  var ids = reqParam.split('&');
  retrieveRelatedData(ids).then(data => {
    res.send(data);
  }).catch(err => {
    console.log('error getting data from related API', err);
  });
})

app.get('/outfits/:ids', (req, res) => {

  var reqParam = req.params.ids;
  var ids = reqParam.split('&');
  retrieveRelatedData(ids).then(data => {
    res.send(data);
  })
})

//POST review
app.post('/reviews', jsonParser, (req, res) => {

  postReview(req.body).then((response) => {
    console.log('in server: ', response);
    console.log('status: ', response.status);
    res.status(response.status).send(response.statusText);
  }).catch((err) => {
    console.log(err);
  });

})

app.put('/helpful', jsonParser, (req, res) => {

  updateHelpfulness(req.body).then((response) => {
    console.log('in server ', response.status, response.statusText);
    res.status(response.status).send(response.statusText);
  }).catch(err => {
    console.log('error getting data from outfit API', err);
    res.send(err);
  });
})




