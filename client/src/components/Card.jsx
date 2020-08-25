import React from 'react';

function Card(props){
	return (
  <>
  	  <div className="card2">
    		<img 
    		src={props.src}
    		alt={props.title}
    		className="pic"
    		/>

    		 <div className="card_info">
    		 <h2 contentEditable >{props.title}</h2>
    		 <p>{props.season}</p>
    		 <p>{props.ep} Likes<button className="btn">Like </button></p>
    		
    		 </div>
    </div>
	</>
  )
}

export default Card;

