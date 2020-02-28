import React from "react";
import {View, ImageBackground} from "react-native";
import {Text} from "react-native-elements";
import {HelpStyles} from "../../../Styles"

const image = require('../../../assets/OpenMovie.png');
const OpenMovie=()=>{
    return (

        <ImageBackground source={image} style={HelpStyles.backgroundStyle} imageStyle={HelpStyles.ImageStyle}>
            <View style={HelpStyles.ViewStyle}>
                <Text h4 style={HelpStyles.textStyle}>Simply click on a movie or series you’ve added to your library</Text>
            </View>
        </ImageBackground>

    )
};


export default OpenMovie;