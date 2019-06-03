import { request } from '../../service/request.service';

export function getCommandList(data) {
  const url = '/v1/littleApp/getCommandWorksList';
  return request(url, {
    method: 'POST',
    data
  });
}

export function getRankList(data) {
  const url = '/v1/littleApp/getWorksRankList';
  return request(url, {
    method: 'POST',
    data
  });
}

export function getNewList(data) {
  const url = '/v1/littleApp/getNewWorksList';
  return request(url, {
    method: 'POST',
    data: {
      ...data
    }
  });
}

export function getGoodList(data) {
  const url = '/v1/littleApp/getGoodWorkersList';
  return request(url, {
    method: 'POST',
    data: {
      ...data
    }
  });
}