import { request } from '../../service/request.service';

export function getProductList() {
  const url = '/v1/phase/getGroupPhaseListByProductId';

  return request(url, {
    method: 'POST',
    data: {
      productId: 1
    }
  });
}

export function login(data) {
  const url = '/v1/wechart/getLittleAppTokenByCode';
  return request(url, {
    method: 'POST',
    data
  });
}