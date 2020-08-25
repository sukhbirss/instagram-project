import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { showAlert } from './../extra/extra'
import {Link} from "react-router-dom";
import './me.css'
const Me =() =>{
  
  const [data,setData] = useState([]);
  useEffect(()=>{
      fetch("/users/post/mypost",{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
      })
      .then(res=>res.json())
      .then(res => {setData(res.post)
        console.log(res)})
      .catch(err =>console.log(err)) 

      
},[]);

const deletePost = async(id,postedById) =>{
    try{
      
        const res = await axios({
          method:'DELETE',
          url: '/users/post/mypost',
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },  
          data: {id,postedById}
        });
         if(res.data.status === "success"){
          console.log(res);
          
          showAlert('success', 'post deleted successfully!');
          
         }

      }catch(err){
        showAlert('error',id);

    }

};

       
	return (<>

        <div className="pbox">

                  <div className="profilepic">
                  {JSON.parse(localStorage.getItem("user")).photo !== "default.jpg"
                      ?
                      <img src={JSON.parse(localStorage.getItem("user")).photo} alt="profile pic" className="profilepic" />  
                      :
                      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile pic" className="profilepic" />  

                  }
                  </div>
                  <div className="myname">
                      <h3>{JSON.parse(localStorage.getItem("user")).name}</h3>
                  </div>
                  <div className="details">
                    <div className="layer">
                       <h2>post</h2>
                    <Link to="/follower" ><h2  className="text-white" >follower</h2></Link>
                    <Link to="/following" ><h2  className="text-white" >following</h2></Link>

                    </div>
                    <div className="layer layer2">
                       <h2>{data.length}</h2>
                       <h2>{JSON.parse(localStorage.getItem("user")).follower.length}</h2>
                    
                       <h2>{JSON.parse(localStorage.getItem("user")).following.length}</h2>
                    </div>
                    <div className="layer">
                       <p>Bio coming soon</p>

                    </div>
                  </div>
                </div>
       <div className="adjust3">

          {
            data.map((el,i)=>{
               return(
                 <div className="boxx" key={i}>

                      <div className="dp-wrap" key={i}>
                            <i class="delete material-icons"  onClick={() => deletePost(el._id,el.postedBy._id)}>delete</i>

                      </div>
                      <div className=" me cardtemp">
                          <img src={el.photo} alt={el.text} className="me image"/>  
                    
                      </div>

                      <div className="me-hc heart-comment">
                                            
                            <i class="material-icons big">favorite_border</i>                           
                              <h4>{el.likes.length} likes</h4>

                           <div className="noofcomments">   
                            <h4>{el.comment.length} comments</h4>
                          </div>
                      </div>

                      

                      <div className="post-info-me">                 
                        <h4>-{el.text}</h4>           
                      </div>

                      <div className="box show-comments">
                          {el.comment.map((ell,i)=>{if(i<3){return(<div className="commsection">
                                                                        <h3>{ell.username}:</h3>
                                                                        <h4>{ell.text}</h4>
                                                                      </div>
                                                                  )}})}
                      </div>
                  </div>
                      )
                             }

              )}
       </div>
        <div className="postbtn">
            <Link to="/post">  <i className="post material-icons">add</i> </Link>
           
        </div>
    </> 
	)
}

export default Me;
