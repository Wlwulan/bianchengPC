'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_AUTH_DATA = exports.SET_AUTH_DATA = 'SET_AUTH_DATA';

var setAuthData = exports.setAuthData = function setAuthData(data) {
  return {
    type: SET_AUTH_DATA,
    data: data
  };
};