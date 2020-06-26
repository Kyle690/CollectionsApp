import React,{useRef} from "react";
import {FlatList, Image, TouchableOpacity, View} from "react-native";
import {ScreenHeight, ScreenWidth} from "../Styles";
import {colors} from "../Styles/colors";
import {ListItem, Rating, Text} from "react-native-elements";
import {OutlineButton} from "../Components/Buttons";




const FlatlistRender=({data,filterGenres,filterFormat,filterRatings,search,viewType,handleView,})=>{
    const dataToShow=()=>{
        return data.reduce((a,v)=>{

            const {title,genre,rating,type}=v;
            let check=true;
            if(filterGenres.length>0 || filterRatings!==0 ||filterFormat!==''){
                check=false;
                check = filterFormat === type
                const sortedRating = Math.ceil(parseFloat(rating)/2);
                check =sortedRating>=filterRatings && sortedRating<filterRatings+1
                const genreArr= genre.split(', ').map(g=>g.toUpperCase());
                check =genreArr.some(r=>filterGenres.map(c=>c.toUpperCase()).includes(r))
            }

            title.toLowerCase().includes(search) && check ? a.push(v):null;

            return a;
        },[]);
    };

    const RenderItem=(movie)=>{
        const {poster,title,rating, year,id,type}=movie;
        if(viewType==='tile'){
            return (
                <TouchableOpacity
                    key={id+viewType}
                    style={{
                        marginBottom:ScreenHeight*0.03,
                        marginTop:ScreenHeight*0.01,
                        height:ScreenWidth*0.5,
                        width:ScreenWidth*0.30,
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:'column'
                    }}
                    onPress={()=>handleView(movie)}
                >
                    <View style={{height:200,width:100}}>
                        <Image
                            source={{uri:poster}}
                            style={{
                                resizeMode:'contain',
                                height:ScreenWidth*0.45,
                                width:ScreenWidth*0.25,
                                alignSelf:'center',
                                shadowColor:type==='Bluray'?'blue':colors.mainBackground,
                                shadowOpacity:0.8,
                                shadowRadius:type==='Bluray'?10:0,
                                shadowOffset:{width:0,height:10}
                            }}
                        />
                        <Text style={{
                            color:'white',
                            textAlign:'center',
                            textShadowColor:type==='Bluray'?'blue':colors.mainBackground,
                            textShadowRadius:type==='Bluray'?10:0
                        }}>{title}</Text>
                    </View>


                </TouchableOpacity>
            )
        }
        else {
            return (
                <ListItem
                    key={id+viewType}
                    bottomDivider
                    title={title}
                    titleStyle={{color:colors.white}}
                    rightTitle={
                        <Rating
                            imageSize={15}
                            readonly
                            count={5}
                            type={'custom'}
                            fractions={2}
                            ratingColor={colors.grey}
                            tintColor={colors.mainBackground}
                            startingValue={parseFloat(rating) / 2}
                        />
                    }
                    rightSubtitle={rating+'/10'}
                    rightSubtitleStyle={{color:colors.grey}}
                    subtitle={year}
                    subtitleStyle={{color:colors.lightGrey}}
                    leftElement={<View><Image source={{uri:poster}} style={{height:100,width:50}}/></View>}
                    containerStyle={{backgroundColor:colors.mainBackground}}
                    onPress={()=>this.handleView(movie)}
                />
            )
        }


    };

    let flatListRef=useRef(null);

    const ScrollToTop=()=>{
        flatListRef.scrollToIndex({animated:true,index:0});
    }

    return (
        <FlatList
            key={viewType}
            ref={(ref) => {flatListRef = ref; }}
            numColumns={viewType==='tile'?3:1}
            data={dataToShow()}
            renderItem={({item})=>RenderItem(item)}
            keyExtractor={(item,index)=>item.id+viewType}
            ListFooterComponent={
                <View style={{flex:1,alignItems:'center'}}>
                    <OutlineButton
                        title={'Scroll to top'}
                        onPress={ScrollToTop}
                    />
                </View>}
            ListFooterComponentStyle={{marginBottom:90, marginTop:25}}

        />
    )

}

export default FlatlistRender;