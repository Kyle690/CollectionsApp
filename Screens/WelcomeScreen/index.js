import React from "react";
import {View, Image, StyleSheet} from "react-native";
import {Button, Text} from "react-native-elements";
import {connect}from 'react-redux';
import Constants from "expo-constants/src/Constants";

import {BlueButton} from "../../Components/Buttons";
import {colors} from "../../Styles/colors";

const WelcomeScreen=({navigation, hasLoaded})=>{

    hasLoaded.hasLoaded? navigation.navigate('App'):null;
    return (
        <View style={Styles.containerStyle}>
            <View style={Styles.viewStyle}>
               <Image
                    source={require('../../assets/cartoonLogo.png')}
                    style={{height:150,width:150}}
               />

               <Text style={Styles.titleStyle}>
                   Welcome to Movie Catalog
               </Text>
                <Text  style={Styles.textStyle}>
                    A modern way to catalog your DVD's and Bluray Movies and Series
                </Text>

            </View>
            <BlueButton
                title={'Get Started'}
                width={'80%'}
                onPress={()=>navigation.navigate('AuthLogin')}
            />
            <Text style={Styles.versionText}>
                Version: {Constants.manifest.version}
            </Text>
        </View>
    )

};
const Styles=StyleSheet.create({
   containerStyle:{
       flex:1,
       height:'90%',
       marginBottom:50
   },
   viewStyle:{
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center',
       paddingLeft:3,
       paddingRight:3
   },
    titleStyle:{
       fontSize:30,
       color:colors.white
    },
    textStyle:{
       padding:25,
       textAlign:'center',
       color:colors.lightGrey
    },
    versionText:{
       paddingTop:10,
       color:'white',
       alignSelf:'center'
    }
});

const mapStateToProps=(state)=>{
    //console.log(state.settings);
  return {hasLoaded: state.Settings}
};

export default connect(mapStateToProps)(WelcomeScreen);