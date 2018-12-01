import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initialState;

if (localStorage.authToken) {
    initialState = {register: {token: localStorage.authToken}};
}

export default function configureStore() {
    return createStore(
        combinedReducers,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
}
