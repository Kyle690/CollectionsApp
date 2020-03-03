import React from "react";
import {View, StyleSheet, SafeAreaView, StatusBar} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {BlueButton} from "../../Components/Buttons";
import AddMovie from "./HelpScreens/AddMovie";
import {colors} from "../../Styles/colors";
import {HelpStyles} from "../../Styles";
import SearchMovie from "./HelpScreens/SearchMovie";
import OpenMovie from "./HelpScreens/OpenMovie";
import ViewMovie from "./HelpScreens/ViewMovie";
import LetsGo from "./HelpScreens/LetsGo";
import FocusComponent from "../../Components/FocusComponent";
import {connect}from 'react-redux';
import {updateStart} from "../../Store/Actions/SettingsActions";


class helpScreen extends React.Component{

    state={
        index:1
    };
    handleNext=()=>{
        const {index}=this.state;
        if(index<5){
            this.setState({index:this.state.index+=1})
        }else{
            this.setState({index:6});
            this.props.updateStart(()=>{
                this.props.navigation.navigate('App');
            });
        }

    };

    _onFocusUpdate=index=>{
        if(index===6){
            this.setState({index:1});
        }

    };


    render(){
        const {index}=this.state;
        return (
            <SafeAreaView style={Styles.containerStyle}>
                <StatusBar hidden={true}/>
                <FocusComponent
                    state={this.state.index}
                    onUpdate={this._onFocusUpdate}
                />
                <View style={Styles.viewStyle}>
                    {index===1?
                        <AddMovie/>:
                        index===2?
                          <SearchMovie/>:
                            index===3?
                          <OpenMovie/>:
                                index===4?
                          <ViewMovie/>:
                                    <LetsGo/>

                    }
                </View>
                <View style={HelpStyles.IconViewStyle}>
                    <Icon
                        name={'circle'}
                        color={colors.lightGrey}
                    />
                    <Icon
                        name={index<2?'circle-outline':'circle'}
                        color={colors.lightGrey}
                    />
                    <Icon
                        name={index<3?'circle-outline':'circle'}
                        color={colors.lightGrey}
                    />
                    <Icon
                        name={index<4?'circle-outline':'circle'}
                        color={colors.lightGrey}
                    />
                    <Icon
                        name={index<5?'circle-outline':'circle'}
                        color={colors.lightGrey}
                    />
                </View>
                <BlueButton
                    width={'80%'}
                    title={index<5?'Next':'Go'}
                    onPress={()=>this.handleNext()}
                />
            </SafeAreaView>
        )
    }
}
const Styles=StyleSheet.create({
   containerStyle:{
       flex:1,
       height:'90%',
       marginBottom:50
   },
    viewStyle:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:50
    }
});

export default connect(null, {updateStart})(helpScreen);