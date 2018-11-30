import {REGISTERING, REGISTER_SUCCESS, REGISTER_FAILURE} from '../actions/Register';

const initialState = {
    email: '',
    password: '',
    error: ''
};

export default function register(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
