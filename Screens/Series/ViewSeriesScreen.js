import React from "react";
import {ScrollView} from "react-native";
import {connect}from 'react-redux';
import {ViewMovieCard} from "../../Components/MovieCard";



class ViewSeriesScreen extends React.Component{
    render(){
        return (
            <ScrollView>
                <ViewMovieCard
                    data={this.props.route.params.data}
                />
            </ScrollView>
        )
    }
}

export default connect(null)(ViewSeriesScreen);