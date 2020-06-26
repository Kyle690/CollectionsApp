import {ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE, CLEAR_ALL_MOVIES, IMPORT_MOVIES} from "../Types";
import {IDGenerator} from "../../Functions";

const INITIAL_STATE={
    movies:{}
};

export default (state=INITIAL_STATE,action)=>{
    switch (action.type){
        case IMPORT_MOVIES:
            return {movies:action.payload};
        case ADD_MOVIE:
            state.movies[IDGenerator()]=action.payload;
            return {...state, movies:state.movies};
        case UPDATE_MOVIE:
            state.movies[action.payload.id]=action.payload.data;
            return {...state, movies:state.movies};
        case DELETE_MOVIE:
            delete state.movies[action.payload];
            return {...state, movies:state.movies};
        case CLEAR_ALL_MOVIES:
            return {...state,movies:{}};
        default:
            return {...state}
    }
}
