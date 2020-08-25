export const intialState = null

export const reducer = (state,action) => {
	if(action.type === "USER"){
		console.log("from user")
		
		return action.payload
	}
	if(action.type === "CLEAR"){
		return null
	}
	if(action.type=="UPDATE"){
        return {
            ...state,
            follower:action.payload.follower,
            following:action.payload.following
        }
    }
	return state
    
}