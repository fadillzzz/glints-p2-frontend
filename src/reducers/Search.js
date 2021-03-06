import {
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from '../actions/Search';

const initialState = {
    restaurants: [],
    error: ''
};

export default function search(state = initialState, action) {
    switch (action.type) {
        case SEARCH_SUCCESS:
            action.restaurants.forEach(r => r.id = r._id);
            return {...state, restaurants: action.restaurants};
        case SEARCH_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
}
