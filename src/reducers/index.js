import {combineReducers} from 'redux';
import register from './Register';
import search from './Search';
import collection from './Collection';
import socket from './Socket';

export default combineReducers({
    register,
    search,
    collection,
    socket
});
