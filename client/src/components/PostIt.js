import React,{useState,useEffect} from 'react';
// import axios from 'axios';
import './postIt.css'
import { showAlert } from './../extra/extra'

const PostIt = () => {
	//.......................................................
    const [text, setText] = useState("")
    const [photo,setPhoto] = useState("")
    const [picurl,setPicUrl] = useState("")

    const handleSubmit = (event) => event.preventDefault();
 	
 	useEffect(()=>{
 		console.log('2');
 		if(picurl){

 				fetch("/users/post",{
				headers:{
		    		"Content-Type":"application/json",
		    		"Authorization":"Bearer " + localStorage.getItem("jwt")
		    	},	
				body:JSON.stringify({text,photo,picurl})
				})

				.then(res=>res.json())
				.then(data => {
					console.log(data)
					if(data.status === "success"){
		     			showAlert('success', 'posted  successfully!');
		     		}
		     	})
				.catch(err =>console.log(err))

			}
			 
 	},[picurl])

	const postData = () =>{
		
			console.log('1');
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
			
			<div className="white-box-post">
				<div className="formwrap">
					<div className="form">
						<form onSubmit={handleSubmit}>
							<h3>Type a title</h3>
							<input type="text4" placeholder="Enter text" value={text} onChange={e => setText(e.target.value)} /> <br/>
							<h3>chhose your profile pic</h3>
							<input type="file" onChange={(e)=>setPhoto(e.target.files[0])} /> <br/>
							<button className="btn-post" type="submit" onClick={() => postData()} > Post </button>
						</form>
					</div>
				</div>
			</div>
		</>
		);
};

export default PostIt;