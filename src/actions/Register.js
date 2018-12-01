import fetch from '../FetchWrapper';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGGING_OUT = 'LOGGING_OUT';

export function registerSuccess(email, token) {
    return {type: REGISTER_SUCCESS, email, token};
}

export function registerFailure(error) {
    return {type: REGISTER_FAILURE, error};
}

export function logOut() {
    return dispatch => {
        return dispatch({type: LOGGING_OUT});
    };
}

export function register(email, password) {
    return async dispatch => {
        let res = await fetch.post('auth', {email, password});
        res = await res.json();

        if (res.token) {
            return dispatch(registerSuccess(email, res.token));
        } else {
            return dispatch(registerFailure(res.error));
        }
    }
}
