import {
    SET_SYSTEM_DATA
} from '../actions/system';

export default function systemData(state = {}, action) {
    switch(action.type) {
        case SET_SYSTEM_DATA:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}
