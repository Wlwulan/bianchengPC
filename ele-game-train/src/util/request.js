import Taro from '@tarojs/taro'
import WEB_API from '../config/url';

export function getUnionid (encryptedData, iv, session_key) {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/student/getUnionIdByLittleAppEncryptData',
    data: { 
      encryptedData: encryptedData, 
      iv: iv, 
      sessionKey: session_key, 
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  })
}

export function getToken (unionid, openid, userInfo) {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/student/getTokenByLittleAppInfo',
    data: { 
      unionid: unionid, 
      openid: openid, 
      headPhoto: userInfo.avatarUrl, 
      nickName: userInfo.nickName, 
      province: userInfo.province, 
      city: userInfo.city, 
      country: userInfo.country, 
      sex: userInfo.gender, //性别 0：未知、1：男、2：女
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  })
}

export function getBuyInfo (token) {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/student/getStudentBuyInfo',
    data: { 
      token: token, 
      productId: 1, 
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  })
}

export function  getPaySign (phaseid, token, openid, phoneNumber) {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/wechart/wxUnifiedOrder',
    data: { 
      productId: 1,
      phaseId: parseInt(phaseid),
      token: token,
      openId: openid,
      mobile: phoneNumber,
      inviteStudentId: 0,
      source: 'studentApp'
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  })
}

export function pay (data) {
  return Taro.requestPayment({
    timeStamp: data.timeStamp,
    nonceStr: data.nonceStr,
    package: data.package,
    signType: data.signType,
    paySign: data.paySign,
  })
}

export function request(func) {
  return function() {
    if (process.env.NODE_ENV === 'development') {
      console.log( func.name , ' request ', ...arguments)
    }
    return func(...arguments)
  };
}
export function getLittleAppTokenByCode (res) {
  return Taro.request({
    method: 'POST',
    url: WEB_API.baseUrl + '/v1/wechart/getLittleAppTokenByCode',
    data: { code: res.code },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  })
}