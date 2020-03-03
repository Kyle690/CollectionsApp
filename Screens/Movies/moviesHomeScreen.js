import React from'react';
import {View, Button, Image, StatusBar, ScrollView, Platform, SafeAreaView} from "react-native";
import {Text, ButtonGroup, ListItem, Rating, SearchBar} from "react-native-elements";
import {connect}from 'react-redux';
import {ScreenHeight, ScreenWidth} from "../../Styles";
import {TouchableOpacity} from "react-native";
import {colors} from "../../Styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SortByModal from "../../Components/SortByModal";
import {sortCatalogFunction, SortList} from "../../Functions/sortCatalogFunction";
import {ClearAll} from "../../Store/Actions/MovieActions";
import FocusComponent from "../../Components/FocusComponent";
import FilterModal from "../../Components/FilterModal";
import {getRandom} from "../../Functions";
import {AdMobBanner} from 'expo-ads-admob';
import {BannerAddId} from "../../Constants/constants";

class MoviesHomeScreen extends React.Component{

  state={
    viewType:"tile",
    search:'',
    sortBy:'',
    sortByModal:false,
    movies:[],
    filterModal:false,
    filterGenres:[],
    filterRatings:0,
    filterFormat:''
  };

  componentDidMount() {
     // this.initAds().catch((error) => console.log(error));
      this.props.navigation.setOptions({
          headerLeft:()=>(
              <Button
                  title={'Random'}
                  color={'#fff'}
                  onPress={()=>Object.keys(this.props.movies).length>0?this.props.navigation.navigate('ViewMovie',{data:getRandom(this.props.movies)}):alert('No Movies!')}
              />
          )
      });

      this.setState({movies:SortList(this.props.movies)});
  }

  renderMoviesTile=()=>{
      const {movies, filterGenres,filterFormat,filterRatings} = this.state;
      const search = this.state.search.toLowerCase();

        if(movies.length>0){

            return (
                <View style={{
                    flex:3,
                    flexDirection:'row',
                    justifyContent:'space-around',
                    alignItems:'center',
                    flexWrap:'wrap',
                    marginBottom:500
                }}>
                    {movies.map(movie=>{
                        const {title, poster, id, genre,rating,type}=movie;
                        let check=true;
                        if(filterGenres.length>0 || filterRatings!==0 ||filterFormat!==''){
                            check=false;

                            if(filterFormat === type){
                                check=true;
                            }
                            const sortedRating = Math.ceil(parseFloat(rating)/2);
                            if(sortedRating>=filterRatings && sortedRating<filterRatings+1 ){
                                check=true
                            }

                            const genreArr= genre.split(', ').map(g=>g.toUpperCase());
                            if(genreArr.some(r=>filterGenres.map(c=>c.toUpperCase()).includes(r))){

                                check=true
                            }
                        }


                        if(title.toLowerCase().includes(search) && check){
                            return (
                                <TouchableOpacity
                                    key={id}
                                    style={{
                                        marginBottom:ScreenHeight*0.01,
                                        marginTop:ScreenHeight*0.01,
                                        height:ScreenWidth*0.5,
                                        width:ScreenWidth*0.28,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        flexDirection:'column'
                                    }}
                                    onPress={()=>this.handleView(movie)}
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

                    })}
                </View>
            )


        }else{
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color:'white'}}>No Movies yet...</Text>
                </View>

            )
        }

    };

  renderMoviesRow=()=>{
      const {movies, filterGenres,filterRatings,filterFormat} = this.state;
      const search = this.state.search.toLowerCase();

      if(movies.length>0){

          return (
              <View style={{
                  marginBottom:500
              }}>
                  {movies.map(movie=>{
                      const {poster,title,rating, year,id}=movie;
                      let check=true;
                      if(filterGenres.length>0 || filterRatings!==0 ||filterFormat!==''){
                          check=false;

                          if(filterFormat === type){
                              check=true;
                          }
                          const sortedRating = Math.ceil(parseFloat(rating)/2);
                          if(sortedRating>=filterRatings && sortedRating<filterRatings+1 ){
                              check=true
                          }

                          const genreArr= genre.split(', ').map(g=>g.toUpperCase());
                          if(genreArr.some(r=>filterGenres.map(c=>c.toUpperCase()).includes(r))){

                              check=true
                          }
                      }
                      if(title.toLowerCase().includes(search) && check){
                          return (
                              <ListItem
                                  key={id}
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
                                  subtitle={year}
                                  subtitleStyle={{color:colors.lightGrey}}
                                  leftElement={<View><Image source={{uri:poster}} style={{height:100,width:50}}/></View>}
                                  containerStyle={{backgroundColor:colors.mainBackground}}
                                  onPress={()=>this.handleView(movie)}
                              />
                          )
                      }



                  })}

              </View>
          )



      }else{
          return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{color:'white'}}>No Movies yet...</Text>
              </View>

          )
      }


  };

  handleButtonGroup=(index)=>{
      const {viewType}=this.state;

      if(index===0){
          //handle sort by
          this.setState({sortByModal:true});
      }else if(index===1){
          // handle filter by
          this.setState({filterModal:true});
      }else{
          this.setState({viewType: viewType==='tile'?'row':'tile'})
      }
  };

  updateSearch=(text)=>{
        this.setState({search:text})
    };

  handleView=(movie)=>{
    this.props.navigation.navigate('ViewMovie',{data:movie})
  };

  handleSortByUpdate=(mode)=>{
    const {movies,sortBy}=this.state;
    if(mode ==='clear'){
        this.setState({movies:SortList(this.props.movies),sortBy: '', sortByModal:false});
    }else{
        this.setState({movies:sortCatalogFunction(movies,sortBy), sortByModal:false})
    }
  };

  _onFocusUpdate=movies=>{
    this.setState({movies:SortList(movies)});
  };

  handleGenreUpdate=(genre)=>{
      const {filterGenres}=this.state;
      if(filterGenres.includes(genre)){
          const index = filterGenres.indexOf(genre);
          filterGenres.splice(index,1);
      }else{
          filterGenres.push(genre);
      }

      this.setState({filterGenres});
  };


   render(){
       const {viewType,search, sortByModal, sortBy, filterModal, filterGenres, filterRatings, filterFormat}=this.state;
       return (
           <SafeAreaView>

               <FilterModal
                show={filterModal}
                onClose={()=>this.setState({filterModal:false})}
                genreList={filterGenres}
                handleGenre={this.handleGenreUpdate}
                rating={filterRatings}
                handleRating={(rating)=>this.setState({filterRatings:rating})}
                format={filterFormat}
                handleFormat={(format)=>this.setState({filterFormat: format})}
                onSave={()=>this.setState({filterModal: false})}
               />
               <FocusComponent
                    state={this.props.movies}
                    onUpdate={this._onFocusUpdate}
               />
               <SortByModal
                show={sortByModal}
                checkedItem={sortBy}
                onCheck={(item)=>this.setState({sortBy:item})}
                onClose={()=>this.handleSortByUpdate()}
                onClear={()=>this.handleSortByUpdate('clear')}
               />
               <StatusBar barStyle={'light-content'}/>
               <AdMobBanner
                   bannerSize="smartBannerPortrait"
                   adUnitID={BannerAddId}
                   servePersonalizedAds={false} // true or false
                   onDidFailToReceiveAdWithError={err=>console.log(err)}
                   style={{
                       position: "absolute",
                       width: "100%",
                       //top:50,
                       zIndex:1000
                      // bottom:viewType==='tile'?ScreenHeight*0.08:ScreenHeight*0.13,
                       //marginBottom:ScreenHeight*0.1
                   }}
               />
               <View style={{marginTop:50}}>
               {filterRatings===0 && filterFormat==='' && filterGenres.length===0?
               <SearchBar
                   placeholder="Search movie titles ..."
                   onChangeText={this.updateSearch}
                   value={search}
                   onClear={()=>this.setState({search:''})}
                   platform={Platform.OS==='darwin'?'ios':"default"}
                   inputStyle={{color:colors.lightGrey}}
                   inputContainerStyle={{borderRadius:50, backgroundColor:colors.mainBackground}}
                   containerStyle={{backgroundColor:colors.mainBackground, borderBottomColor: 'transparent'}}
                   returnKeyType="search"
               />:<View/>}
               </View>
                <ButtonGroup
                    buttons={
                        ['Sort by',
                            'Filter By',
                            <Icon
                                name={viewType==='row'?'view-grid':'view-sequential'}
                                size={30}
                            />
                            ]}
                    onPress={(index)=>this.handleButtonGroup(index)}/>
               {filterRatings!==0 || filterFormat!=='' || filterGenres.length>0?
                   <View>
                       {
                           filterGenres!==[]?
                               <ScrollView horizontal>
                                   <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                       {filterRatings!==0?<Text style={{color:colors.lightGrey, padding:10}}>{filterRatings} Star Rating</Text>:<Text/>}
                                       <Text style={{color:colors.lightGrey, padding:10}}>{filterFormat}</Text>
                                       {filterGenres.map((g,i)=>(
                                           <Text key={i} style={{color:colors.lightGrey, padding:10}}>{g}</Text>
                                       ))}
                                   </View>
                               </ScrollView>:
                               <View/>
                       }
                       <Button color={colors.lightGrey} title={'Clear Filters'} onPress={()=>this.setState({filterGenres:[], filterRatings:0, filterFormat:''})}/>
                   </View>:<View/>

               }

               <ScrollView
                   style={{minHeight:ScreenHeight}}

               >
                {viewType==='tile'?
                    this.renderMoviesTile():
                    this.renderMoviesRow()
                }
               </ScrollView>

           </SafeAreaView>
       )
   }


}

const mapStateToProps=state=>{
  return {
      movies:state.MovieCol.movies
  }

};

export default connect(mapStateToProps,{ClearAll})(MoviesHomeScreen)