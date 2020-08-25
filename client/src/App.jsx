import React,{createContext,useReducer,useEffect,useContext} from 'react';
import Todolist from './components/Todolist'
import Cards from './components/Cards'
import Signup from './components/Signup'
import Login from './components/Login'
import PostIt from './components/PostIt'
import Card2 from './components/Card2'
import Me from './components/Me'
import Follow from './components/Follow'
import MyFollowing from './components/Following'
import MyFollower from './components/Follower'
import Navbar from './Navbar'

import { Route,Switch,useHistory } from 'react-router-dom'
import {reducer,intialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)

	const user = JSON.parse(localStorage.getItem("user"))
	console.log(state,"app state");
	if(!user){
		history.push('login')
		
	}
  return(
  			<Switch>
			    <Route exact path="/" component={Card2}/>
			    <Route path="/todolist" component={Todolist}/>
			    <Route path="/signup" component={Signup}/>
			    <Route path="/login" component={Login}/>
			    <Route path="/post" component={PostIt}/>
			    <Route path="/velekam" component={Cards}/>
			    <Route path="/me" component={Me}/>
			    <Route path="/find" component={Follow}/>
			    <Route path="/following" component={MyFollowing}/>
			    <Route path="/follower" component={MyFollower}/>

			</Switch>
  )
}

const App = () => {
	const [state,dispatch] = useReducer(reducer,intialState)

	return (
		<>
			<UserContext.Provider value={{state,dispatch}}>
				<Navbar/>
 				
 			 	<Routing />
			</UserContext.Provider>

		</>
		);
};
export default App;