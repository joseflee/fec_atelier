import React from 'react';

var Style = (props) => {

  //props (single style name, img and checkmark / selected data are received and style circle is rendered )

  var createTemporaryStyleProps = () => {

    var result = [];
    for (var i = 0; i < 15; i++) {
      result.push('style');
    }
    return result;
  }

  var temporaryStyleProps = createTemporaryStyleProps();

  return (
    <div className={'styleSelector'}>
      <div className={'scrollBox'}>{temporaryStyleProps.map((item, i) => (
        <div key={i} className={'styleItem'}>{item}</div>
      ))}</div>
    </div>
  )

}

export default Style;