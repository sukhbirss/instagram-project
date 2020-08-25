import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { showAlert } from './extra'
import {Link} from "react-router-dom";
import {UserContext} from './App'

const MyFollowing = () => {
  const [data,setData] = useState([]);
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
      fetch("/users/following",{
        method:"GET",
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

const unfollow = async(id) =>{
    try{    
        const res = await axios({
          method:'PATCH',
          url: '/users/unfollow',
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },  
          data: {id}
        });
         if(res.data.status === "success"){
          console.log(res);
          showAlert('success', 'successfull!');
           const newData = data.filter(item=>{
                return item._id !== id
            })
          setData(newData)

          dispatch({type:"UPDATE",payload:res.data.user});
          localStorage.setItem('user',JSON.stringify(res.data.user));
          
         }
      }catch(err){
        showAlert('error',id);
    }
};

	return (
	   <div className="adjust4">

      {data.map((el,i)=>{
    			 return(

    			     <div className="follow">                         
                  <img src="https://picsum.photos/seed/picsum/536/354" alt="hfhd" className="dp"/>
                  <Link to="/profile/"><h2 className="text-white fitthis" >{el.name}</h2></Link>                
                  <button className="follow-btn" onClick={() => unfollow(el._id)}>unfollow</button>
                </div>
    			)

    })}
    <h2>{data.length}</h2>
	</div>
		);
};

export default MyFollowing;