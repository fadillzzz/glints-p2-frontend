import {
    LOGGING_OUT,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../actions/Register';

const initialState = {
    error: '',
    token: ''
};

export default function register(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...initialState, token: action.token};
        case REGISTER_FAILURE:
            return {error: action.error};
        case LOGGING_OUT:
            return {...initialState};
        default:
            return state;
    }
}
