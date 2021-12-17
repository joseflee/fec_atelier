import React from 'react';
import $ from 'jquery';

var Style = (props) => {

  //props (single style name, img and checkmark / selected data are received and style circle is rendered )

  var index = props.featuredIndex;

  var handleClick = (i) => {

    props.changeStyle(i);

  }

  return (
    <div className={'styleSelector'}>
      <div className={'scrollBox'}>{props.styles.map((item, i) => {
        if (index === i) {
          return (
            <div key={i} className={'styleContainer'}>
            <div className={'title'}>{props.styleNames[i]}</div>
            <div className={'checkmark'}><span>&#10003;</span></div>
            <div className={`selectedStyle`} onClick={() => {handleClick(i)}}>{item}</div>
            </div>
          )
        } else {
          return (
            <div key={i} className={'styleItem'} onClick={() => {handleClick(i)}}>{item}</div>
          )
        }
      })}</div>
    </div>
  )

}

export default Style;