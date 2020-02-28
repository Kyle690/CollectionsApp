import React from "react";
import {View, ImageBackground} from "react-native";
import {Text} from "react-native-elements";
import {HelpStyles} from "../../../Styles"

const image = require('../../../assets/ViewMovie.png');
const ViewMovie=()=>{
    return (

        <ImageBackground source={image} style={HelpStyles.backgroundStyle} imageStyle={HelpStyles.ImageStyle}>
            <View style={HelpStyles.ViewStyle}>
                <Text h4 style={HelpStyles.textStyle}>Edit or delete the movie or series from your library by clicking edit</Text>
            </View>
        </ImageBackground>

    )
};


export default ViewMovie;