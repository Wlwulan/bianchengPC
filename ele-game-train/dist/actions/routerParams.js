'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_ROUTER_PARAMS = exports.SET_ROUTER_PARAMS = 'SET_ROUTER_PARAMS';

var setRouterParams = exports.setRouterParams = function setRouterParams(data) {
  return {
    type: SET_ROUTER_PARAMS,
    data: data
  };
};