import {RESET_START, UPDATE_START} from "../Types";

const INITIAL_STATE={
  hasLoaded:false,
  signedInBefore:false
};

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case UPDATE_START:
            return {...state,hasLoaded: true, signedInBefore: true}
        case RESET_START:
            return {...state,hasLoaded: false};
        default:
            return {...state}
    }
}