

var ratingToStar = (rating) => {

  console.log('round rating = 2.5')

  var roundedRating = Number(roundRating(rating));
  var percentage;

  console.log(typeof roundedRating);

  if (roundedRating === .25) {
    percentage = 5;
  } else if (roundedRating === .50) {
    percentage = 7;
  } else if (roundedRating === .75) {
    percentage = 9;
  } else if (roundedRating === 1) {
    percentage = 14
  } else if (roundedRating === 1.25) {
    percentage = 20;
  } else if (roundedRating === 1.5) {
    percentage = 22;
  } else if (roundedRating === 1.75) {
    percentage = 24;
  } else if (roundedRating === 2) {
    percentage = 29;
  } else if (roundedRating === 2.25) {
    percentage = 35;
  } else if (roundedRating === 2.5) {
    percentage = 37;
  } else if (roundedRating === 2.75) {
    percentage = 40;
  } else if (roundedRating === 3) {
    percentage = 44;
  } else if (roundedRating === 3.25) {
    percentage = 49;
  } else if (roundedRating === 3.5) {
    percentage = 52;
  } else if (roundedRating === 3.75) {
    percentage = 54;
  } else if (roundedRating === 4) {
    percentage = 59;
  } else if (roundedRating === 4.25) {
    percentage = 64;
  } else if (roundedRating === 4.5) {
    percentage = 67;
  } else if (roundedRating === 4.75) {
    percentage = 69;
  } else if (roundedRating === 5) {
    percentage = 74;
  }

  return percentage;

}

// round rating to nearest quarter

var roundRating = (rating) => {
  return (Math.round(rating * 4) / 4).toFixed(2);
}

export default ratingToStar;