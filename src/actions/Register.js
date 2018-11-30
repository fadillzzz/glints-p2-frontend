import fetch from '../FetchWrapper';

export const REGISTERING = 'REGISTERING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function registering(email, password) {
    return {type: 'REGISTERING', email, password};
}

export function register(email, password) {
    return dispatch => {
        dispatch(registering(email, password));

        fetch.post('users', {email, password}).then(
            () => {}, e => {
            console.log(e);
        });
    }
}
