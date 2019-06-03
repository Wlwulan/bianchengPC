'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_PRODUCT_INFO = exports.SET_PRODUCT_INFO = 'SET_PRODUCT_INFO';

var setProductInfo = exports.setProductInfo = function setProductInfo(data) {
  return {
    type: SET_PRODUCT_INFO,
    data: data
  };
};