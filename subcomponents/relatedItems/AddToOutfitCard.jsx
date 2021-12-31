import React from 'react';

//a blank card on the front of the Outfit list
//that when clicked will add the currently viewed product to outfit list

export const AddToOutfitCard = (props) => {
  return (
    <>
      <div onClick={props.add} className="card">
        <h1>+</h1>
        <div>Add to Outfit</div>
      </div>
    </>
  )
}