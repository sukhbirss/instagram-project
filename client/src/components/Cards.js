import React from 'react';
import Data from './Data'
import Card from './Card'



const App = () => {

	return (
		<>	
			  <div className="adjust">
				  {Data.map(el=>{
				  	return (<Card src= {el.src} title={el.title} season={el.season} ep={el.ep}/>);
				  })}
			  </div>
		</>
		);
};

export default App;