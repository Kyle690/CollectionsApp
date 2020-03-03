import React from "react";
import {ImageBackground} from "react-native";
import {ScreenHeight, ScreenWidth} from "../Styles";


const LoadingScreen =()=>{
  return (
     <ImageBackground
         source={require('../assets/splash.png')}
         imageStyle={{resizeMode:'contain'}}
         style={{height:ScreenHeight,width:ScreenWidth}}
     />
  )
};
export default LoadingScreen;