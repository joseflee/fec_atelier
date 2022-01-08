import React from 'react';

var CharacteristicRating = (props) => {
  console.log('char', props.char);
  return (
    <div className="charBreakdown">
      <header className="charBarHeader">Comfort</header>
      <div className="charBarOuter">
        <div className="charBarInner"></div>
      </div>
      <p className="charBarDesc1">Poor</p>
      <p className="charBarDesc2">Perfect</p>
    </div>
  )
}

export default CharacteristicRating;