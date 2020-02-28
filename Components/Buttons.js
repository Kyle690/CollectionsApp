import React from "react";
import {Button} from "react-native-elements";
import {colors} from "../Styles/colors";
import {ScreenWidth} from "../Styles";

export const PrimaryButton=({width,title,onPress})=>{

    return (
        <Button
            title={title}
            titleStyle={{color:colors.mainBackground}}
            onPress={onPress}
            buttonStyle={{
                backgroundColor:colors.lightGrey,
                width:width!==undefined?width:'100%',
                borderRadius:50,
                alignSelf:'center'
            }}
            containerStyle={{
                padding:ScreenWidth*0.02
            }}
        />
    )

};
export const DarkButton=({width,title,onPress})=>{

    return (
        <Button
            title={title}
            titleStyle={{color:colors.white}}
            onPress={onPress}
            buttonStyle={{
                backgroundColor:colors.mainBackground,
                width:width!==undefined?width:'100%',
                borderRadius:50,
                alignSelf:'center'
            }}
            containerStyle={{
                padding:ScreenWidth*0.02
            }}
        />
    )

};
export const OutlineButton=({width,title,onPress})=>{
    return (
        <Button
            title={title}
            titleStyle={{color:colors.lightGrey}}
            type={'outline'}
            onPress={onPress}
            buttonStyle={{
                borderColor:colors.lightGrey,
                width:width!==undefined?width:'100%',
                borderRadius:50,
                alignSelf:'center'
            }}
            containerStyle={{
                padding:ScreenWidth*0.02
            }}
        />
    )
}
export const OutlineDarkButton =({width,title,onPress})=>{
    return (
        <Button
            title={title}
            titleStyle={{color:colors.mainBackground}}
            type={'outline'}
            onPress={onPress}
            buttonStyle={{
                borderColor:colors.mainBackground,
                width:width!==undefined?width:'100%',
                borderRadius:50,
                alignSelf:'center'
            }}
            containerStyle={{
                padding:ScreenWidth*0.02
            }}
        />
    )
};
export const BlueButton=({width,title,onPress})=>{
  return (
      <Button
          title={title}
          titleStyle={{color:colors.mainBackground}}
          onPress={onPress}
          buttonStyle={{
              backgroundColor:colors.blue,
              width:width!==undefined?width:'100%',
              borderRadius:50,
              alignSelf:'center'
          }}
          containerStyle={{
              padding:ScreenWidth*0.02
          }}
      />
  )
};
