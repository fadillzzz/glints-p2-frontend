import fetch from '../FetchWrapper';

export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';
export const GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS';
export const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';
export const REMOVE_SUCCESS = 'REMOVE_SUCCESS';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export function createSuccess(collection) {
    return {type: CREATE_SUCCESS, collection};
}

export function createFailure(error) {
    return {type: CREATE_FAILURE, error};
}

export function getCollectionsSuccess(collections) {
    return {type: GET_COLLECTIONS_SUCCESS, collections};
}

export function getDetailsSuccess(collection) {
    return {type: GET_DETAILS_SUCCESS, collection};
}

export function editSuccess(name) {
    return {type: EDIT_SUCCESS, name};
}

export function editFailure(error) {
    return {type: EDIT_FAILURE, error};
}

export function removeSuccess(restaurant) {
    return {type: REMOVE_SUCCESS, restaurant};
}

export function addUserSuccess(user) {
    return {type: ADD_USER_SUCCESS, user};
}

export function addUserFailure(error) {
    return {type: ADD_USER_FAILURE, error};
}

export function create(name) {
    return async dispatch => {
        let res = await fetch.post('collections', {name});
        res = await res.json();

        if (res.collection) {
            return dispatch(createSuccess(res.collection));
        } else {
            return dispatch(createFailure(res.error));
        }
    };
}

export function edit(id, name) {
    return async dispatch => {
        let res = await fetch.put(`collections/${id}`, {name});
        res = await res.json();

        if (! res.error) {
            return dispatch(editSuccess(name));
        } else {
            return dispatch(editFailure(res.error));
        }
    };
}

export function getCollections() {
    return async dispatch => {
        let res = await fetch.get('collections');
        res = await res.json();

        if (res.collections) {
            return dispatch(getCollectionsSuccess(res.collections));
        }
    };
}

export function getDetails(id) {
    return async dispatch => {
        let res = await fetch.get(`collections/${id}`);
        res = await res.json();

        if (! res.error) {
            return dispatch(getDetailsSuccess(res));
        }
    };
}

export function addTo(restaurantId, collectionId) {
    return dispatch => {
        fetch.put(`collections/${collectionId}/restaurants/${restaurantId}`);
    };
}

export function removeFrom(restaurantId, collectionId) {
    return async dispatch => {
        await fetch.delete(`collections/${collectionId}/restaurants/${restaurantId}`);
        return dispatch(removeSuccess(restaurantId));
    };
}

export function addUser(collectionId, email) {
    return async dispatch => {
        // Ideally this would be PUT /collections/:id/users/:userId
        let res = await fetch.patch(`collections/${collectionId}/users`, {email});
        res = await res.json();

        if (! res.error) {
            return dispatch(addUserSuccess(res.user));
        } else {
            return dispatch(addUserFailure(res.error));
        }
    };
}
