import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import {
    setAuthData
} from '../../actions/auth';
import {
    setSystemData
} from '../../actions/system';

import {
    login
} from './api.service';
import {
    navigateTo,
    redirectTo,
    switchTab,
    qs
} from '../../service/utils.service';

@connect(({ authData }) => ({
    authData
}), (dispatch) => ({
    setAuthData(data) {
        dispatch(setAuthData(data));
    },
    setSystemData(data) {
        dispatch(setSystemData(data));
    }
}))

class Index extends Component {
    config = {
        pages: [
            'pages/index/index'
        ]
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    // onLoad
    async componentWillMount() {

        console.log(this.$router.params, 'xxxxxxxxxxxxxxxx');

        const {code} = await Taro.login();
        const resp = await login({code}).catch(error => {
            console.log(error);
        });
        const {openid, unionid, token, session_key} = resp;
        this.props.setAuthData({
            openid,
            unionid,
            token,
            sessionKey: session_key
        });
        this.getOS();
        this.redirect(this.$router.params);
    }

    // onReady
    componentDidMount() { }

    // onShow
    componentDidShow() { }

    // onHide
    componentDidHide() { }

    // onUnload
    componentWillUnmount() { }

    getOS() {
        const {system} = Taro.getSystemInfoSync();
        const regexp = /android/i;
        this.props.setSystemData({
            os: regexp.test(system) ? 'android' : 'ios',
        });
    }

    redirect(params) {
        const {to} = params;
        if(to === 'pay') redirectTo('payV2');
        else switchTab('works');
    }

    render() {
        return (<View></View>);
    }
}
