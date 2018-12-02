import {
    CREATE_SUCCESS,
    CREATE_FAILURE,
    GET_COLLECTIONS_SUCCESS,
    GET_DETAILS_SUCCESS,
    EDIT_SUCCESS,
    EDIT_FAILURE,
    REMOVE_SUCCESS,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    ADD_SUCCESS
} from '../actions/Collection';

const initialState = {
    error: '',
    collections: [],
    selected: null,
    editError: '',
    addUserError: ''
};

export default function collection(state = initialState, action) {
    switch (action.type) {
        case CREATE_SUCCESS:
            if (! state.collections.find(c => c.id === action.collection._id)) {
                state.collections.push({
                    id: action.collection._id,
                    name: action.collection.name
                });
            }

            return {...state, collections: [...state.collections]};
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
            // If ID is included, it's most likely coming from a socket
            // and we should update collections array just in case the user
            // is on the collections page
            if (action.id) {
                state.collections.forEach(collection => {
                    if (collection.id === action.id) {
                        collection.name = action.name;
                    }
                });
            }

            return {
                ...state,
                selected: {...state.selected, name: action.name},
                collections: [...state.collections]
            };
        case EDIT_FAILURE:
            return {...state, editError: action.error};
        case REMOVE_SUCCESS:
            const restaurants = state.selected.restaurants;
            state.selected.restaurants = restaurants.filter(r => r.id !== action.restaurant);
            return {...state, selected: {...state.selected}};
        case ADD_USER_SUCCESS:
            const userFound = state.selected.users.find(u => {
                return u.id === action.user._id;
            });

            if (! userFound) {
                action.user.id = action.user._id;
                state.selected.users.push(action.user);
            }

            return {...state, addUserError: '', selected: {...state.selected}};
        case ADD_USER_FAILURE:
            return {...state, addUserError: action.error};
        case ADD_SUCCESS:
            const restaurantFound = state.selected.restaurants.find(r => {
                return r.id === action.restaurant._id;
            });

            if (! restaurantFound) {
                action.restaurant.id = action.restaurant._id;
                state.selected.restaurants.push(action.restaurant);
            }

            return {...state, selected: {...state.selected}};
        default:
            return state;
    }
}
