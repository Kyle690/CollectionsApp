import React from 'react';
import {Overlay,Text} from "react-native-elements";
import {View, StyleSheet} from "react-native";
import {OutlineDarkButton} from "./Buttons";
import {colors} from "../Styles/colors";

const TermsModal=({show,onClose, onReview})=>{
    return (
        <Overlay
            isVisible={show}
            onBackdropPress={onClose}
            width="auto"
            height="auto"
            overlayBackgroundColor={"rgba(255,255,255,0.8)"}
            overlayStyle={{borderRadius:25}}
        >
            <View style={styles.container}>
                <Text style={styles.title} h3>Alert!</Text>
                <Text style={styles.subTitle} >To Register, you need to agree to the terms and conditions.</Text>
                <Text style={styles.text} onPress={onReview}>Click here to view our terms.</Text>
                <OutlineDarkButton
                    title={'Close'}
                    onPress={onClose}
                    width={'70%'}
                />
            </View>
        </Overlay>
    )
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:colors.mainBackground,
        marginBottom:25
    },
    subTitle:{
        fontSize:15,
        color:colors.mainBackground,
        marginBottom: 25,
        textAlign:'center'
    },
    text:{
        color:colors.mainBackground,
        marginBottom:30
    }
})

export default TermsModal