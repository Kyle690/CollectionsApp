import {UPDATE_START} from "../Types";

const INITIAL_STATE={
  hasLoaded:false
};

export default (state=INITIAL_STATE,action)=>{
    if(action.type===UPDATE_START){
        return {...state, hasLoaded: true}
    }else{
        return {...state}
    }


}