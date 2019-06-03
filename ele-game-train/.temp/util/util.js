import Taro from '@tarojs/taro-h5';
import Nerv from "nervjs";

export function isEmptyObj(obj) {
  for (let i in obj) {
    return false;
  }
  return true;
}

export function showToast(title, icon = 'none') {
  Taro.showToast({
    icon: icon,
    title: title
  });
}

export function throttle(func, time) {
  let now = Date.now();
  let interval;
  time = time || 160;

  return function () {
    let context = this;
    let triggerTime = Date.now();
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
export function timestampFormat(timestamp, format = "standard") {
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }
  let curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
  let timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
  let curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
  let tmDate = new Date(timestamp * 1000); // 参数时间戳转换成的日期对象

  let Y = tmDate.getFullYear(),
      m = tmDate.getMonth() + 1,
      d = tmDate.getDate();
  let H = tmDate.getHours(),
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

export function paging(list, pageNum) {
  // 手动分页
  let indexLeft = 10 * (pageNum - 1),
      indexRight = 10 * pageNum;
  if (list === null) return [];
  return list.slice(indexLeft, indexRight);
}

export function isAuthorized() {
  return Taro.getSetting().then(res => {
    let isAuthorized = false;
    if (res.authSxetting['scope.userInfo'] === true) {
      isAuthorized = true;
    } else {
      isAuthorized = false;
    }
    return Promise.resolve(isAuthorized);
  }, error => {
    return Promise.reject(error);
  });
}
export function toAuthorize(source, id) {
  const params = `?source=${source}&id=${id}`;
  Taro.navigateTo({
    // url: `'/pages/authorize/authorize'`
    url: '/pages/authorize/authorize' + params
  });
}