import React from "react";
import {ScrollView, View} from "react-native";
import {Overlay, ListItem, Text, Divider, CheckBox} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from "../Styles/colors";
import {OutlineButton} from "./Buttons";

const Genres =['Action','Drama',"Sci-Fi","Thriller","Adventure","Romance","Comedy","Biography","War","Magic","Mystery","Suspense","History","Crime" ];
const Ratings=[5,4,3,2,1];
const Formats=['DVD','BlueRay'];
class FilterModal extends React.Component{

    state={
      showGenre:false,
      showRating:false,
      showFormat:false
    };

    render(){
        const {show, onClose,genreList,handleGenre, onSave, rating, handleRating, format, handleFormat}=this.props;
        const {showGenre, showFormat,showRating}=this.state;
        return (
            <Overlay
                isVisible={show}
                fullScreen
                overlayBackgroundColor={colors.mainBackground}
            >
                <ScrollView >
                    <View style={Styles.containerStyle}>
                        <View style={Styles.titleViewStyle}>
                            <Text h3 style={Styles.titleStyle}>Filters</Text>
                            <Icon
                                name={'window-close'}
                                color={colors.lightGrey}
                                size={30}
                                raised
                                onPress={onClose}
                            />
                        </View>
                        <Divider
                            style={{backgroundColor:colors.lightGrey}}
                        />
                        <View>
                            <ListItem
                                title={'Genre'}
                                containerStyle={{backgroundColor:colors.mainBackground}}
                                titleStyle={{color:'white'}}
                                bottomDivider
                                onPress={()=>this.setState({showGenre: !showGenre})}
                                rightIcon={<Icon size={30} name={showGenre?'chevron-up':'chevron-down'} color={colors.lightGrey}/>}
                            />
                            {showGenre?
                                <View>
                                    {Genres.sort().map((g,i)=>(
                                        <CheckBox
                                            key={i}
                                            checked={genreList.includes(g)}
                                            title={g}
                                            textStyle={{color:colors.lightGrey}}
                                            onPress={()=>handleGenre(g)}
                                            containerStyle={Styles.checkBoxContainerStyle}
                                            checkedColor={colors.lightGrey}
                                        />
                                    ))}
                                </View>:
                                <View/>
                            }

                            <ListItem
                                title={'Rating'}
                                containerStyle={{backgroundColor:colors.mainBackground}}
                                titleStyle={{color:'white'}}
                                bottomDivider
                                topDivider
                                onPress={()=>this.setState({showRating: !showRating})}
                                rightIcon={<Icon size={30} name={showRating?'chevron-up':'chevron-down'} color={colors.lightGrey}/>}

                            />
                            {showRating?
                                <View>
                                    {Ratings.map((r,i)=>(
                                        <CheckBox
                                            key={i}
                                            checked={r===rating}
                                            onPress={()=>handleRating(r)}
                                            title={r + ' Star rating'}
                                            textStyle={{color:colors.lightGrey}}
                                            containerStyle={Styles.checkBoxContainerStyle}
                                            checkedColor={colors.lightGrey}
                                        />
                                    ))}
                                </View>:
                                <View/>
                            }
                            <ListItem
                                title={'Format'}
                                containerStyle={{backgroundColor:colors.mainBackground}}
                                titleStyle={{color:'white'}}
                                bottomDivider
                                topDivider
                                onPress={()=>this.setState({showFormat: !showFormat})}
                                rightIcon={<Icon size={30} name={showFormat?'chevron-up':'chevron-down'} color={colors.lightGrey}/>}

                            />
                            {showFormat?
                                <View>
                                    {Formats.map((f,i)=>(
                                        <CheckBox
                                            key={i}
                                            checked={f===format}
                                            onPress={()=>handleFormat(f)}
                                            title={f}
                                            textStyle={{color:colors.lightGrey}}
                                            containerStyle={Styles.checkBoxContainerStyle}
                                            checkedColor={colors.lightGrey}
                                        />
                                    ))}
                                </View>:
                                <View/>
                            }
                        </View>
                        <OutlineButton
                            title={'Apply Filters'}
                            width={'70%'}
                            onPress={onSave}
                        />
                    </View>
                </ScrollView>
            </Overlay>
        )
    }
}
const Styles={
    containerStyle:{
      paddingTop:'10%',
    },
  titleViewStyle:{
    justifyContent:'space-between',
    alignItems:'center',
      flexDirection:'row',
      paddingBottom:'2%'
  },
  titleStyle:{
      color:'white',
      paddingBottom:'1%'
  },
  checkBoxContainerStyle:{
        backgroundColor:colors.mainBackground,
        borderRadius:0,
        borderColor:colors.mainBackground
  }
};


export default FilterModal;