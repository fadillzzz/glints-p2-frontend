import {combineReducers} from 'redux';
import register from './Register';
import search from './Search';
import collection from './Collection';

export default combineReducers({
    register,
    search,
    collection
});
