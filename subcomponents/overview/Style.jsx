import React from 'react';
import $ from 'jquery';

var Style = (props) => {

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
            <div className={'checkBox'}>
            <div className={'checkmark'}><span>&#10003;</span></div>
            </div>
            <img className={`selectedStyle`} onClick={() => {handleClick(i)}} src={item} alt={'Atelier style image'}/>
            </div>
          )
        } else {
          return (
            <img key={i} className={'styleItem'} onClick={() => {handleClick(i)}} src={item}/>
          )
        }
      })}</div>
    </div>
  )

}

export default Style;