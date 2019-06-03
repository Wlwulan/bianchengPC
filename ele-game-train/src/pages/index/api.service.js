import {request} from '../../service/request.service';

export function login(data) {
    const url = '/v1/wechart/getLittleAppTokenByCode';
    return request(url, {
        method: 'POST',
        data
    });
}
