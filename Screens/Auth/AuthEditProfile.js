import React,{useReducer, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Divider, Input, Text, Button} from 'react-native-elements';
import {connect}from 'react-redux';


import AvoidView from "../../Components/AvoidVeiw";
import Loading from "../../Components/Loading";
import {BlueButton} from "../../Components/Buttons";
import {colors} from "../../Styles/colors";
import ConfirmModal from "../../Components/ConfirmModal";
import {LogUserOut, UpdateUser} from "../../Store/Actions/AuthActions";
import {Validation} from "../../Functions";
import AlertModal from "../../Components/AlertModal";

const INITIAL_STATE={
    email:'',
    name:'',
    loading:false,
    modal:false,
    alertModal:false,
    alertMsg:null
}


const AuthEditProfile=({navigation, savedName,savedEmail, LogUserOut, UpdateUser})=>{

    const [state,dispatch]=useReducer(reducer,INITIAL_STATE);
    const {email,name,loading, modal, alertMsg,alertModal}=state;

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <Button
                    type={'clear'}
                    title={'Sign Out'}
                    titleStyle={{color:'#fff'}}
                    onPress={()=>dispatch({type:'modal'})}/>
            )
        })
    })

    useEffect(()=>{
        let sub=true;
        if(sub){
            dispatch({type:'email',payload:savedEmail});
            dispatch({type:'name',payload:savedName});
        }
        return ()=>sub=false;
    },[]);

    const handleSignOut=()=>{
        LogUserOut(res=>{
            if(res.status===1){
                dispatch({type:'modal'});
                navigation.navigate('WelcomeScreen')
            }else{
                alert(res.msg)
            }
        })
    }

    const handleUpdateUser=()=>{
        let err=Validation({email,name});
        if(!err){
            dispatch({type:'loading'});
            UpdateUser({email,name},res=>{
                dispatch({type:'loading'});
                res.status===1?
                    dispatch({type:'setAlert',payload:'Profile has been updated successfully'}):
                    dispatch({type:'setAlert',payload:res.msg})
            })
        }else{
            alert(err);
        }


    }

    return (
        <SafeAreaView>
            <AlertModal
                show={alertModal}
                onClose={()=>{dispatch({type:'clearAlert'})}}
                message={alertMsg}
            />
            <ConfirmModal
                show={modal}
                onClose={()=>dispatch({type:'modal'})}
                onSaveText={'Sign out'}
                title={'Confirm Sign Out'}
                text={'Please confirm you want to sign out of the app, note this will remove your local library. To access your library sign in again or sign in online. Ensure you have backed up your library before you complete this action!'}
                onSave={handleSignOut}
            />
            <Loading show={loading}/>
            <AvoidView>
                <View style={styles.container}>
                    <Text style={styles.title} h4>Edit your profile below</Text>
                    <Input
                        label={'Email'}
                        onChangeText={t=>dispatch({type:'email',payload:t})}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        value={email}
                        autoCapitalize={'none'}
                        autoCompleteType={'email'}
                    />
                    <Input
                        label={'Name'}
                        onChangeText={t=>dispatch({type:'name',payload:t})}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        value={name}
                        autoCapitalize={'none'}
                    />
                    <BlueButton
                        title={'Update'}
                        width={'80%'}
                        onPress={handleUpdateUser}
                    />
                </View>
                <Divider style={{backgroundColor:colors.lightGrey}}/>
            </AvoidView>
        </SafeAreaView>
    )
}

const reducer=(state,action)=>{
    switch(action.type){
        case 'clearAlert':
            return {...state,alertModal: false,alertMsg:null};
        case 'setAlert':
            return {...state,alertModal:true,alertMsg:action.payload}
        case 'modal':
            return {...state,modal:!state.modal};
        case 'name':
            return {...state,name:action.payload};
        case 'email':
            return {...state,email:action.payload};
        case 'loading':
            return {...state,loading:!state.loading};
        default:
            return {...state};
    }
}

const styles=StyleSheet.create({
    container:{
        marginTop:35,
        marginLeft:10,
        marginRight:10,
        marginBottom:15
    },
    title:{
        color:'white',
        alignSelf:'center'
    },
    inputContainer:{
        padding:10
    },
    inputStyle:{
        color:'white'
    },
})

const mapStateToProps=state=>{

   const {email,name}=state.Auth;
   return {savedEmail:email,savedName:name};
}
export default connect(mapStateToProps, {LogUserOut, UpdateUser})(AuthEditProfile);