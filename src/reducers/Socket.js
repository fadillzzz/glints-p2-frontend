import {SET_SOCKET} from '../actions/Socket';

const initialState = {
    socket: null
};

export default function socket(state = initialState, action) {
    switch (action.type) {
        case SET_SOCKET:
            return {socket: action.socket};
        default:
            return state;
    }
}
