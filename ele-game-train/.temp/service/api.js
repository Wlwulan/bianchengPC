import Taro from '@tarojs/taro-h5';
import Nerv from "nervjs";
import WEB_API from "../config/url";
const token = '';

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params;
    // let token = getApp().globalData.token
    // if (!token) login()
    console.log('params', params);
    let contentType = 'application/x-www-form-urlencoded';
    contentType = params.contentType || contentType;
    const option = {
      url: WEB_API.baseUrl + url,
      data: data,
      method: method,
      header: { 'content-type': contentType, 'token': token },
      success(res) {
        return res.data;
      },
      error(e) {
        console.log('api', '请求接口出现问题', e);
      }
    };
    return Taro.request(option);
  },
  get(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option);
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, 'POST');
  }
};