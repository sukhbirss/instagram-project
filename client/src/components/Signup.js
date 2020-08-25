import React,{useState,useEffect,useContext} from 'react';
import { showAlert } from './../extra/extra';
import {useHistory} from 'react-router-dom';
import {UserContext} from './../App';

import './signup.css';

const Signup = () => {
//............................................................................................
				//just time clock
	// let time = new Date().toLocaleTimeString();
	// const [ctime,setCtime] = useState(time);

	// const updateTime = () =>{
	// 	time = new Date().toLocaleTimeString();
	// 	setCtime(time)
	// };

	// setInterval(updateTime,1000);
	//.......................................................
    const [photo,setPhoto] = useState("");
    const [picurl,setPicUrl] = useState("")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
  	const history = useHistory()


    const validateForm = () => {return email.length > 0 && password.length > 0;}
    const handleSubmit = (event) => event.preventDefault();
 
 	useEffect(()=>{
 		if(picurl){

	 		fetch("/users/signup",{
	 			method:"POST",
	 			headers:{
	 				"Content-Type":"application/json"
	 			},
	 			body:JSON.stringify({
	 				name,
	 				email,
	 				password,
	 				passwordConfirm,
	 				photo:picurl
	 			})
	 		}).then(res=>res.json())
	 		.then(data=>{
	 			 if(data.status === "success"){       
	          showAlert('success', 'signup successfully!');       
	         }
			 
			history.push('login')

	 			console.log(data)
	 		})
	 	}
 	},[picurl])
	
	const userPic = () =>{
			const data = new FormData();
		    data.append("file",photo)
			data.append("upload_preset","sukhbir-insta")
			data.append("cloud_name","sukhbir")
			fetch("https://api.cloudinary.com/v1_1/sukhbir/image/upload",{
				method:"post",
				body:data
			})
			.then(res=>res.json())
			.then((data) => {
				console.log(data);
				setPicUrl(data.url)
				console.log(picurl)
			})
			.catch(err =>console.log(err))

};
	return (
		<>	
		<div className="white-box">
			<div className="instagram-logo">
			    <img src="https://i.imgur.com/zqpwkLQ.png" />	    
			   
			    <p className="sukhbir">Instagram's Lil bro- by sukhbir singh</p>
			</div>
			<div className="form-signup">
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} className="input-1"/> <br/>
					<input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} className="input-1"/> <br/>
					<input type="password" placeholder="Enter pass" value={password} onChange={e => setPassword(e.target.value)} className="input-1"/> <br/>
					<input type="password" placeholder="confirm pasword" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} className="input-1" /> <br/>
					<input type="file" className="file" onChange={(e)=>setPhoto(e.target.files[0])} /> <br/> <br/>
					<button className="btn-signup" disabled={!validateForm()} type="submit" onClick={() => userPic()} > Signup </button>
				</form>
			</div>
		</div>
		</>
		);
};

export default Signup;