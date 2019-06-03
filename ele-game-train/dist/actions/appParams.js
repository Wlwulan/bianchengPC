'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_APP_PARAMS = exports.SET_APP_PARAMS = 'SET_APP_PARAMS';

var setAppParams = exports.setAppParams = function setAppParams(data) {
  return {
    type: SET_APP_PARAMS,
    data: data
  };
};