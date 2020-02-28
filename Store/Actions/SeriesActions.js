import {ADD_SERIES,UPDATE_SERIES,DELETE_SERIES,CLEAR_ALL_SERIES} from "../Types";

export const AddSeries=(seriesD,callback)=>(dispatch, getState)=>{
    // need to get state and ensure movie is not there already
    const series = getState().SeriesCol.series;

    let add=true;

    Object.keys(series).map(key=>{
        const {title}=series[key];
        if(title===seriesD.title){
            add=false
        }
    });


    if(add){
        dispatch({type:ADD_SERIES,payload:seriesD});
        callback({status:1});
    }else{
        callback({status:2,msg:'You already have this movie in your collection.'})
    }



};
export const UpdateSeries=(id,series,callback)=>dispatch=>{
    dispatch({type:UPDATE_SERIES,payload: {id,data:series}});
    callback({status:1})
};
export const DeleteSeries=(id,callback)=>dispatch=>{
    dispatch({type:DELETE_SERIES,payload:id});
    callback({status:1});
};

export const ClearAllSeries=(callback)=>dispatch=>{
    dispatch({type:CLEAR_ALL_SERIES});
    callback({status:1})
};