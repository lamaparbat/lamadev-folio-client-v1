const initialState = 0
const workerReducer = (state = initialState, action) => {
   switch(action.type){
   	  case "siteData": return action.data
   	  case "isLoading": return action.data
   	  default:return state
   }
}
export default workerReducer
