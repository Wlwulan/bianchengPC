'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductList = getProductList;
exports.login = login;

var _requestService = require('../../service/request.service.js');

function getProductList() {
  var url = '/v1/phase/getGroupPhaseListByProductId';

  return (0, _requestService.request)(url, {
    method: 'POST',
    data: {
      productId: 1
    }
  });
}

function login(data) {
  var url = '/v1/wechart/getLittleAppTokenByCode';
  return (0, _requestService.request)(url, {
    method: 'POST',
    data: data
  });
}