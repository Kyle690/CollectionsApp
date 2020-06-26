import React from "react";
import {Divider, Overlay, Text} from "react-native-elements";
import {View, StyleSheet, Button} from "react-native";
import {colors} from "../Styles/colors";

const AlertModal=({show,message, onClose})=>{
    return (
        <Overlay
            isVisible={show}
            onBackdropPress={onClose}
            width="70%"
            height="auto"
            overlayBackgroundColor={"rgba(255,255,255,0.8)"}
            overlayStyle={{borderRadius:25}}
        >
            <View style={styles.container}>
                <Text style={styles.title} h2>Alert!</Text>
                <Divider style={{backgroundColor:colors.lightGrey}}/>
                <Text style={styles.text}>{message}</Text>
                <Button color={colors.mainBackground} title={'Close'} onPress={onClose}/>
            </View>
        </Overlay>
    )
}

const styles=StyleSheet.create({
    divider:{
        backgroundColor:colors.mainBackground
    },
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:colors.mainBackground,
        marginBottom:25
    },
    text:{
        color:colors.mainBackground,
        marginBottom: 25
    },
    icon:{
        textAlign:'right'
    }
});
export default AlertModal;