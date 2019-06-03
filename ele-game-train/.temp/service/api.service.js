import { request } from './request.service';

export function fetchUnionId(data) {
  const url = '/v1/student/getUnionIdByLittleAppEncryptData';
  return request(url, {
    method: 'POST',
    data
  });
}

export function fetchUserToken(data) {
  const url = '/v1/student/getTokenByLittleAppInfo';
  return request(url, {
    method: 'POST',
    data
  });
}

export function getPayInfo(data) {
  const url = '/v1/student/getStudentBuyInfo';

  return request(url, {
    method: 'POST',
    data: {
      ...data,
      productId: 1
    }
  });
}

export function doPay(data) {
  const url = '/v1/wechart/wxUnifiedOrder';

  return request(url, {
    method: 'POST',
    data: {
      productId: 1,
      inviteStudentId: 0,
      source: 'littleApp',
      ...data
    }
  });
}
// 微信广告数据回传
export function advertBack(data) {
  const url = '/v1/advertPut/advertBackUrl';

  return request(url, {
    method: 'POST',
    data: {
      orderId: data.orderId,
      orderType: 1,
      adId: data.adId,
      clickId: data.clickId,
      actionType: 'COMPLETE_ORDER',
      amount: '98'
    }
  });
}