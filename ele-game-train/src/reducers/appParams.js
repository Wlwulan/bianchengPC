import {
    SET_APP_PARAMS
} from '../actions/appParams';

export default function appParams(state = {}, action) {
    switch(action.type) {
        case SET_APP_PARAMS:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}
