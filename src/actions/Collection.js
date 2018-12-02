import fetch from '../FetchWrapper';

export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';

export function createSuccess(collection) {
    return {type: CREATE_SUCCESS, collection};
}

export function createFailure(error) {
    return {type: CREATE_FAILURE, error};
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
    }
}
