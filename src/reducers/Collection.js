import {
    CREATE_SUCCESS,
    CREATE_FAILURE,
    GET_COLLECTIONS_SUCCESS,
    GET_DETAILS_SUCCESS,
    EDIT_SUCCESS,
    EDIT_FAILURE,
    REMOVE_SUCCESS
} from '../actions/Collection';

const initialState = {
    error: '',
    collections: [],
    selected: null,
    editError: ''
};

export default function collection(state = initialState, action) {
    switch (action.type) {
        case CREATE_SUCCESS:
            state.collections.push({
                id: action.collection._id,
                name: action.collection.name
            });
            return {...state};
        case CREATE_FAILURE:
            return {...state, error: action.error};
        case GET_COLLECTIONS_SUCCESS:
            const collections = action.collections.map(collection => {
                return {id: collection._id, name: collection.name};
            });
            return {...state, collections};
        case GET_DETAILS_SUCCESS:
            action.collection.id = action.collection._id;
            action.collection.restaurants.forEach(r => r.id = r._id);
            action.collection.users.forEach(u => u.id = u._id);
            return {...state, selected: action.collection};
        case EDIT_SUCCESS:
            return {...state, selected: {...state.selected, name: action.name}};
        case EDIT_FAILURE:
            return {...state, editError: action.error};
        case REMOVE_SUCCESS:
            const restaurants = state.selected.restaurants;
            state.selected.restaurants = restaurants.filter(r => r.id !== action.restaurant);
            return {...state, selected: {...state.selected}};
        default:
            return state;
    }
}
