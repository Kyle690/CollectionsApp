import {Dimensions, StyleSheet}from 'react-native';
import {colors} from "./colors";
import Constants from "expo-constants/src/Constants";
const SCREEN_WIDTH= Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const ScreenWidth=SCREEN_WIDTH;
export const ScreenHeight=SCREEN_HEIGHT;

export const MovieCardStyles=StyleSheet.create({
    containerStyle:{
        marginLeft:'2%',
        marginRight:"2%",
        marginBottom:'15%'
    },
    Image:{
        height:100,
        width:100,
        resizeMode:'center'
    },
    TitleStyle:{
        color:colors.white
    },
    TextStyle:{
        color:colors.lightGrey
    },
    CenterView:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        paddingTop:25,
        paddingBottom:25,

    },
    ButtonView:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-around",
        alignItems:'center',
        paddingTop:25,
        paddingBottom:25
    },
    DividerStyle:{
        backgroundColor:colors.grey
    },
    paddingStyle:{
        paddingTop:25,
        paddingBottom:25
    },
    centerView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export const HelpStyles=StyleSheet.create({
    backgroundStyle:{
        marginTop:Constants.statusBarHeight*2,
        height:ScreenHeight,
        width:ScreenWidth,
    },
    textStyle:{
        color:colors.white,
        alignSelf:'center',
        textAlign:'center'
    },
    ViewStyle:{
        marginTop:ScreenHeight*0.6,
        padding:15
    },
    ImageStyle:{
       resizeMode: 'contain'
    },
    IconViewStyle:{
        flexDirection:'row',
        justifyContent:'center'
    }
});

