import fetch from '../FetchWrapper';

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export function searchSuccess(restaurants) {
    return {type: SEARCH_SUCCESS, restaurants};
}

export function searchFailure(error) {
    return {type: SEARCH_FAILURE, error};
}

export function search(dateTime) {
    return async dispatch => {
        let res = await fetch.get('restaurants', {dateTime});
        res = await res.json();

        if (res.restaurants) {
            return dispatch(searchSuccess(res.restaurants));
        } else {
            return dispatch(searchFailure(res.error));
        }
    }
}
