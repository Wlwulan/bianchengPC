import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View ,Image,Text, Button} from '@tarojs/components';
import './authorize.scss'
import { connect } from '@tarojs/redux';
import {
    fetchUnionId,
    fetchUserToken
} from '../../service/api.service';
import { setAuthData } from '../../actions/auth';
@connect(({ authData, courseData, payInfoData }) => ({
    authData,
}), (dispatch) => ({
    setAuthData (data) {
        dispatch(setAuthData(data));
    },
}))
class authorize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegister: this.props.authData && this.props.authData.token !== '',    // 是否已注册
        }
    }
    // onGetUserInfo = (e) => {
    //     console.log(e);
    //     console.log(this.props)
    //     if(e.detail.userInfo){
    //         this.props.onAuthorize();
    //     }
    // }
    componentDidShow() {
        wx.reportAnalytics('authorize_onload', {
        });
    }
    async onGetUserInfo(e) {
        wx.reportAnalytics('authorize_btn_click', {
        });
        if(!e.detail.userInfo){
            return;
        }
        const {encryptedData, iv, userInfo} = e.detail;
        let {unionid, openid, sessionKey} = this.props.authData;
        if(unionid === '') {
            unionid = await fetchUnionId({encryptedData, iv, sessionKey});
            this.props.setAuthData({unionid});
        }
        const {avatarUrl, gender, language, ...rest} = userInfo;
        const token = await fetchUserToken({
            unionid,
            openid,
            headPhoto: avatarUrl,
            sex: gender,
            ...rest
        });
        this.props.setAuthData({token});
        this.setState({isRegister: true},()=>{
            this.props.onAuthorize();
        });
        
    }
    render (){       
        const isShow = this.props.isShow
        return (
            isShow && <View  className="authorize-warp">
                <View className="authorize">
                    <View className="title">小象编程训练营</View>
                    <View className="ctn-warp">
                        <View className="ctn-warp-img">
                            <Image src="https://appd.knowbox.cn/ss/miniapp/ele_game_register/personal/medal_icon.png"></Image>
                        </View>
                        <View className="ctn-warp-txt">
                            <Text>编程能力等级</Text>
                            <Text>记录你成长中的点点滴滴</Text>
                        </View>
                    </View>
                    <View className="ctn-warp">
                        <View className="ctn-warp-img">
                            <Image src="https://appd.knowbox.cn/ss/miniapp/ele_game_register/personal/manage_icon.png"></Image>
                        </View>
                        <View className="ctn-warp-txt">
                            <Text>管理自己的作品</Text>
                            <Text>回顾自己的每一次创意</Text>
                        </View>
                    </View>
                    <Button 
                        className="authorize-btn"
                        openType="getUserInfo"
                        onGetUserInfo={this.onGetUserInfo}
                        >授权微信用户信息</Button>
                    {/* <View className="agree">
                        <View className="agree-icon"></View>
                        <View className="agree-txt">我已认真阅读，理解并同意《用户协议及隐私政策》</View>
                    </View> */}
                </View>
            </View>
        )
    }
}