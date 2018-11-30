import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    return createStore(
        combinedReducers,
        composeEnhancers(applyMiddleware(thunk))
    );
}
