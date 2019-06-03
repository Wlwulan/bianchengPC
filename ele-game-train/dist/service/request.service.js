"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.request = request;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _url = require("../config/url.js");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RESPONSE_OK = 99999;

function request(url, config) {
  return _index2.default.request(_extends({
    url: "" + _url2.default.baseUrl + url,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, config)).then(function (resp) {
    var _resp$data = resp.data,
        code = _resp$data.code,
        data = _resp$data.data,
        msg = _resp$data.msg,
        orderId = _resp$data.orderId;

    if (url === '/v1/wechart/wxUnifiedOrder') {
      data.orderId = orderId;
    }
    if (code === RESPONSE_OK) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(msg);
    }
  }, function (error) {
    return Promise.reject(error);
  });
}