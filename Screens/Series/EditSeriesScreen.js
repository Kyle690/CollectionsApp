import React from "react";
import {View, Text, Button, ScrollView} from "react-native";
import ConfirmModal from "../../Components/ConfirmModal";
import {MovieCard} from "../../Components/MovieCard";
import {connect}from 'react-redux';
import {DeleteSeries,UpdateSeries} from "../../Store/Actions/SeriesActions";

class EditSeriesScreen extends React.Component{
    state={
        type:'DVD',
        confirmModal:false
    };

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight:()=>(<Button
                title={'Delete'}
                color={"#fff"}
                onPress={()=>this.setState({confirmModal:true})}
            />)});
        this.setState({type:this.props.route.params.data.type})
    }

    handleTypeChange=(type)=>{
        this.setState({type:type})
    };

    handleDelete=()=>{
        const id = this.props.route.params.data.id;
        this.props.DeleteSeries(id,res=>{
            if(res.status===1){
                this.setState({confirmModal:false});
                this.props.navigation.popToTop();
            }
        })
    };

    handleSave=()=>{
        const content = this.props.route.params.data;
        const id = content.id;
        delete content.type;
        content['type']=this.state.type;
        this.props.UpdateSeries(id,content,res=>{
            if(res.status===1){
                this.props.navigation.popToTop();
            }
        })
    };

    render(){
        const {type, confirmModal}=this.state;
        return (
            <ScrollView>
                <ConfirmModal
                    show={confirmModal}
                    onClose={()=>this.setState({confirmModal: false})}
                    text={'Are you sure you want to delete this movie?'}
                    title={'Delete Movie'}
                    onSaveText={'Delete'}
                    onSave={()=>this.handleDelete()}
                />
                <MovieCard
                    data={this.props.route.params.data}
                    type={type}
                    typeChange={this.handleTypeChange}
                    onSave={this.handleSave}
                />
            </ScrollView>
        )
    }
}
export default connect(null, {DeleteSeries,UpdateSeries})(EditSeriesScreen);