"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = payInfoData;

var _pay = require("../actions/pay.js");

function payInfoData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _pay.SET_PAY_INFO_DATA:
      return action.data;
    default:
      return state;
  }
}