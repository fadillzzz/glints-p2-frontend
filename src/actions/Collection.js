import fetch from '../FetchWrapper';

export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';
export const GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS';

export function createSuccess(collection) {
    return {type: CREATE_SUCCESS, collection};
}

export function createFailure(error) {
    return {type: CREATE_FAILURE, error};
}

export function getCollectionsSuccess(collections) {
    return {type: GET_COLLECTIONS_SUCCESS, collections};
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

export function getCollections() {
    return async dispatch => {
        let res = await fetch.get('collections');
        res = await res.json();

        if (res.collections) {
            return dispatch(getCollectionsSuccess(res.collections));
        }
    };
}
