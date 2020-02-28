import React from "react";
import {View, Image, ScrollView} from "react-native";
import {Text, Divider, Rating, Button}from 'react-native-elements';
import {colors} from "../Styles/colors";
import {OutlineButton} from "./Buttons";
import {MovieCardStyles, ScreenWidth} from "../Styles";

export const MovieCard =({data,type,typeChange,onSave})=>{
    const {title, rating, plot, director, year, genre, poster, actors, runtime} = data;

       return (
           <View style={MovieCardStyles.containerStyle}>
               <Image source={{uri:poster}} style={{resizeMode:'contain',height:ScreenWidth,width:'100%'}}/>
               <View style={MovieCardStyles.CenterView}>
                   <View>
                       <Text h3 style={MovieCardStyles.TitleStyle}>{title}</Text>
                       <Text style={{color:colors.grey}}>{runtime!==undefined?runtime:'unknown'}</Text>
                   </View>
                   <Text h5 style={MovieCardStyles.TextStyle}>{year}</Text>
               </View>
               <View style={MovieCardStyles.ButtonView}>
                   <Text style={{color:colors.grey}}>Director</Text>
                   <Text style={{color:colors.grey}}>{director}</Text>
               </View>
               <View >
                   <ScrollView horizontal centerContent>
                       <View style={{flexDirection:"row", justifyContent:'space-around'}}>
                           {genre!==undefined?genre.split(',').map(g=>(
                               <Text key={g} style={[MovieCardStyles.TextStyle, {padding:10}]}>{g.toUpperCase()}</Text>
                           )):null}
                       </View>
                   </ScrollView>
               </View>
               <Divider style={MovieCardStyles.DividerStyle}/>
               <View style={MovieCardStyles.CenterView}>
                   <Rating
                       readonly
                       count={5}
                       type={'custom'}
                       fractions={2}
                       ratingColor={colors.grey}
                       tintColor={colors.mainBackground}
                       startingValue={parseFloat(rating) / 2}
                   />
                   <Text style={MovieCardStyles.TextStyle}>IMDB</Text>
               </View>
               <Divider style={MovieCardStyles.DividerStyle}/>
               <View style={MovieCardStyles.paddingStyle}>
                   <Text h4 style={MovieCardStyles.TitleStyle}>Synopsis</Text>
                   <Text style={[MovieCardStyles.TextStyle, MovieCardStyles.paddingStyle]}>{plot}</Text>
               </View>
               <Divider style={MovieCardStyles.DividerStyle}/>
               <View style={MovieCardStyles.paddingStyle}>
                   <Text h4 style={MovieCardStyles.TitleStyle}>Actors</Text>
                   <Text style={[MovieCardStyles.TextStyle, MovieCardStyles.paddingStyle]}>{actors}</Text>
               </View>
               <Divider style={MovieCardStyles.DividerStyle}/>
               <View style={MovieCardStyles.ButtonView}>
                   <Button
                       title={'DVD'}
                       type={'clear'}
                       titleStyle={{
                           color: type === 'DVD' ? colors.white : colors.grey
                       }}
                       onPress={()=>typeChange("DVD")}
                   />
                   <Button
                       title={'BlueRay'}
                       type={'clear'}
                       titleStyle={{
                           color:type==='BlueRay'?colors.white:colors.grey,
                           textShadowColor:type==='BlueRay'?'blue':colors.grey,
                           textShadowRadius:type==='BlueRay'?10:0
                       }}
                       onPress={()=>typeChange('BlueRay')}
                   />
               </View>
               <Divider style={MovieCardStyles.DividerStyle}/>
               <OutlineButton
                   title={'Save'}
                   width={'80%'}
                   onPress={()=>onSave()}
               />

           </View>
       )



};


export const ViewMovieCard=({data})=>{

    const {title, rating, plot, director, year, genre, poster, actors, type, runtime} = data;
    return(
        <View style={MovieCardStyles.containerStyle}>
            <Image source={{uri:poster}} style={{resizeMode:'contain',height:ScreenWidth,width:'100%'}}/>
            <View style={MovieCardStyles.CenterView}>
                <View>
                    <Text h3 style={MovieCardStyles.TitleStyle}>{title}</Text>
                    <Text style={{color:colors.grey}}>Runtime: {runtime}</Text>
                </View>
                <Text h5 style={MovieCardStyles.TextStyle}>{year}</Text>
            </View>
            <Divider style={MovieCardStyles.DividerStyle}/>
            <View style={MovieCardStyles.ButtonView}>
                <Text style={{color:colors.grey}}>Director</Text>
                <Text style={{color:colors.grey}}>{director}</Text>
            </View>
            <Divider style={MovieCardStyles.DividerStyle}/>
            <View >
                <ScrollView horizontal centerContent>
                    <View style={{flexDirection:"row", justifyContent:'space-around'}}>
                    {genre!==undefined?genre.split(',').map(g=>(
                        <Text key={g} style={[MovieCardStyles.TextStyle, {padding:10}]}>{g.toUpperCase()}</Text>
                    )):null}
                    </View>
                </ScrollView>
            </View>
            <Divider style={MovieCardStyles.DividerStyle}/>
            <View style={MovieCardStyles.CenterView}>
                <Rating
                    readonly
                    count={5}
                    type={'custom'}
                    fractions={2}
                    ratingColor={colors.grey}
                    tintColor={colors.mainBackground}
                    startingValue={parseFloat(rating) / 2}
                />
                <Text style={MovieCardStyles.TextStyle}>IMDB</Text>
            </View>
            <Divider style={MovieCardStyles.DividerStyle}/>
            <View style={MovieCardStyles.paddingStyle}>
                <Text h4 style={MovieCardStyles.TitleStyle}>Synopsis</Text>
                <Text style={[MovieCardStyles.TextStyle, MovieCardStyles.paddingStyle]}>{plot}</Text>
            </View>
            <Divider style={MovieCardStyles.DividerStyle}/>
            <View style={MovieCardStyles.paddingStyle}>
                <Text h4 style={MovieCardStyles.TitleStyle}>Actors</Text>
                <Text style={[MovieCardStyles.TextStyle, MovieCardStyles.paddingStyle]}>{actors}</Text>
            </View>
            <Divider style={MovieCardStyles.DividerStyle}/>
            <View style={MovieCardStyles.centerView}>
                {
                    type==='DVD'?
                        <Text h4 style={{color:'white', paddingTop:'2%'}}>DVD</Text>:
                        <Text h4 style={{textShadowColor:'blue',textShadowRadius:10,color:'white', paddingTop:'2%'}}>BlueRay</Text>

                }
            </View>
        </View>
    )
};

