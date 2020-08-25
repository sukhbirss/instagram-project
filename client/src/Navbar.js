import React,{useContext} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from './App';

const Navbar = () => {
	const {state,dispatch} = useContext(UserContext)
	const logout =()=>{
		localStorage.clear()
        dispatch({type:"CLEAR"})
		window.location.replace("/login");

	}
	   const renderList = ()=>{
	   	
       if(localStorage.getItem("user")){

           return [
            	<Link to="/">        <div className="home text-white">  Home     </div></Link>,
				<Link to="/me">   <span className="text-white"> Me  </span> </Link>,
			    <button className="btn #c62828 red darken-3" onClick={logout}> Logout </button>,
				<Link to="/find">   <span className="text-white"> Find  </span> </Link>
           ]
       }else{
         return [
				<Link to="/signup">    <span className="text-white">  signup     </span> </Link>,
				<Link to="/login">   <span className="text-white"> login  </span> </Link>

         
         ]
       }
     }

	return ( 

		<div className="navbar">
			<div className="text-flex">
			
			   {renderList()}

			</div>
		</div>
		
	)
}

export default Navbar;

