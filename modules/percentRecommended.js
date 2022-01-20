var getPrecentRecommended = (reviews) => {
  // console.log('percent reviews: ', reviews);
  var recommendedCount = 0;
  reviews.forEach((review) => {
    if(review.recommend) {
      recommendedCount++;
    }
  })
  var percent = (recommendedCount / reviews.length) * 100;
  return percent.toFixed();
}

export default getPrecentRecommended;