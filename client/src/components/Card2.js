import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { showAlert } from './../extra/extra'
import {UserContext} from './../App'
import {Link} from "react-router-dom";

import './card2.css'
const Card2 =() =>{
  
  const {state,dispatch} = useContext(UserContext);

  dispatch({type:"USER",payload:localStorage.getItem("user")});
  const [data,setData] = useState([]);
  useEffect(()=>{
      fetch("/users/post/get",{
      
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
      })
      .then(res=>res.json())
      .then(res => {
        if(res.message ==="jwt expired"){
          window.location.replace("/login");
        }
        setData(res.post); 
        console.log(res.post)})
      .catch(err =>console.log(err)) 
   
},[]);

  const addComment = async(comment,id) =>{
    try{
     
        const res = await axios({
          method:'POST',
          url: '/users/post/comment',
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },  
          data: {
            comment,
            post:id
          }
        });
         if(res.data.status === "success"){
          showAlert('success', 'commented successfully!');
          console.log(res.data);
          const newData = data.map(item=>{
                if(item._id===id)
                    {
                      console.log("thispost",item)
                      return res.data.post}

                else{return item}

         })
           setData(newData)
         }

      }catch(err){
        showAlert('error', comment,id);

    }

};  

const likePost = async(id) =>{
    try{
        
        const res = await axios({
          method:'PATCH',
          url: '/users/post/like',
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },  
          data: {id}
        });
         if(res.data.status === "success"){
          console.log(res);
          showAlert('success', 'Liked successfully!');
          const newData = data.map(item=>{
                if(item._id===id)
                    {
                      console.log("thispost",item)
                      return res.data.post}

                else{return item}

         })
           setData(newData)
        console.log("neww",newData)
         }

      }catch(err){
        showAlert('error',id);

    }
    console.log(state)
};
      
const unLikePost = async(id) =>{
    try{
        
        const res = await axios({
          method:'PATCH',
          url: '/users/post/unlike',
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },  
          data: {id}
        });
         if(res.data.status === "success"){
          console.log(res);
          showAlert('success', 'unliked successfully!');
          const newData = data.map(item=>{
                if(item._id===id)
                    {
                      console.log("thispost",item)
                      return res.data.post}
                else{return item}
         })
           setData(newData)
        console.log("neww",newData)
         }

      }catch(err){
        showAlert('error',id);

    }
    console.log(state)
};

	return (
    <>
        <div className="adjust2">
          {
            data.map((el,i)=>{
               return(
                <>
                      <div className="dp-wrap" key={i}>
                          <img  src={el.photo} alt={el.text} className="dp"/>
                          <h2 className="fitthis">{el.postedBy.name}</h2>
                      </div>

                      <div className="cardtemp">
                          <img src={el.photo} alt={el.text} className="image"/>  
                          <form onSubmit={(e)=>{
                            e.preventDefault() 
                            addComment(e.target[0].value,el._id) }} className="comment" >
                             <input type="comment" placeholder="Enter text" className="input-3"/> 
                         </form>              
                      </div>

                      <div className="heart-comment">
                             {el.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                             ?  
                             <i class="material-icons big icon-red red-text"  onClick={() => unLikePost(el._id)}>favorite</i>
                             :
                             <i class="material-icons big"  onClick={() => likePost(el._id)}>favorite_border</i>
                             }
                           <div className="nooflikes"> 
                              <h4>{el.likes.length} likes</h4>
                          </div>
                           <div className="noofcomments"> 
                              <h4>{el.comment.length} comments</h4>
                          </div>
                      </div>

                      

                      <div className="post-info">                 
                        <h3>{el.postedBy.name}</h3>
                        <h4>-{el.text}</h4>           
                      </div>

                      <div >
                          {el.comment.map((ell,i)=>{if(i<3){return(<div className="commsection">
                                                                        <h3>{ell.username}:</h3>
                                                                        <h4>{ell.text}</h4>
                                                                      </div>
                                                                  )}})}
                      </div>
               </>
                      )
                             }
              )}
        </div>
        <div className="postbtn">
            <Link to="/post">  <i className="post material-icons">add</i> </Link>
           
        </div>
    </>
	)
};

export default Card2;
