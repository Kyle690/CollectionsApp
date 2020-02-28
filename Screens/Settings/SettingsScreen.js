import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {connect}from 'react-redux';
import {ListItem, Divider, Text} from "react-native-elements";
import ConfirmModal from "../../Components/ConfirmModal";
import {ClearAll} from "../../Store/Actions/MovieActions";
import {ClearAllSeries} from "../../Store/Actions/SeriesActions";
import {colors} from "../../Styles/colors";
import {OutlineButton} from "../../Components/Buttons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {ScreenWidth} from "../../Styles";
import FocusComponent from "../../Components/FocusComponent";
import {ListStats} from "../../Functions";

class SettingsScreen extends React.Component{
    state={
        confirmModal:false,
        confirmSection:'',
        movies:{
            total:0,
            dvd:0,
            blueRay:0,
            runtimeTotal:0
        },
        series:{
            total:0,
            dvd:0,
            blueRay:0,
            runtimeTotal:0
        },
        totals:{
            total:0,
            dvd:0,
            blueRay:0,
            runtimeTotal:0
        }
    };

    componentDidMount() {
        const {movies,series}=this.props;
        this.setState({movies:ListStats(movies), series:ListStats(series), totals:ListStats(Object.assign({},movies,series))})
    }


    handleDelete=()=>{
      const {confirmSection}=this.state;

      if(confirmSection==='Movies'){
          this.props.ClearAll(res=>{
              if(res.status===1){
                  this.setState({confirmSection:'',confirmModal:false});
                  alert('Movie Library has been deleted!')
              }
          })
      }else{
            this.props.ClearAllSeries(res=>{
                if(res.status===1){
                    this.setState({confirmSection:'',confirmModal:false});
                    alert('Series Library has been deleted!')
                }
            })
      }
    };

    _onFocusUpdate=()=>{
      const {movies,series}=this.props;
        this.setState({movies:ListStats(movies), series:ListStats(series), totals:ListStats(Object.assign({},movies,series))})

    };

    render(){
        const {confirmModal, confirmSection, movies, series, totals}=this.state;
        return (
            <View>
                <FocusComponent
                    state={this.props.movies}
                    onUpdate={this._onFocusUpdate}
                />
                <ConfirmModal
                    show={confirmModal}
                    onClose={()=>this.setState({confirmModal: false, confirmSection: ''})}
                    text={'Are you sure you want to delete your'+confirmSection+' library?'}
                    title={'Delete '+confirmSection}
                    onSaveText={'Delete'}
                    onSave={()=>this.handleDelete()}
                />
                <ScrollView>
                    <View >
                        <View>
                            <ListItem
                                title={'Total collection'}
                                titleStyle={Styles.textStyle}
                                containerStyle={Styles.listItemStyle}
                                rightTitle={totals.total.toString()}
                                rightTitleStyle={Styles.textStyle}
                            />
                            <ListItem
                                title={"Total No of DVDs"}
                                titleStyle={Styles.textStyle}
                                containerStyle={Styles.listItemStyle}
                                rightTitle={totals.dvd.toString()}
                                rightTitleStyle={Styles.textStyle}
                            />
                            <ListItem
                                title={"Total No of BlueRays"}
                                titleStyle={Styles.textStyle}
                                containerStyle={Styles.listItemStyle}
                                rightTitle={totals.blueRay.toString()}
                                rightTitleStyle={Styles.textStyle}
                            />
                            <ListItem
                                title={"Total Runtime"}
                                titleStyle={Styles.textStyle}
                                containerStyle={Styles.listItemStyle}
                                rightTitle={totals.runtimeTotal.toString()+' hrs'}
                                rightTitleStyle={Styles.textStyle}
                            />
                        </View>
                        <Divider style={{backgroundColor:colors.lightGrey}}/>
                        <View style={Styles.containerStyle}>

                            <View style={Styles.statsContainer}>
                                <Icon
                                    name={'movie'}
                                    color={colors.lightGrey}
                                    size={40}
                                />
                                <Text h3 style={Styles.TitleStyle}>Movies</Text>

                            </View>
                            <View style={{width:'100%'}}>
                                <ListItem
                                    title={'No of movies'}
                                    titleStyle={Styles.textStyle}
                                    containerStyle={Styles.listItemStyle}
                                    rightTitle={movies.total.toString()}
                                    rightTitleStyle={Styles.textStyle}
                                />
                                <ListItem
                                    title={"No of DVDs"}
                                    titleStyle={Styles.textStyle}
                                    containerStyle={Styles.listItemStyle}
                                    rightTitle={movies.dvd.toString()}
                                    rightTitleStyle={Styles.textStyle}
                                />
                                <ListItem
                                    title={"No of BlueRays"}
                                    titleStyle={Styles.textStyle}
                                    containerStyle={Styles.listItemStyle}
                                    rightTitle={movies.blueRay.toString()}
                                    rightTitleStyle={Styles.textStyle}
                                />
                                <ListItem
                                    title={"Runtime"}
                                    titleStyle={Styles.textStyle}
                                    containerStyle={Styles.listItemStyle}
                                    rightTitle={movies.runtimeTotal.toString()+' hrs'}
                                    rightTitleStyle={Styles.textStyle}
                                />
                            </View>
                            <OutlineButton
                                title={'Delete Library'}
                                width={'90%'}
                                onPress={()=>this.setState({confirmModal:true, confirmSection: 'Movies'})}
                            />
                        </View>
                        <Divider style={{backgroundColor:colors.lightGrey}}/>
                        <View style={Styles.containerStyle}>
                            <View style={Styles.statsContainer}>
                                <Icon
                                    name={'movie-roll'}
                                    color={colors.lightGrey}
                                    size={40}
                                />
                                <Text h3 style={Styles.TitleStyle}>Series</Text>

                            </View>
                            <View style={{width:'100%'}}>
                                <ListItem
                                    title={'No of Series'}
                                    titleStyle={Styles.textStyle}
                                    containerStyle={Styles.listItemStyle}
                                    rightTitle={series.total.toString()}
                                    rightTitleStyle={Styles.textStyle}
                                />
                                <ListItem
                                    title={"No of DVDs"}
                                    titleStyle={Styles.textStyle}
                                    containerStyle={Styles.listItemStyle}
                                    rightTitle={series.dvd.toString()}
                                    rightTitleStyle={Styles.textStyle}
                                />
                                <ListItem
                                    title={"No of BlueRays"}
                                    titleStyle={Styles.textStyle}
                                    containerStyle={Styles.listItemStyle}
                                    rightTitle={series.blueRay.toString()}
                                    rightTitleStyle={Styles.textStyle}
                                />
                                <ListItem
                                    title={"Total Runtime"}
                                    titleStyle={Styles.textStyle}
                                    containerStyle={Styles.listItemStyle}
                                    rightTitle={series.runtimeTotal.toString()+' hrs'}
                                    rightTitleStyle={Styles.textStyle}
                                />

                            </View>
                            <OutlineButton
                                title={'Delete Library'}
                                width={'90%'}
                                onPress={()=>this.setState({confirmModal:true, confirmSection: 'Series'})}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps=state=>{
  return {
      movies:state.MovieCol.movies,
      series:state.SeriesCol.series
  }

};
const Styles=StyleSheet.create({
    TitleStyle:{
        color:colors.white,
        paddingLeft:20
    },
    containerStyle:{
      justifyContent:'center',
      alignItems:'center',
      paddingBottom:'2%',
      paddingTop:'5%',
      marginTop:'5%'
    },
    statsContainer:{
        width:ScreenWidth,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    listItemStyle:{
        backgroundColor:colors.mainBackground
    },
    textStyle:{
        color:colors.lightGrey
    }
});


export default connect(mapStateToProps,{ClearAll, ClearAllSeries})(SettingsScreen);