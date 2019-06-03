import {
    SET_PAY_INFO_DATA
} from '../actions/pay';

export default function payInfoData(state = {}, action) {
    switch(action.type) {
        case SET_PAY_INFO_DATA:
            return action.data;
        default:
            return state;
    }
}
