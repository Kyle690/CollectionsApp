import {combineReducers} from "redux";

import Movies from './moviesReducers';
import Series from './seriesReducers';
import settings from './settingsReducer';

export default combineReducers({
    MovieCol:Movies,
    SeriesCol:Series,
    Settings:settings
});