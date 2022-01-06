const express = require('express');

const app = express();
const { retrieveProducts, conductSearch } = require('./apiMethods.js');

var port = 3000;

app.listen(port, () => {
  console.log('serving on 3000');
})

app.use(express.static('public'));

app.get('/products/:id', (req, res) => {

  var id = req.params.id;

  retrieveProduct(id).then((data) => {
    console.log(data)
    res.send(data);
  })

})

app.get('/search/:searchTerm', (req, res) => {

  var query = req.params.searchTerm;
  conductSearch(query).then(data => {console.log(data)});

})