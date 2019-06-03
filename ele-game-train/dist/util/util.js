"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyObj = isEmptyObj;
exports.showToast = showToast;
exports.throttle = throttle;
exports.timestampFormat = timestampFormat;
exports.paging = paging;
exports.isAuthorized = isAuthorized;
exports.toAuthorize = toAuthorize;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmptyObj(obj) {
  for (var i in obj) {
    return false;
  }
  return true;
}

function showToast(title) {
  var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';

  _index2.default.showToast({
    icon: icon,
    title: title
  });
}

function throttle(func, time) {
  var now = Date.now();
  var interval = void 0;
  time = time || 160;

  return function () {
    var context = this;
    var triggerTime = Date.now();
    clearTimeout(interval);

    if (triggerTime - now >= time) {
      func.apply(context, arguments);
      now = triggerTime;
    } else {
      interval = setTimeout(function () {
        func.apply(context, arguments);
      }, time);
    }
  };
}
function timestampFormat(timestamp) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "standard";

  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }
  var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
  var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
  var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
  var tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

  var Y = tmDate.getFullYear(),
      m = tmDate.getMonth() + 1,
      d = tmDate.getDate();
  var H = tmDate.getHours(),
      i = tmDate.getMinutes(),
      s = tmDate.getSeconds();

  if (format == 'standard') {
    return Y + '/' + zeroize(m) + '/' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
  } else {
    if (timestampDiff < 3600) {
      // 一小时前之内
      return Math.floor(timestampDiff / 60) + "分钟前";
    } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
      return Math.floor(timestampDiff / 60 / 60) + "小时前";
    } else {
      return Y + '/' + zeroize(m) + '/' + zeroize(d) + ' ' + zeroize(H) + ':' + zeroize(i);
    }
  }
}

function paging(list, pageNum) {
  // 手动分页
  var indexLeft = 10 * (pageNum - 1),
      indexRight = 10 * pageNum;
  if (list === null) return [];
  return list.slice(indexLeft, indexRight);
}

function isAuthorized() {
  return _index2.default.getSetting().then(function (res) {
    var isAuthorized = false;
    if (res.authSxetting['scope.userInfo'] === true) {
      isAuthorized = true;
    } else {
      isAuthorized = false;
    }
    return Promise.resolve(isAuthorized);
  }, function (error) {
    return Promise.reject(error);
  });
}
function toAuthorize(source, id) {
  var params = "?source=" + source + "&id=" + id;
  _index2.default.navigateTo({
    // url: `'/pages/authorize/authorize'`
    url: '/pages/authorize/authorize' + params
  });
}