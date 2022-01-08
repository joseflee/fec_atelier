var parseAverageRating = (obj) => {

  var results = obj.results;
  var terms = obj.results.length;
  var sum = 0;

  for (var i = 0; i < results.length; i++) {
    sum += results[i].rating;
  }

  var average = sum / terms;

  return average.toFixed(1);

}

export default parseAverageRating;