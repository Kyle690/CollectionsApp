import React from "react";
import {View, Image, StyleSheet} from "react-native";
import {Button, Text} from "react-native-elements";
import {connect}from 'react-redux';

import {BlueButton} from "../../Components/Buttons";
import {colors} from "../../Styles/colors";

const WelcomeScreen=({navigation, hasLoaded})=>{



    return (
        <View style={Styles.containerStyle}>
            <View style={Styles.viewStyle}>
               <Image
                    source={require('../../assets/cartoonLogo.png')}
                    style={{height:150,width:150}}
               />
               <Text h3 style={Styles.titleStyle}>
                   Welcome to Collections
               </Text>
                <Text  style={Styles.textStyle}>
                    A modern way to catalog your DVD's and BluRay Movies and Series
                </Text>
            </View>
            <BlueButton
                title={'Get Started'}
                width={'80%'}
                onPress={()=>navigation.navigate('HelpScreen')}
            />
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
       flex: 1, alignItems: 'center', justifyContent: 'center'
   },
    titleStyle:{
       color:colors.white
    },
    textStyle:{
       padding:25,
       textAlign:'center',
       color:colors.lightGrey
    }
});

const mapStateToProps=(state)=>{
  return {hasLoaded: state.Settings}
};

export default connect(mapStateToProps)(WelcomeScreen);