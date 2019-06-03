import Taro from '@tarojs/taro-h5';
import Nerv from "nervjs";
import WEB_API from "../../config/url";
export function getGoodWorkersList() {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/littleApp/getGoodWorkersList',
    // data: { pageNum: pageNum },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
export function getWorksRankList() {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/littleApp/getWorksRankList',
    // data: { pageNum: pageNum },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
export function getCommandWorksList() {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/littleApp/getCommandWorksList',
    // data: { pageNum: pageNum },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
export function getNewWorksList() {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/littleApp/getNewWorksList',
    // data: { pageNum: pageNum },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}