import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {persistStore,persistReducer}from 'redux-persist';
import {AsyncStorage} from "react-native";

import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import reducers from './Reducers';


const config ={
    key:'root',
    storage:AsyncStorage,
    stateReconciler:hardSet
};

const reducer = persistReducer(config,reducers);
export const store = createStore(reducer, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);
