const express = require('express');
const app = express();
const { retrieveProducts } = require('./apiMethods.js');

var port = 3000;

app.listen(port, () => {
  console.log('serving on 3000');
})

app.use(express.static('public'));

app.get('/products', (req, res) => {

  retrieveProducts().then((data) => {
    console.log(data)
    res.send(data);
  })

})