import React,{useEffect, useState, useLayoutEffect} from "react";
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Divider, ListItem, Text, Button} from 'react-native-elements';
import {connect}from 'react-redux';
import Constants from 'expo-constants';

import {checkLogin} from "../../Store/Actions/AuthActions";
import Loading from "../../Components/Loading";
import {BlueButton, OutlineButton, PrimaryButton} from "../../Components/Buttons";
import {colors} from "../../Styles/colors";
import {FormatDate, ListStats} from "../../Functions";
import {BackUpData, CheckInternet, DeleteLibrary, ImportData, OpenHelp} from "../../Store/Actions/SettingsActions";
import ConfirmModal from "../../Components/ConfirmModal";
import AlertModal from "../../Components/AlertModal";


const AuthProfile=(props)=>{
    const {OpenHelp,DeleteLibrary,ImportData,navigation,loggedIn,name,lastBackUp,checkLogin, movies,series,BackUpData}=props;

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft:()=>(
                <Button
                    type={'clear'}
                    titleStyle={{color:'#fff'}}
                    title={'Help'}
                    onPress={()=>OpenHelp(()=>navigation.navigate('HelpScreen'))}/>
            )
        })
    })


    const [loading,setLoading]=useState(false);
    const [moviesData,setMovies]=useState(null);
    const [seriesData,setSeries]=useState(null);
    const [network, setNetwork]=useState(false);
    const [modal,setModal]=useState(false);
    const [alertModal,setAlert]=useState(false);
    const [alertMsg,setAlertMsg]=useState(null);
    const connected =async ()=>await CheckInternet();

    useEffect(()=>{
        let sub = true;
        connected().then(res=>setNetwork(res));
        if(!loggedIn && sub && network){
            setNetwork(true);
            setLoading(true);
            checkLogin(res=>{
                if(res.status!==1){
                    // user is not logged in
                    navigation.push('authLogin');
                }else{
                    // user is logged in
                    setLoading(false);
                }
            });
        }
        return ()=>sub=false;
    },[]);

    const checkTotal=(field)=>{
        let num=0;
        if(seriesData){
            num+=parseFloat(seriesData[field])
        }

        if(moviesData){
            num+=parseFloat(moviesData[field])
        }
        return num.toString();
    }

    useEffect(()=>{
        return navigation.addListener('focus',()=>{
            if(movies){
                setMovies(ListStats(movies));
            }

            if(series){
                setSeries(ListStats(series));
            }
        })


    },[navigation,movies,series]);

    const HandleBackUp=()=>{

        if(network){
            setLoading(true);
            BackUpData(res=>{
                setLoading(false);
                if(res.status===1){
                    setAlert(true);
                    setAlertMsg('Back up successful!');
                }else{
                    setAlert(true);
                    setAlertMsg(res.msg);
                }
            })
        }else{
            alert('Oops.. it appears you are not connected to the internet, please check your settings ')
        }

    }

    const HandleImport=()=>{
        if(network){
            setLoading(true);
            ImportData(res=>{
                setLoading(false);
                if(res.status===1){
                    setAlert(true);
                    setAlertMsg('Import successful!');
                }else{
                    setAlert(true);
                    setAlertMsg(res.msg);
                }
            })
        }else{
            alert('Oops.. it appears you are not connected to the internet, please check your settings ')

        }
    }

    const HandleDeleteLibrary=()=>{
        if(network){
            setModal(false);
            setLoading(true);
            DeleteLibrary(res=>{
                setLoading(false);
                if(res.status===1){
                    setAlert(true);
                    setAlertMsg('Library deleted!');
                }else{
                    setAlert(true);
                    setAlertMsg(res.msg);
                }
            })
        }else{
            alert('Internal error, this cannot be completed at this time.')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <AlertModal
                show={alertModal}
                onClose={()=>{
                    setAlert(false)
                    setAlertMsg(null)}}
                message={alertMsg}
            />
            <ConfirmModal
                show={modal}
                onClose={()=>setModal(false)}
                onSave={HandleDeleteLibrary}
                onSaveText={'Delete'}
                title={'Confirm Library Delete'}
                text={'Please confirm that you want to delete your library and any backups from the system. Note this cannot be undone and data cannot be recovered! We recommend removing titles individually.'}
            />
            <Loading show={loading}/>
            <ScrollView style={styles.view}>
                <View style={{marginBottom:15, marginTop:10}}>
                    <Text style={styles.title} h3>Welcome back {name}</Text>
                    <Text style={{color:'white',alignSelf:'center',fontSize:10}}>App Version:{Constants.manifest.version}</Text>
                </View>
                <View style={styles.headerView}>
                    <Text style={[styles.text,{fontSize:20}]}>Your last back up was: {lastBackUp?FormatDate(lastBackUp):' No last backup'} </Text>
                    <Text style={[styles.text,{marginBottom:15}]}>To ensure no data loss of your collection, please back up regularly</Text>
                    <BlueButton
                        title={'Backup Now'}
                        width={'40%'}
                        onPress={HandleBackUp}
                    />
                </View>
                <Divider style={{backgroundColor:colors.lightGrey}}/>
                <View>
                    <ListItem
                        title={'Total collection'}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitle={checkTotal('total')}
                        rightTitleStyle={styles.text}
                    />
                    <ListItem
                        title={"Total No of DVDs"}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitle={checkTotal('dvd')}
                        rightTitleStyle={styles.text}
                    />
                    <ListItem
                        title={"Total No of BlueRays"}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitle={checkTotal('blueRay')}
                        rightTitleStyle={styles.text}
                    />
                    <ListItem
                        title={"Total Runtime"}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitle={checkTotal('runtimeTotal')+' hrs'}
                        rightTitleStyle={styles.text}
                    />
                    <ListItem
                        title={'Total Movies'}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitle={moviesData?moviesData.total.toString():'0'}
                        rightTitleStyle={styles.text}
                    />
                    <ListItem
                        title={'Movies BlueRay'}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitleStyle={styles.text}
                        rightTitle={moviesData?moviesData.blueRay.toString():'0'}
                    />
                    <ListItem
                        title={'Movies Runtime'}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitleStyle={styles.text}
                        rightTitle={moviesData?moviesData.runtimeTotal.toString():'0'}
                    />
                    <ListItem
                        title={'Total Series'}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitleStyle={styles.text}
                        rightTitle={seriesData?seriesData.total.toString():'0'}
                    />
                    <ListItem
                        title={'Series BlueRay'}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitleStyle={styles.text}
                        rightTitle={seriesData?seriesData.blueRay.toString():'0'}
                    />
                    <ListItem
                        title={'Series Runtime'}
                        titleStyle={styles.text}
                        containerStyle={styles.listItemStyle}
                        rightTitleStyle={styles.text}
                        rightTitle={seriesData?seriesData.runtimeTotal.toString():'0'}
                    />

                </View>
                <Divider style={{backgroundColor:colors.lightGrey}}/>
                <View style={styles.headerView}>
                    <Text h4 style={styles.title}>Import your backup.</Text>
                    <Text style={[styles.text,{paddingBottom:15}]}>If you have already backed up your data, and need to import your back up click below.</Text>
                    <PrimaryButton
                        title={'Import Data'}
                        width={'45%'}
                        onPress={HandleImport}
                    />
                </View>
                <Divider style={{backgroundColor:colors.lightGrey}}/>
                <View style={styles.headerView}>
                    <Text style={styles.title} h4>Delete Library</Text>
                    <Text style={{color:'white'}}>Tired of your collection, or too many old movies? Delete your entire library and start again, however this cannot be undone!</Text>
                    <OutlineButton
                        title={'Delete My Library'}
                        width={'70%'}
                        onPress={()=>setModal(true)}
                    />
                </View>
                <Divider style={{backgroundColor:colors.lightGrey}}/>
                <View style={styles.headerView}>
                    <Text style={styles.title} h4>Terms and Conditions</Text>
                    <Text style={[styles.text,{textAlign:'center'}]}>Review our terms and conditions</Text>
                    <OutlineButton
                        title={'Review'}
                        width={'70%'}
                        onPress={()=>navigation.navigate('Privacy',{path:'App'})}
                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        height:'90%',
        marginBottom:25
    },
    title:{
        color:'white',
        alignSelf:'center',
        marginBottom:10,
        marginTop:10
    },
    headerView:{
      marginBottom:25
    },
    view:{
      marginLeft:5,
      marginRight:5
    },
    text:{
        color:'white'
    },
    TitleStyle:{
        color:colors.white,
        paddingLeft:20
    },
    listItemStyle:{
        backgroundColor:colors.mainBackground
    },
    sideView:{
        flex:1,
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center'
    }
})

const mapStateToProps=(state)=>{
   if(state.Auth){
       return {
           ...state.Auth,
           movies:state.MovieCol.movies,
           series:state.SeriesCol.series
       };
   }
    return {};
}

export default connect(mapStateToProps,{checkLogin, BackUpData, ImportData, DeleteLibrary, OpenHelp})(AuthProfile);