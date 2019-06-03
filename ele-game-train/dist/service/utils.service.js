'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redirectTo = redirectTo;
exports.navigateTo = navigateTo;
exports.switchTab = switchTab;
exports.showToast = showToast;
exports.formatTime = formatTime;
exports.qs = qs;

var _index = require('../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function redirectTo(url) {
  var qs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  _index2.default.redirectTo({
    url: '/pages/' + url + '/' + url + '?' + qs
  });
}
function navigateTo(url) {
  var qs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  _index2.default.navigateTo({
    url: '/pages/' + url + '/' + url + '?' + qs
  });
}
function switchTab(url) {
  _index2.default.switchTab({
    url: '/pages/' + url + '/' + url
  });
}

function showToast(title) {
  _index2.default.showToast({
    title: title,
    icon: 'none'
  });
}

function formatTime(time) {
  time = time.split(' ')[0].split('-');
  return time[1] + '\u6708' + time[2] + '\u65E5';
}

function qs(query) {
  var qs = '';
  for (var i in query) {
    qs += i + '=' + query[i] + '&';
  }
  console.log('query', qs);
  return qs;
}