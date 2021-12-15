import React from 'react';

var Style = (props) => {

  //props (single style name, img and checkmark / selected data are received and style circle is rendered )

  var temporaryStyleProps = ['style 1', 'style 2', 'style 3', 'style 4', 'style 5', 'style 6'];

  return (
    <div className={'styleSelector'}>{temporaryStyleProps.map((item, i) => (
      <div key={i} className={'styleItem'}>{item}</div>
    ))}</div>
  )

}

export default Style;