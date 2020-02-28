import React from "react";
import {View, Image, ScrollView} from "react-native";
import {ViewMovieCard} from "../../Components/MovieCard";

class ViewMovieScreen extends React.Component{



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
export default ViewMovieScreen;