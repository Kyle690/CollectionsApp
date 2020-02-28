import React from "react";
import {View} from "react-native";
import {Overlay, Text} from "react-native-elements";
import {DarkButton, OutlineDarkButton, PrimaryButton} from "./Buttons";

const ConfirmModal=({show, onClose, onSave, text, title, onSaveText})=>{
    return (
        <Overlay
            isVisible={show}
            onBackdropPress={onClose}
            width="auto"
            height="auto"
            overlayBackgroundColor={"rgba(255,255,255,0.8)"}

        >
            <View style={Styles.containerView}>
                <Text h3 style={Styles.titleStyle}>{title}</Text>
                <Text style={Styles.textStyle}>{text}</Text>
                <View style={Styles.buttonView}>
                    <OutlineDarkButton
                        title={'Cancel'}
                        width={'70%'}
                        onPress={onClose}
                    />
                    <DarkButton
                        title={onSaveText!==undefined?onSaveText:'Confirm'}
                        width={'70%'}
                        onPress={onSave}
                    />

                </View>
            </View>
        </Overlay>
    )
};

const Styles ={
  buttonView:{
      flexDirection:'row',
      justifyContent:"space-around",
      alignItems:'center',
      paddingTop:'1%',
      paddingBottom:'2%'
  },
    containerView:{
      justifyContent: 'center',
      alignItems:'center'
    },
    titleStyle:{
      paddingBottom: '1%'
    },
    textStyle:{
      paddingTop: '2%',
        paddingBottom:'2%'
    }
};

export default ConfirmModal;