'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getCommandList = getCommandList;
exports.getRankList = getRankList;
exports.getNewList = getNewList;
exports.getGoodList = getGoodList;

var _requestService = require('../../service/request.service.js');

function getCommandList(data) {
  var url = '/v1/littleApp/getCommandWorksList';
  return (0, _requestService.request)(url, {
    method: 'POST',
    data: data
  });
}

function getRankList(data) {
  var url = '/v1/littleApp/getWorksRankList';
  return (0, _requestService.request)(url, {
    method: 'POST',
    data: data
  });
}

function getNewList(data) {
  var url = '/v1/littleApp/getNewWorksList';
  return (0, _requestService.request)(url, {
    method: 'POST',
    data: _extends({}, data)
  });
}

function getGoodList(data) {
  var url = '/v1/littleApp/getGoodWorkersList';
  return (0, _requestService.request)(url, {
    method: 'POST',
    data: _extends({}, data)
  });
}