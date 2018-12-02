import {
    CREATE_SUCCESS,
    CREATE_FAILURE
} from '../actions/Collection';

const initialState = {
    error: '',
};

export default function register(state = initialState, action) {
    switch (action.type) {
        case CREATE_SUCCESS:
            return {...initialState};
        case CREATE_FAILURE:
            return {error: action.error};
        default:
            return state;
    }
}
