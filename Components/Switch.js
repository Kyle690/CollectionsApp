import React from 'react';
import {CheckBox} from "react-native-elements";
import {colors} from "../Styles/colors";


const Switch=({checked, onPress, title})=>{
    return (
        <CheckBox
            title={title}
            titleProps={{color:'white'}}
            containerStyle={{
                backgroundColor:colors.mainBackground,
                borderColor:colors.mainBackground,
                marginBottom:15
            }}
            checked={checked}
            onPress={onPress}
            uncheckedColor={'grey'}
            checkedColor={'white'}
        />
    )
}

export default Switch;