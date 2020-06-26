import React from "react";
import {Overlay, Text}from'react-native-elements';
import {ActivityIndicator, View} from "react-native";

const Loading=({show, message})=>{
    return (
        <Overlay
            isVisible={show}
            fullScreen
            overlayStyle={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'rgba(0,0,0,.5)'
            }}
        >
            <View>
                <ActivityIndicator size={'large'} color={'white'}/>
                <Text style={{color:'white', marginTop:15}} h4>{message?message:'Loading...'}</Text>
            </View>

        </Overlay>
    )
}

export default Loading;