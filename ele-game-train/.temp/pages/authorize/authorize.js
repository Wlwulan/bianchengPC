import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Image, Text, Button, PullDownRefresh } from '@tarojs/components';
import './authorize.scss';
import { connect } from "@tarojs/redux-h5";
import { fetchUnionId, fetchUserToken } from '../../service/api.service';
import { setAuthData } from "../../actions/auth";

@connect(({ authData, courseData, payInfoData }) => ({
  authData
}), dispatch => ({
  setAuthData(data) {
    dispatch(setAuthData(data));
  }
}))
class authorize extends Component {
  config = {
    navigationBarTitleText: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      isRegister: this.props.authData.token && this.props.authData.token !== '' // 是否已注册
    };
  }
  componentWillMount() {
    console.log('authData', this.props.authData, this.state.isRegister);
    this.state.isRegister && this.toWebview();
  }

  async handleGetUserInfo(e) {
    if (!e.detail.userInfo) {
      Taro.navigateBack(-1);
      return;
    }
    const { encryptedData, iv, userInfo } = e.detail;
    let { unionid, openid, sessionKey } = this.props.authData;
    if (unionid === '') {
      unionid = await fetchUnionId({ encryptedData, iv, sessionKey });
      this.props.setAuthData({ unionid });
    }
    const { avatarUrl, gender, language, ...rest } = userInfo;
    const token = await fetchUserToken({
      unionid,
      openid,
      headPhoto: avatarUrl,
      sex: gender,
      ...rest
    });
    this.props.setAuthData({ token });
    this.setState({ isRegister: true }, () => {
      this.toWebview();
    });
  }
  toWebview() {
    const { source, id, authorid } = this.$router.params;
    let authorId = authorid ? '&authorid=' + authorid : '';
    Taro.redirectTo({
      url: `/pages/webView/webView?pageName=${source}&id=${id}` + authorId
    });
  }
  render() {
    const { isRegister } = this.state;
    return !isRegister && <View className="authorize-warp">
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
                    <Button className="authorize-btn" openType="getUserInfo" onGetUserInfo={this.handleGetUserInfo}>授权微信用户信息</Button>
                    {/* <View className="agree">
                        <View className="agree-icon"></View>
                        <View className="agree-txt">我已认真阅读，理解并同意《用户协议及隐私政策》</View>
                     </View> */}
                </View>
            </View>;
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

}