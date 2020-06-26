import {db,auth}from '../../Firebase';
import * as Network from 'expo-network';
import {GET_LAST_UPDATE, IMPORT_MOVIES, IMPORT_SERIES, RESET_START, UPDATE_START} from "../Types";

export const updateStart=(callback)=>(dispatch,getState)=>{
    //check if user has been here before
    dispatch({type:UPDATE_START})
  callback();
};

export const OpenHelp=(callback)=>dispatch=>{
    dispatch({type:RESET_START});
    callback();
}

export const BackUpData=(callback)=>async(dispatch,getState)=>{
    const uid = auth.currentUser.uid;
    const movies = getState().MovieCol.movies;
    const series = getState().SeriesCol.series;

    if(Object.keys(movies).length>0&& Object.keys(series).length>0){
        const ref = db.ref(`users/${uid}`);
        ref.update({
            movies,
            series,
            lastBackUp:Date.now()
        }).then(()=>{
            callback({status:1});
        })
            .catch(err=>err?callback({status:1,msg:err.message}):null);
    }else{
        callback({status:2,msg:'No Data to back up!'});
    }
};

export const CheckInternet=async()=>{
  const network =await Network.getNetworkStateAsync();

  return network.isConnected && network.isInternetReachable;
};

export const ImportData=(callback)=>async(dispatch,getState)=>{
    const uid=auth.currentUser.uid;
    if(uid){
        const ref =db.ref(`users/${uid}`);
        ref.once('value').then(snap=>{
            const data = snap.val();
            if(data){
                const {movies,series, lastBackUp}=data;
                dispatch({type:IMPORT_MOVIES,payload:movies});
                dispatch({type:IMPORT_SERIES,payload:series});
                dispatch({type:GET_LAST_UPDATE,payload:lastBackUp});
                callback({status:1});
            }else{
                callback({status:2,msg:'No previous backups found!'});
            }
        })
            .catch(err=>err??callback({status:2,msg:err.message}));
    }else{
        callback({status:2,msg:'Please login to retrieve your details!'});
    }

}

export const DeleteLibrary=(callback)=>async(dispatch)=>{
    const uid = auth.currentUser.uid;
    if(uid){
        const ref = db.ref(`users/${uid}`);
        ref.remove()
            .then(()=>{
                dispatch({type:IMPORT_MOVIES,payload:{}})
                dispatch({type:IMPORT_SERIES,payload:{}});
                dispatch({type:GET_LAST_UPDATE,payload:null});
                callback({status:1});
            }).catch(err=>err??callback({status:2,msg:err.message}))
    }
}