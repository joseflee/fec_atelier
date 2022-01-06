var getPrecentRecommended = (reviews) => {
  // console.log('percent reviews: ', reviews);
  var recommendedCount = 0;
  reviews.results.forEach((review) => {
    if(review.recommend) {
      recommendedCount++;
    }
  })
  return (recommendedCount / reviews.results.length) * 100;
}

export default getPrecentRecommended;