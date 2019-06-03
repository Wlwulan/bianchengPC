'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_PAY_INFO_DATA = exports.SET_PAY_INFO_DATA = 'SET_PAY_INFO_DATA';

var setPayInfoData = exports.setPayInfoData = function setPayInfoData(data) {
  return {
    type: SET_PAY_INFO_DATA,
    data: data
  };
};