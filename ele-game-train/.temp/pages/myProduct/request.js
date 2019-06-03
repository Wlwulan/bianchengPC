import { request } from '../../service/request.service';
export function getMyProductList() {
  const url = '/v1/littleApp/getUserWorksList';
  return request(url, {
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      token: this.props.authData.token,
      workType: 2
    }
  });
}