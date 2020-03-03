import {UPDATE_START} from "../Types";


export const updateStart=(callback)=>(dispatch,getState)=>{
   const startStatus=getState().Settings.hasLoaded;


   !startStatus? dispatch({type:UPDATE_START}):null;

  callback();
};