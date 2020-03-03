import React from "react";
import {View, Text, ScrollView, StatusBar, Platform} from "react-native";
import {checkNetwork} from "../../Functions";
import {MovieCard} from "../../Components/MovieCard";
import {colors} from "../../Styles/colors";
import {SearchBar} from "react-native-elements";
import {connect}from 'react-redux';
import {SearchTitle} from "../../Store/Actions/SearchActions";
import {AddSeries} from "../../Store/Actions/SeriesActions";

class AddSeriesScreen extends React.Component{

    state={
        search:'',
        loading:false,
        content:null,
        error:null,
        type:"DVD",
        network:true
    };

    componentDidMount() {
        this.setState({network:checkNetwork()})
    }
    updateSearch=(text)=>{
        this.setState({search:text})
    };

    handleSearch=()=>{
        const search = this.state.search;
        if(search!==''){
            this.setState({loading:true});
            this.props.SearchTitle(search,'series',res=>{
                res.status===1?
                    this.setState({loading:false,content:res.data, error:null})
                    :this.setState({loading:false,content:null,error:res.msg})
            })
        }
    };

    handleTypeChange=(type)=>{
        this.setState({type:type})
    };
    handleSave=()=>{
        const {content, type}=this.state;
        content['type']=type;

        this.props.AddSeries(content,res=>{
            if(res.status===1){
                alert('Series saved');
                this.props.navigation.navigate('Series')
            }else{
                alert(res.msg);
            }



        });


    };

    renderSearch=()=>{
        const {content,type, error} = this.state;
        if(content !== null){
            return (
                <ScrollView style={{marginBottom:60}}>
                    <MovieCard
                        data={content}
                        type={type}
                        typeChange={this.handleTypeChange}
                        onSave={this.handleSave}
                    />
                </ScrollView>
            )
        }else if(error!==null){
            return (
                <View>
                    <Text style={{alignSelf:'center', color:colors.lightGrey}}>{error}</Text>
                </View>
            )
        }

    };


    render(){
        const {search,loading, network}=this.state;
        return (
            <View>
                <StatusBar barStyle={'light-content'}/>
                {
                    network?
                        <View>
                            <SearchBar
                                placeholder="Type series title here..."
                                onChangeText={this.updateSearch}
                                value={search}
                                showLoading={loading}
                                onClear={()=>this.setState({search:'', content: null, error:null})}
                                platform={Platform.OS==='darwin'?'ios':"default"}
                                inputStyle={{color:colors.mainBackground}}
                                inputContainerStyle={{borderRadius:50, backgroundColor:colors.lightGrey}}
                                containerStyle={{backgroundColor:colors.mainBackground, borderBottomColor: 'transparent'}}
                                onSubmitEditing={()=>this.handleSearch()}
                                returnKeyType="search"
                            />
                            {this.renderSearch()}
                        </View>:
                        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                            <Text h1>Oops...</Text>
                            <Text>Please check your internet connection!</Text>
                        </View>
                }
            </View>
        )
    }
}


export default connect(null,{AddSeries, SearchTitle})(AddSeriesScreen);