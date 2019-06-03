"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("../npm/redux/lib/redux.js");

var _globalData = require("./globalData.js");

var _globalData2 = _interopRequireDefault(_globalData);

var _system = require("./system.js");

var _system2 = _interopRequireDefault(_system);

var _auth = require("./auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _course = require("./course.js");

var _course2 = _interopRequireDefault(_course);

var _pay = require("./pay.js");

var _pay2 = _interopRequireDefault(_pay);

var _productInfo = require("./productInfo.js");

var _productInfo2 = _interopRequireDefault(_productInfo);

var _appParams = require("./appParams.js");

var _appParams2 = _interopRequireDefault(_appParams);

var _routerParams = require("./routerParams.js");

var _routerParams2 = _interopRequireDefault(_routerParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  globalData: _globalData2.default,
  systemData: _system2.default,
  authData: _auth2.default,
  courseData: _course2.default,
  payInfoData: _pay2.default,
  productInfo: _productInfo2.default,
  appParams: _appParams2.default,
  routerParams: _routerParams2.default
});