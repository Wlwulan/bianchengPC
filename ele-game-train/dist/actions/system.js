'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_SYSTEM_DATA = exports.SET_SYSTEM_DATA = 'SET_SYSTEM_DATA';

var setSystemData = exports.setSystemData = function setSystemData(data) {
  return {
    type: SET_SYSTEM_DATA,
    data: data
  };
};