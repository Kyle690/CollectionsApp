import React from "react";
import {Image, View, StyleSheet, ImageBackground} from "react-native";
import {Text} from "react-native-elements";
import {HelpStyles} from "../../../Styles"

const image = require('../../../assets/AddMovie.png');
const AddMovie=()=>{
  return (

      <ImageBackground source={image} style={HelpStyles.backgroundStyle} imageStyle={HelpStyles.ImageStyle}>
            <View style={HelpStyles.ViewStyle}>
                <Text h4 style={HelpStyles.textStyle}>To add a movie or series to your library click add</Text>
            </View>
      </ImageBackground>

  )
};


export default AddMovie;