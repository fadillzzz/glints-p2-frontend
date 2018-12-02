import {
    LOGGING_OUT,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../actions/Register';

const initialState = {
    error: '',
    token: '',
    email: ''
};

export default function register(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, token: action.token, email: action.email};
        case REGISTER_FAILURE:
            return {...state, error: action.error};
        case LOGGING_OUT:
            return {...initialState};
        default:
            return state;
    }
}
