import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let initialState;

if (localStorage.authToken) {
    initialState = {register: {token: localStorage.authToken, email: localStorage.email}};
}

export default function configureStore() {
    const store = createStore(
        combinedReducers,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );

    store.subscribe(() => {
        const {email, token} = store.getState().register;
        localStorage.setItem('authToken', token);
        localStorage.setItem('email', email);
    });

    return store;
}
