import React from 'react';

function Card(props){
	return (
  <>
      <div className="dp-wrap" key={props.key}>
          <img  src={props.src} alt={props.title} className="dp"/>
          <p>{props.season}</p>
      </div>
  	  <div className="cardtemp">
    		<img 
    		src={props.src}
    		alt={props.title}
    		className="image"
    		/>
      </div>
      <div>
        
       </div>
       <div className="post-info">
         <h3 contentEditable >sukhbir_ss</h3>
         <h4>-{props.title}</h4>
      </div>

	</>
  )
}

export default Card;