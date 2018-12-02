import {
    CREATE_SUCCESS,
    CREATE_FAILURE,
    GET_COLLECTIONS_SUCCESS
} from '../actions/Collection';

const initialState = {
    error: '',
    collections: []
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
        default:
            return state;
    }
}
