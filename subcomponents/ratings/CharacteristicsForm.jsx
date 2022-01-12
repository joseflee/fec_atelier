import React from 'react';

var CharacteristicsForm = (props) => {

  var lowercase = props.char.toLowerCase();

  return (
    <div className="characteristicRating" id={`char${props.char}`}>
      <fieldset className="required" id={`${ lowercase }Fieldset`} data-validate="true" >
        <legend>{props.char} </legend>
        <p className={`${lowercase}RatingDesc`} id = {`${lowercase}Desc`}> None selected</p >
        <label htmlFor={`${lowercase}1`}>1</label>
        <input type="radio" name={props.char} id={`${lowercase}1`} value={1} onClick={props.handleCharRating}></input>
        <label htmlFor={`${lowercase}2`}>2</label>
        <input type="radio" name={props.char} id={`${lowercase}2`} value={2} onClick={props.handleCharRating}></input>
        <label htmlFor={`${lowercase}3`}>3</label>
        <input type="radio" name={props.char} id={`${lowercase}3`} value={3} onClick={props.handleCharRating}></input>
        <label htmlFor={`${lowercase}4`}>4</label>
        <input type="radio" name={props.char} id={`${lowercase}4`} value={4} onClick={props.handleCharRating}></input>
        <label htmlFor={`${lowercase}5`}>5</label>
        <input type="radio" name={props.char} id={`${lowercase}5`} value={5} onClick={props.handleCharRating}></input>
      </fieldset >
    </div >
  )
}

export default CharacteristicsForm;