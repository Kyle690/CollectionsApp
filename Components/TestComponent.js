import React from "react";
import {View,Image} from "react-native";

export const TestComponent=({data})=>{

    const {poster}=data;
    return (
            <Image
                source={{uri:poster}}
                style={{height:300,width:200,resizeMode:'contain'}}
            />
    )
};