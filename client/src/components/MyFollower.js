import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { showAlert } from './../extra/extra'

const MyFollowing = () => {
  const [data,setData] = useState([]);

  useEffect(()=>{
      fetch("/users/follower",{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
      })
      .then(res=>res.json())
      .then(res => {
        if(res.message ==="jwt expired"){
          window.location.replace("http://localhost:3000/login");
        }
        setData(res.user.following); 
        console.log(res)})
      .catch(err =>console.log(err))     
},[]);


	return (
	   <div className="adjust4">
      {data.map((el,i)=>{
    			 return(

    			     <div className="follow">                         
                  <img src="https://picsum.photos/seed/picsum/536/354" alt="hfhd" className="dp"/>
                  <h2 className="fitthis">{el.name}</h2>
                  <button className="follow-btn">following</button>
                </div>
    			)
    })}
	</div>
		);
};

export default MyFollowing;