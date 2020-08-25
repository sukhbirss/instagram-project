import React,{useState,useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import {UserContext} from './../App'
import { showAlert } from './../extra/extra'
import './login.css';


const Login = () => {
//............................................................................................
				//just time clock
	// let time = new Date().toLocaleTimeString();
	// const [ctime,setCtime] = useState(time);

	// const updateTime = () =>{
	// 	time = new Date().toLocaleTimeString();
	// 	setCtime(time)
	// };

	// setInterval(updateTime,1000);
	//......................................................
	const {state,dispatch} = useContext(UserContext);
  	const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const validateForm = () => {return email.length > 0 && password.length > 0;}
    const handleSubmit = (event) => event.preventDefault();
 
	const postData = async() =>{
		try{
		    const res = await axios({
		    	method:'POST',
		    	url: '/users/login',
		    	data: {
		    		email,
		    		password
		    	}
		    });
		     if(res.data.status === "success"){
		     	showAlert('success', 'Logged in successfully!');
		     	console.log(res)
		     	localStorage.setItem('jwt', res.data.token);
		     	localStorage.setItem('user',JSON.stringify(res.data.data.user));
		     	dispatch({type:"USER",payload:res.data.data.user});
		     	console.log(res.data.data.user);
		     	history.push('/')
		     }
	    }catch(err){
	    	showAlert('error', err.response.data.message);
	    }
};


	return (
		<>	
			

			<div id="wrapper">
			  <div className="main-content">
			    <div className="header">
			      <img src="https://i.imgur.com/zqpwkLQ.png" />
			    </div>
			    <div className="l-part">
			    	<form onSubmit={handleSubmit}>
  						
						<input type="text" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}  className="input-5" />
				      <div className="overlap-text">
						<input type="password" placeholder="Enter pass" value={password} onChange={e => setPassword(e.target.value)} className="input-5" />
				        <a href="#">Forgot?</a>
				      </div>
						<button block bsSize="large" disabled={!validateForm()} type="submit" onClick={() => postData()} className="btn-login"> Login </button>
					</form>
			    </div>
			  </div>
			  <div className="sub-content">
			    <div className="s-part">
			      Don't have an account?<a href="#">Sign up</a>
			    </div>
			  </div>
			</div>
			
	</>
		);
};

export default Login;