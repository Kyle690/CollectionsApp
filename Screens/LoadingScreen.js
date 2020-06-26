import React from "react";
import {ImageBackground, Text, View, ActivityIndicator, StyleSheet} from "react-native";
import {ScreenHeight, ScreenWidth} from "../Styles";
import Constants from "expo-constants/src/Constants";

const LoadingScreen =()=>{
  return (
     <ImageBackground
         source={require('../assets/splash.png')}
         imageStyle={{resizeMode:'contain'}}
         style={{height:ScreenHeight,width:ScreenWidth}}
     >
         <View style={styles.container}>
             <ActivityIndicator
                color={'white'}
                size={"large"}
             />
         </View>
         <View style={styles.textContainer} >
             <Text style={{color:'white'}}>
                 App Version:{Constants.manifest.version}
             </Text>
         </View>


     </ImageBackground>
  )
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
    textContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:25
    }
})
export default LoadingScreen;