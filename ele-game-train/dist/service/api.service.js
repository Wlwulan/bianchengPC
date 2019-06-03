'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fetchUnionId = fetchUnionId;
exports.fetchUserToken = fetchUserToken;
exports.getPayInfo = getPayInfo;
exports.doPay = doPay;
exports.advertBack = advertBack;

var _requestService = require('./request.service.js');

function fetchUnionId(data) {
  var url = '/v1/student/getUnionIdByLittleAppEncryptData';
  return (0, _requestService.request)(url, {
    method: 'POST',
    data: data
  });
}

function fetchUserToken(data) {
  var url = '/v1/student/getTokenByLittleAppInfo';
  return (0, _requestService.request)(url, {
    method: 'POST',
    data: data
  });
}

function getPayInfo(data) {
  var url = '/v1/student/getStudentBuyInfo';

  return (0, _requestService.request)(url, {
    method: 'POST',
    data: _extends({}, data, {
      productId: 1
    })
  });
}

function doPay(data) {
  var url = '/v1/wechart/wxUnifiedOrder';

  return (0, _requestService.request)(url, {
    method: 'POST',
    data: _extends({
      productId: 1,
      inviteStudentId: 0,
      source: 'littleApp'
    }, data)
  });
}
// 微信广告数据回传
function advertBack(data) {
  var url = '/v1/advertPut/advertBackUrl';

  return (0, _requestService.request)(url, {
    method: 'POST',
    data: {
      orderId: data.orderId,
      orderType: 1,
      adId: data.adId,
      clickId: data.clickId,
      actionType: 'COMPLETE_ORDER',
      amount: '98'
    }
  });
}