import React from "react";
import {Image, View, StyleSheet, ImageBackground} from "react-native";
import {Text} from "react-native-elements";
import {HelpStyles} from "../../../Styles"

const image = require('../../../assets/SearchMovie.png');
const SearchMovie=()=>{
    return (

        <ImageBackground source={image} style={HelpStyles.backgroundStyle} imageStyle={HelpStyles.ImageStyle}>
            <View style={HelpStyles.ViewStyle}>
                <Text h4 style={HelpStyles.textStyle}>Search the movie or series title, then hit save to add the title to your library</Text>
            </View>
        </ImageBackground>

    )
};


export default SearchMovie;