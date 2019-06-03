import Taro from '@tarojs/taro-h5';
import Nerv from "nervjs";
import WEB_API from "../config/url";

const RESPONSE_OK = 99999;

export function request(url, config) {
  return Taro.request({
    url: `${WEB_API.baseUrl}${url}`,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    ...config
  }).then(resp => {
    const { code, data, msg, orderId } = resp.data;
    if (url === '/v1/wechart/wxUnifiedOrder') {
      data.orderId = orderId;
    }
    if (code === RESPONSE_OK) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(msg);
    }
  }, error => {
    return Promise.reject(error);
  });
}