import React, {useState} from "react";
import {View,StyleSheet, SafeAreaView, Image, StatusBar, TouchableOpacity} from 'react-native';
import {Input, Text} from "react-native-elements";
import {connect}from'react-redux';


import {BlueButton} from "../../Components/Buttons";
import Loading from "../../Components/Loading";
import {logUserIn} from "../../Store/Actions/AuthActions";
import AvoidView from "../../Components/AvoidVeiw";
import {Validation} from "../../Functions";
import AlertModal from "../../Components/AlertModal";


const AuthLoginScreen=({navigation, logUserIn})=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const [alertModal,setAlert]=useState(false);
    const [alertMsg,setAlertMsg]=useState(null);

    const onSubmit=()=>{
        const error = Validation('login',{email,password});
        if(!error){
            setLoading(true);
            logUserIn({email,password},res=>{
                setLoading(false);
                if(res.status===1){
                    navigation.navigate('HelpScreen')
                }else{
                    setAlert(true);
                    setAlertMsg(res.msg);
                }
            });
        }else{
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Loading
                show={loading}
                message={'Logging in...'}
            />
            <AlertModal
                show={alertModal}
                onClose={()=>{
                    setAlert(false)
                    setAlertMsg(null)}}
                message={alertMsg}
            />
            <AvoidView style={styles.centerView}>
                <View >
                    <Image  source={require('../../assets/cartoonLogo.png')} style={[{height:150,width:150},styles.imageStyle]}/>
                    <Text style={[styles.title,{fontSize:20, paddingTop:25,paddingBottom:25}]}>Please login with your details below</Text>
                    <Input
                        label={'Email'}
                        onChangeText={t=>setEmail(t)}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        value={email}
                        autoCapitalize={'none'}
                        autoCompleteType={'email'}
                    />
                    <Input
                        label={'Password'}
                        onChangeText={t=>setPassword(t)}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        value={password}
                        secureTextEntry
                    />
                    <Text style={{color:'white', marginBottom:20}} onPress={()=>navigation.navigate('AuthReset')}>Forgot Password?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('AuthRegister')}>
                        <Text style={styles.textStyle}>Don't have an account?</Text>
                    </TouchableOpacity>
                </View>
            </AvoidView>

            <BlueButton
                title={'Login'}
                onPress={onSubmit}
            />
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    containerStyle:{
        flex:1,
        height:'90%',
        marginBottom:50
    },
    title:{
      color:'white',
      alignSelf:'center',
      marginBottom:10,
      marginTop:10
    },
    imageStyle:{
      alignSelf:'center'
    },
    centerView:{
        flex: 1,
        justifyContent:'center',
        marginLeft:10,
        marginRight:10
    },
    inputContainer:{
        padding:10
    },
    inputStyle:{
        color:'white'
    },
    textStyle:{
        alignSelf:'center',
        color:'white',
        paddingBottom:10
    }

})

export default connect(null, {logUserIn})(AuthLoginScreen);