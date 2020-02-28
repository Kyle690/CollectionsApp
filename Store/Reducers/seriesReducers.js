import {ADD_SERIES, DELETE_SERIES, UPDATE_SERIES, CLEAR_ALL_SERIES} from "../Types";
import {IDGenerator} from "../../Functions";

const INITIAL_STATE={
    series:{}
};

export default (state=INITIAL_STATE,action)=>{
    switch (action.type){
        case ADD_SERIES:
            state.series[IDGenerator()]=action.payload;
            return {...state, series:state.series};
        case UPDATE_SERIES:
            state.series[action.payload.id]=action.payload.data;
            return {...state, series:state.series};
        case DELETE_SERIES:
            delete state.series[action.payload];
            return {...state, series:state.series};
        case CLEAR_ALL_SERIES:
            return {series:{}};
        default:
            return {...state}
    }
}