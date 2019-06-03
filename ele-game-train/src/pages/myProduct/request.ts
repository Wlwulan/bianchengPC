import {request} from '../../service/request.service';
import { connect } from '@tarojs/redux'

@connect(({ authData, courseData, payInfoData }) => ({
  authData,
}), (dispatch) => ({
  setAuthData(data) {
    dispatch(setAuthData(data));
  },
}))
export function getMyProductList() {
    const url = '/v1/littleApp/getUserWorksList';

    return request(url, {
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            token:this.props.authData.token,
            workType: 2
        }
    });
}