import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { showAlert } from './../extra/extra'
import {UserContext} from './../App'

const Follow = () => {
  const [data,setData] = useState([]);
const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
      fetch("/users",{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
      })
      .then(res=>res.json())
      .then(res => {
        if(res.message ==="jwt expired"){
          window.location.replace("sukhinsta.heroku.com/login");
        }
        setData(res.user); 
        console.log(res)})
      .catch(err =>console.log(err)) 

},[]);

const follow = async(id) =>{
    try{    
        const res = await axios({
          method:'PATCH',
          url: '/users/follow',
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },  
          data: {id}
        });
         if(res.data.status === "success"){
          console.log("hello",res);
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
                  <h2 className="fitthis">{el.name}</h2>
                  <button className="follow-btn" onClick={() => follow(el._id)}>follow</button>
                </div>
    			)
    })}
	</div>
		);
};

export default Follow;