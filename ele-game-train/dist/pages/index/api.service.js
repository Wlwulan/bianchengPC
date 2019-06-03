'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

var _requestService = require('../../service/request.service.js');

function login(data) {
  var url = '/v1/wechart/getLittleAppTokenByCode';
  return (0, _requestService.request)(url, {
    method: 'POST',
    data: data
  });
}