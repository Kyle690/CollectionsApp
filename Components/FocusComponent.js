import React from "react";
import { useFocusEffect } from '@react-navigation/native';


const FocusComponent=({state,onUpdate})=>{

    useFocusEffect(
        React.useCallback(()=>{
            return onUpdate(state);
        },[state])
    );

    return null;
};
export default FocusComponent;