import {
    SET_AUTH_DATA
} from '../actions/auth';

export default function authData(state = {}, action) {
    switch(action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}
