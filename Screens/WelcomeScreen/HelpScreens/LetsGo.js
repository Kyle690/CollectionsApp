import React from "react";
import {View, ImageBackground, Image} from "react-native";
import {Text} from "react-native-elements";
import {HelpStyles, ScreenWidth} from "../../../Styles"

const image = require('../../../assets/LetsGo.png');
const Logo=require('../../../assets/cartoonLogo.png');
const LetsGo=()=>{
    return (

        <ImageBackground source={image} style={HelpStyles.backgroundStyle} imageStyle={HelpStyles.ImageStyle}>
            <View style={{justifyContent:'center',alignItems:'center', marginTop:ScreenWidth/1.5}}>
                <Image
                    source={Logo}
                    style={{height:150,width:150, marginBottom:50}}
                />
                <Text h3 style={HelpStyles.textStyle}>Lets build your library</Text>
            </View>
        </ImageBackground>

    )
};


export default LetsGo;