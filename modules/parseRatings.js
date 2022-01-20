var parseAverageRating = (obj) => {

  var results = obj.results;
  var terms = obj.results.length;
  var sum = 0;

  for (var i = 0; i < results.length; i++) {
    sum += results[i].rating;
  }

  return sum / terms;
}

export default parseAverageRating;
