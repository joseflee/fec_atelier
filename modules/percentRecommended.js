var getPrecentRecommended = (reviews) => {
  // console.log('percent reviews: ', reviews);
  var recommendedCount = 0;
  reviews.results.forEach((review) => {
    if(review.recommend) {
      recommendedCount++;
    }
  })
  var percent = (recommendedCount / reviews.results.length) * 100;
  return percent.toFixed();
}

export default getPrecentRecommended;