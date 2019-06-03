import {
    SET_COURSE_DATA
} from '../actions/course';

export default function courseData(state = {}, action) {
    switch(action.type) {
        case SET_COURSE_DATA:
            return action.data;
        default:
            return state;
    }
}
