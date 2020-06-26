import React,{useState} from "react";
import {SafeAreaView,Image, View, StyleSheet, TouchableOpacity}from 'react-native';
import {Input,Text}from 'react-native-elements'
import {connect}from 'react-redux';

import {BlueButton} from "../../Components/Buttons";
import AvoidView from "../../Components/AvoidVeiw";
import {RegisterUser} from "../../Store/Actions/AuthActions";
import Loading from "../../Components/Loading";
import {Validation} from "../../Functions";
import Switch from "../../Components/Switch";
import TermsModal from "../../Components/TermsModal";
import AlertModal from "../../Components/AlertModal";


const AuthRegisterScreen=({navigation, RegisterUser})=>{

    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const [terms, setTerms]=useState(false);
    const [modal,setModal]=useState(false);
    const [alertModal,setAlert]=useState(false);
    const [alertMsg,setAlertMsg]=useState(null);

    const handleRegistration=()=>{
        let error= Validation('register',{name,email,password})

        if(!error){
            if(!terms){
                setModal(true);
            }else{
                // no error can register user
                setLoading(true);
                RegisterUser({email,name, password},res=>{
                    setLoading(false);
                    if(res.status===1){navigation.navigate('HelpScreen')}else{
                        setAlertMsg(res.msg);
                        setAlert(true);
                    }


                })
            }

        }else{
            alert(error);
        }
    }

    const handleReview=()=>{
        setModal(false);
        navigation.navigate('Privacy',{path:'AuthRegister'})
    }

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Loading show={loading} message={'Registering...'}/>
            <AlertModal
                show={alertModal}
                onClose={()=>{
                    setAlert(false)
                    setAlertMsg(null)}}
                message={alertMsg}
            />
            <TermsModal
                onReview={handleReview}
                show={modal}
                onClose={()=>setModal(false)}
            />
            <AvoidView style={styles.centerView}>
                <Image source={require('../../assets/cartoonLogo.png')} style={[{height:100,width:100}, styles.imageStyle]}/>
                <Text style={styles.textStyle}>Please register below</Text>
                <Input
                    label={'Name'}
                    onChangeText={t=>setName(t)}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    value={name}
                />
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
                    autoCapitalize={'none'}
                    autoCompleteType={'email'}
                    value={password}
                    secureTextEntry
                />
                <Switch title={'Terms and Conditions'} checked={terms} onPress={()=>setTerms(!terms)} />
                <TouchableOpacity onPress={()=>navigation.navigate('AuthLogin')}>
                    <Text style={styles.textStyle}>Already signed up?</Text>
                </TouchableOpacity>

            </AvoidView>
            <BlueButton
                title={'Register'}
                width={'90%'}
                onPress={handleRegistration}
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
});

export default connect(null,{RegisterUser})(AuthRegisterScreen);