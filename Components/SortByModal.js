import React from "react";
import {View} from "react-native";
import {Overlay, CheckBox} from "react-native-elements";
import {OutlineButton, OutlineDarkButton, PrimaryButton} from "./Buttons";
import {ScreenWidth} from "../Styles";


const SortByModal=({checkedItem, onCheck, show, onClose, onClear})=>{

    const checklist=['Title A-Z','Title Z-A', 'Year (highest to lowest)','Year (lowest to highest)','Rating (highest to lowest)','Rating (lowest to highest)'];

    return (
        <Overlay
            isVisible={show}
            onBackdropPress={onClose}
            width={ScreenWidth*0.9}
            height="auto"
        >
            <View>
            {checklist.map(check=>(
                <CheckBox
                    key={check}
                    checked={checkedItem===check}
                    title={check}
                    onPress={()=>onCheck(check)}
                />
            ))}
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <OutlineDarkButton
                    title={'Clear'}
                    width={'80%'}
                    onPress={onClear}
                />
                <PrimaryButton
                    title={'Done'}
                    width={'80%'}
                    onPress={onClose}
                />

            </View>
            </View>
        </Overlay>
    )



};

export default SortByModal;