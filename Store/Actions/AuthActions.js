import {auth}from '../../Firebase';
import {AUTH_LOGIN, AUTH_LOGOUT, IMPORT_MOVIES, IMPORT_SERIES, RESET_START, UPDATE_START} from "../Types";

export const logUserIn=({email,password},callback)=>dispatch=>{

    auth.signInWithEmailAndPassword(email,password)
        .then(user=>{
            const {displayName, email}=user.user;
            dispatch({type:AUTH_LOGIN,payload:{name:displayName,email}});
            dispatch({type:UPDATE_START});
            callback({status:1});
        })
        .catch(err=>err?callback({status:2,msg:err.message}):null)
}

export const LogUserOut=(callback)=>dispatch=>{
    auth.signOut()
        .then(()=>{
            dispatch({type:AUTH_LOGOUT});
            dispatch({type:IMPORT_MOVIES,payload:{}});
            dispatch({type:IMPORT_SERIES,payload:{}});
            dispatch({type:RESET_START});
            callback({status:1});
        })
        .catch(err=>err?callback({status:2,msg:err.message}):null);
}

export const checkLogin=(callback)=>dispatch=>{
    auth.onAuthStateChanged(user=>{
        if(user){
            dispatch({type:AUTH_LOGIN, payload:{name:user.displayName,email:user.email}});
            callback({status:1});
        }else{
            callback({status:2});
        }
    })
}

export const RegisterUser=({email,name,password},callback)=>dispatch=>{
    auth.createUserWithEmailAndPassword(email,password)
        .then(user=>{
            dispatch({type:AUTH_LOGIN,payload:{name,email}});
            dispatch({type:UPDATE_START});
            callback({status:1});
        })
        .catch(err=>err?callback({status:2,msg:err.message}):null);
}

export const UpdateUser=({email,name},callback)=>async dispatch=>{
    const user= auth.currentUser;
    if(user){
       await user.updateEmail(email).catch(err=>err??callback({status:2,msg:err.message}));

       await user.updateProfile({displayName:name}).catch(err=>err?callback({status:2,msg:err.message}):null);
        dispatch({type:AUTH_LOGIN,payload:{name,email}});
        callback({status:1});

    }else{
        callback({status:2,msg:'Error: No user!'})
    }

};

export const ResetPassword=(email,callback)=>{
    auth.sendPasswordResetEmail(email)
        .then(()=>callback({status:1}))
        .catch(err=>err?callback({status:2,msg:err.message}):null);
}