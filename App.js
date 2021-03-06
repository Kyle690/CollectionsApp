import * as React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './Store';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Button} from "react-native-elements";
import {PersistGate} from "redux-persist/integration/react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {colors} from "./Styles/colors";

// import screens
import WelcomeScreen from "./Screens/WelcomeScreen";
import MoviesHomeScreen from "./Screens/Movies/moviesHomeScreen";
import SeriesHomeScreen from "./Screens/Series/SeriesHomeScreen";
import AddMovieScreen from "./Screens/Movies/AddMovieScreen";
import EditMovieScreen from "./Screens/Movies/EditMovieScreen";
import ViewMovieScreen from "./Screens/Movies/ViewMovieScreen";
import AddSeriesScreen from "./Screens/Series/AddSeriesScreen";
import EditSeriesScreen from "./Screens/Series/EditSeriesScreen";
import ViewSeriesScreen from "./Screens/Series/ViewSeriesScreen";
import helpScreen from "./Screens/WelcomeScreen/helpScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import PrivacyPolicy from "./Screens/PrivacyPolicy";
import AuthLoginScreen from "./Screens/Auth/AuthLoginScreen";
import AuthRegisterScreen from "./Screens/Auth/AuthRegisterScreen";
import AuthResetPasswordScreen from "./Screens/Auth/AuthResetPasswordScreen";
import AuthProfile from "./Screens/Auth/AuthProfile";
import AuthEditProfile from "./Screens/Auth/AuthEditProfile";

const Stack = createStackNavigator();
const Tab=createBottomTabNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        primary: colors.lightGrey,
        background: colors.mainBackground,
        card: colors.mainBackground,
        text: colors.white,
        border: colors.grey,
    },
};

const MovieStack=createStackNavigator();
const MovieScreens=({navigation})=>{
    return (
        <MovieStack.Navigator initialRouteName={'Movies'}>
            <MovieStack.Screen
                name={'Movies'}
                component={MoviesHomeScreen}
                options={{
                    headerRight: () => (
                        <Button
                            type={'clear'}
                            onPress={() => navigation.navigate('Add Movie')}
                            title="Add"
                            titleStyle={{color:'#fff'}}
                        />
                    )
                }}
            />
            <MovieStack.Screen name={'Add Movie'} component={AddMovieScreen}/>
            <MovieStack.Screen
                name={'EditMovie'}
                component={EditMovieScreen}

            />
            <MovieStack.Screen
                name={'ViewMovie'}
                component={ViewMovieScreen}
                options={({route})=>({
                    headerTitle: route.params.data.title.length>25?route.params.data.title.slice(0,23)+'...':route.params.data.title,
                    headerRight:()=>(
                        <Button
                            type={'clear'}
                            title={'Edit'}
                            titleStyle={{color:'#fff'}}
                            onPress={()=>navigation.navigate('EditMovie', {data:route.params.data})}
                        />
                    )
                })}
            />
        </MovieStack.Navigator>
    )
};

const SeriesStack=createStackNavigator();
const SeriesScreens=({navigation})=>{
  return (
      <SeriesStack.Navigator initialRouteName={'Series'}>
          <SeriesStack.Screen
              name={'Series'}
              component={SeriesHomeScreen}
              options={{
                  headerRight:()=>(
                      <Button
                        type={'clear'}
                        title={'Add'}
                        titleStyle={{color:'#fff'}}
                        onPress={()=>navigation.navigate('AddSeries')}
                      />
                  )
              }}
          />
          <SeriesStack.Screen name={'AddSeries'} component={AddSeriesScreen}/>
          <SeriesStack.Screen name={'EditSeries'} component={EditSeriesScreen}/>
          <SeriesStack.Screen
              name={'ViewSeries'}
              component={ViewSeriesScreen}
              options={({route, })=>({
                  headerTitle: route.params.data.title,
                  headerRight:()=>(
                      <Button
                          type={'clear'}
                          title={'Edit'}
                          titleStyle={{color:'#fff'}}
                          onPress={()=>navigation.navigate('EditSeries', {data:route.params.data})}
                      />
                  )
              })}
          />
      </SeriesStack.Navigator>
  )
};

const AuthStack=createStackNavigator();
const AuthScreens=({navigation})=>{
    return (
        <AuthStack.Navigator initialRouteNames={'authProfile'}>
            <AuthStack.Screen
                name={'authProfile'}
                component={AuthProfile}
                options={()=>({
                    headerTitle:'Profile',
                    headerRight:()=>(
                        <Button
                            title={'Edit'}
                            type={'clear'}
                            titleStyle={{color:'#fff'}}
                            onPress={()=>navigation.navigate('AuthEdit')}
                        />
                    )
                })}
            />
            <AuthStack.Screen
                name={'AuthEdit'}
                component={AuthEditProfile}
                options={()=>({
                    headerTitle:'Edit Profile'
                })}
            />
        </AuthStack.Navigator>
    )
}

function App(){

    return (
        <Provider store={store}>
            <PersistGate
                persistor={persistor}
                loading={<LoadingScreen/>}
            >
                <NavigationContainer theme={MyTheme}>
                    <Stack.Navigator initialRouteName="WelcomeScreen" headerMode="none">
                        <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen}/>
                        <Stack.Screen name={'AuthLogin'} component={AuthLoginScreen} screenOptions={{headerShown:false}}/>
                        <Stack.Screen name={'AuthReset'} component={AuthResetPasswordScreen} screenOptions={{headerShown:false}}/>
                        <Stack.Screen name={'AuthRegister'} component={AuthRegisterScreen}screenOptions={{headerShown:false}}/>
                        <Stack.Screen name={'HelpScreen'} component={helpScreen}/>
                        <Stack.Screen name={'Privacy'} component={PrivacyPolicy}/>
                        <Stack.Screen name={'App'}>
                            {()=>(
                                <Tab.Navigator
                                    initialRouteName='MoviesTab'
                                    screenOptions={({route})=>({
                                        tabBarIcon:({color})=>{
                                            const iconName= route.name==='MoviesTab'?'movie':route.name==='SeriesTab'?'movie-roll':'account';
                                            return <Icon name={iconName} size={30} color={color} />
                                        }

                                    })}
                                    tabBarOptions={{
                                        style:{height:80},
                                        activeTintColor: colors.white,
                                        inactiveTintColor: colors.grey,
                                    }}
                                >
                                    <Tab.Screen name={'MoviesTab'} component={MovieScreens} options={{title:'Movies'}}/>
                                    <Tab.Screen name={'SeriesTab'} component={SeriesScreens} options={{title:'Series'}}/>
                                    <Tab.Screen name={'AuthTab'} component={AuthScreens} options={{title:'Profile'}}/>
                                </Tab.Navigator>
                            )}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )

}

export default App;
