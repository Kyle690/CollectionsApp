import {AUTH_LOGIN, AUTH_LOGOUT, GET_LAST_UPDATE} from "../Types";

const INITIAL_STATE={
    loggedIn:false,
    name:null,
    lastBackUp:null,
    email:null
}
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case AUTH_LOGIN:
            return {...state,loggedIn:true,name:action.payload.name,email:action.payload.email}
        case AUTH_LOGOUT:
            return {...state,loggedIn: false,name:null, email:null, lastBackUp:null};
        case GET_LAST_UPDATE:
            return {...state,lastBackUp:action.payload};
        default:
            return {...state};
    }
}