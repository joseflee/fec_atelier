import React from 'react';
import $ from 'jquery';

var Style = (props) => {

  var index = props.featuredIndex;

  var handleClick = (i) => {

    props.changeStyle(i);

  }

  var resizeImage = (image) => {

    var sizedImage = image.split('');
    sizedImage.splice(sizedImage.length - 33, 33);
    sizedImage = sizedImage.join('').concat('&w=80&h=auto');

    return sizedImage;

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
            <img className={`selectedStyle`} alt={item} onClick={() => {handleClick(i)}} src={resizeImage(item)} alt={'Atelier style image'}/>
            </div>
          )
        } else {
          return (
            <img key={i} className={'styleItem'} alt={item} onClick={() => {handleClick(i)}} src={resizeImage(item)}/>
          )
        }
      })}</div>
    </div>
  )

}

export default Style;