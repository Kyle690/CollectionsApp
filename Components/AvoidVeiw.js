import React from 'react';
import {KeyboardAvoidingView,Platform} from "react-native";

const AvoidView=({children, style})=>{
    return (
        <KeyboardAvoidingView
            style={style}
            behavior={'padding'}
            keyboardVerticalOffset={Platform.OS==='ios'?64:0}
        >
            {children}
        </KeyboardAvoidingView>
    )
}
export default AvoidView;