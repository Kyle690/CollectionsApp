import {combineReducers} from "redux";

import Movies from './moviesReducers';
import Series from './seriesReducers';
import settings from './settingsReducer';
import auth from './AuthReducer';

export default combineReducers({
    MovieCol:Movies,
    SeriesCol:Series,
    Settings:settings,
    Auth:auth
});