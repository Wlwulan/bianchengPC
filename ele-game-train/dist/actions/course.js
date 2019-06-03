'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_COURSE_DATA = exports.SET_COURSE_DATA = 'SET_COURSE_DATA';

var setCourseData = exports.setCourseData = function setCourseData(data) {
  return {
    type: SET_COURSE_DATA,
    data: data
  };
};