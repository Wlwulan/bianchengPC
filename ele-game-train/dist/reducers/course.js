"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = courseData;

var _course = require("../actions/course.js");

function courseData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _course.SET_COURSE_DATA:
      return action.data;
    default:
      return state;
  }
}