import React,{useReducer} from "react";
import {SafeAreaView, StyleSheet, Image, View}from 'react-native';
import {Text, Input} from "react-native-elements";

import AvoidView from "../../Components/AvoidVeiw";
import Loading from "../../Components/Loading";
import {BlueButton} from "../../Components/Buttons";
import {Validation} from "../../Functions";
import {ResetPassword} from "../../Store/Actions/AuthActions";

const INITIAL_STATE={
    loading:false,
    email:'',
    message:null
}


const AuthResetPasswordScreen=({navigation})=>{

    const [state,dispatch]=useReducer(reducer, INITIAL_STATE)
    const {loading,email, message}=state;

    const handleReset=()=>{
        let err=Validation('',{email});
        if(!err){
            dispatch({type:'loading'})
            dispatch({type:'message',payload:null});
            ResetPassword(email,res=>{
                dispatch({type:'loading'});
                res.status===1?
                    dispatch({type:'message',payload:'Please check your email to reset!'}):
                    dispatch({type:'message',payload:res.msg})
            })
        }else{
            alert(err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loading show={loading} message={'Submitting...'}/>
            <AvoidView >
                <Image source={require('../../assets/cartoonLogo.png')} style={[{height:150,width:150}, styles.image]}/>
                <View>
                    <Text style={styles.title}>Forgot your password?</Text>
                    <Text style={styles.text}>It happens, no worries though simply enter your email below and we'll send you link to reset it.</Text>
                    <Text style={styles.text}>{message}</Text>
                    <Input
                        label={'Email'}
                        onChangeText={t=>dispatch({type:'email',payload:t})}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        value={email}
                        autoCapitalize={'none'}
                        autoCompleteType={'email'}
                        />
                        <Text onPress={()=>navigation.navigate('AuthLogin')} style={styles.text}>Login Rather?</Text>
                </View>
                <BlueButton
                    title={'Submit'}
                    width={'80%'}
                    onPress={handleReset}
                />
            </AvoidView>
        </SafeAreaView>
    )
}

const reducer=(state,action)=>{
    switch(action.type){
        case'loading':
            return {...state,loading:!state.loading}
        case 'email':
            return {...state,email:action.payload};
        case 'message':
            return {...state,message:action.payload};
        default:
            return {...state}
    }
};

const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:10,
      marginRight:10
    },
    title:{
        fontSize:30,
        color:'white',
        paddingBottom:15,
        alignSelf:'center'
    },
    text:{
      color:'white',
      fontSize:15,
      textAlign:'center',
      paddingBottom:15
    },
    image:{
        alignSelf:'center',
        marginBottom:25
    },
    inputContainer:{
        padding:10,
        marginBottom:10
    },
    inputStyle:{
        color:'white'
    },
})

export default AuthResetPasswordScreen;