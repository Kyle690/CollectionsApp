import {ADD_MOVIE,DELETE_MOVIE,UPDATE_MOVIE, CLEAR_ALL_MOVIES} from "../Types";

export const AddMovie=(movie,callback)=>(dispatch, getState)=>{
    // need to get state and ensure movie is not there already
    const movies = getState().MovieCol.movies;

    let add=true;

    Object.keys(movies).map(key=>{
       const {title}=movies[key];
       if(title===movie.title){
           add=false
       }
    });


    if(add){
        dispatch({type:ADD_MOVIE,payload:movie});
        callback({status:1});
    }else{
        callback({status:2,msg:'You already have this movie in your collection.'})
    }



};
export const UpdateMovie=(id,movie,callback)=>dispatch=>{
  dispatch({type:UPDATE_MOVIE,payload: {id,data:movie}});
  callback({status:1})
};
export const DeleteMovie=(id,callback)=>dispatch=>{
  dispatch({type:DELETE_MOVIE,payload:id});
  callback({status:1});
};
export const ClearAll=(callback)=>dispatch=>{
        dispatch({type:CLEAR_ALL_MOVIES});
        callback({status:1})
};