import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { connect } from "@tarojs/redux-h5";
import WEB_API from "../../config/url";
import { fetchUnionId, fetchUserToken, getPayInfo } from '../../service/api.service';
import { getProductList, login } from './api.service';
import './payV2.scss';
import { setAuthData } from "../../actions/auth";
import { setCourseData } from "../../actions/course";
import { setPayInfoData } from "../../actions/pay";
import { setSystemData } from "../../actions/system";

import { redirectTo, showToast, formatTime } from '../../service/utils.service';

import Guide from "./components/guide/guide";
import ModalPay from "./components/modal-pay/modalPay";
import ModalGuide from "./components/modal-guide/modalGuide";

@connect(({ authData, courseData, payInfoData, systemData }) => ({
  authData,
  courseData,
  payInfoData,
  systemData
}), dispatch => ({
  setAuthData(data) {
    dispatch(setAuthData(data));
  },
  setCourseData(data) {
    dispatch(setCourseData(data));
  },
  setPayInfoData(data) {
    dispatch(setPayInfoData(data));
  },
  setSystemData(data) {
    dispatch(setSystemData(data));
  }
}))
class PayV2 extends Component {
  config = {
    pages: ['pages/payV2/payV2']
  };

  constructor(props) {
    super(props);
    this.state = {
      isIOS: this.props.systemData.os === 'ios',
      isRegister: this.props.authData.token !== '', // 是否已注册
      isBuy: false, // 是否已购买
      isMulti: true, // 是否为多期课程
      isModalPayShow: false,
      isModalGuideShow: false,
      modalTitle: '',
      coursePeriod: '',
      courseName: '',
      courseTime: '',
      vidContext: null,
      vidContext2: null,
      vidContext3: null,
      payButtonClicked: false,
      initDataFetched: false,
      imgIndex2: false,
      adId: '', // 统计打点相关参数
      gdt_vid: '' // 统计打点相关参数
    };
  }

  // onLoad
  async componentWillMount() {
    const { token } = this.props.authData;
    if (token && token !== '') {
      await this.getPayInfo(token);
    } else {
      const { code } = await Taro.login();
      const resp = await login({ code }).catch(error => {
        console.log(error);
      });
      const { openid, unionid, token, session_key } = resp;
      this.props.setAuthData({
        openid,
        unionid,
        token,
        sessionKey: session_key
      });
      if (token && token !== '') {
        await this.getPayInfo(token);
      }
      this.setState({
        isRegister: token !== ''
      });
      this.getOS();
    }
    this.redirect(this.$router.params);
    Taro.eventCenter.on('modalCloseEvent', data => {
      this.setState({
        [data]: false
      });
    });
  }

  // onReady
  componentDidMount() {
    const vidContext = Taro.createVideoContext('intro_video');
    const vidContext2 = Taro.createVideoContext('intro_video2');
    const vidContext3 = Taro.createVideoContext('intro_video3');
    this.setState({
      vidContext,
      vidContext2,
      vidContext3
    });
  }

  // onShow
  componentDidShow() {}

  // onHide
  componentDidHide() {}

  // onUnload
  componentWillUnmount() {
    Taro.eventCenter.off('modalCloseEvent');
  }
  redirect(params) {
    const { gdt_vid, adId } = params;
    this.setState({
      gdt_vid,
      adId
    });
  }
  getOS() {
    const { system } = Taro.getSystemInfoSync();
    const regexp = /android/i;
    this.props.setSystemData({
      os: regexp.test(system) ? 'android' : 'ios'
    });
    this.setState({
      isIOS: this.props.systemData.os === 'ios'
    });
  }
  getUserInfoSetting() {
    Taro.getSetting().then(resp => {
      const userInfoSetting = resp.authSetting['scope.userInfo'];
      this.setState({
        isRegister: userInfoSetting ? true : false
      });
    });
  }

  toPay() {
    const { isMulti, vidContext, vidContext2, vidContext3 } = this.state;
    const { gdt_vid, adId } = this.$router.params;
    if (isMulti) redirectTo('payChoice', `gdt_vid=${gdt_vid}&adId=${adId}`);else {
      this.setState({ isModalPayShow: true });
      vidContext.pause();
      vidContext2.pause();
      vidContext3.pause();
    }
  }

  async getProductList() {
    const { IsMultiPhase, PhaseGroupList } = await getProductList();
    this.setState({
      isMulti: IsMultiPhase
    });
    this.props.setCourseData(PhaseGroupList);
    const phraseData = PhaseGroupList[0].PhaseList[0];
    this.setState({
      coursePeriod: PhaseGroupList[0].GroupName,
      courseName: phraseData.Phasename,
      courseTime: formatTime(phraseData.Starttime)
    });
  }

  async getPayInfo(token) {
    const resp = await getPayInfo({ token });
    if (resp) {
      this.props.setPayInfoData(resp);
      this.setState({ isBuy: true });
    }
    await this.getProductList();
    this.setState({ initDataFetched: true });
  }

  async handleGetUserInfo(e) {
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
    this.setState({
      isRegister: true
    });

    await this.getPayInfo(token);
    if (this.state.payButtonClicked) {
      this.setState({ payButtonClicked: false });
      this.toPay();
    }
  }

  handleConsultButtonClick() {
    this.setState({
      isModalGuideShow: true,
      modalTitle: '咨询老师'
    });
    this.state.vidContext.pause();
    this.state.vidContext2.pause();
    this.state.vidContext3.pause();
  }

  handlePayButtonClick() {
    const { isIOS, isRegister, isBuy, vidContext, vidContext2, vidContext3, initDataFetched } = this.state;
    if (isRegister && !initDataFetched) {
      showToast('数据初始化中，请稍后...');
      return;
    }
    if (isBuy) redirectTo('paySuccess');else if (isIOS) {
      this.setState({
        isModalGuideShow: true,
        modalTitle: '立即报名'
      });
      vidContext.pause();
      vidContext2.pause();
      vidContext3.pause();
    } else {
      if (isRegister) this.toPay();else this.setState({ payButtonClicked: true });
    }
  }

  handlChangeImgIndex2(index) {
    console.log(index);
    if (index === 1) {
      this.setState({
        imgIndex2: !this.state.imgIndex2
      });
    }
  }
  render() {
    const {
      isIOS,
      isRegister,
      isBuy,
      isMulti,
      isModalPayShow,
      isModalGuideShow,
      modalTitle,
      courseName,
      courseTime,
      gdt_vid,
      adId,
      imgIndex2
    } = this.state;

    const introImgList = [...Array(12).keys()].map(index => {
      return <View key={index} onClick={this.handlChangeImgIndex2.bind(this, index)} className={index === 0 ? 'intro-course-info' : index === 3 || index === 7 || index === 8 ? 'intro-video' : ''}>
                    {index === 100 && <View className="course-info">
                        {isMulti && <Text className="course-info--title">{coursePeriod}开放报名，多期可选</Text>}
                        {!isMulti && <View className="course-info-wrapper">
                                <Text className="course-info--name">{courseName}</Text>
                                <Text className="course-info--time">{courseTime}开课</Text>
                            </View>}
                        <Text className="course-info--description">作业盒子旗下编程课</Text>
                    </View>}
                    {index === 2 && <Image className="intro-image" src={WEB_API.buyImageUrl + '13.png'} style={{ display: imgIndex2 ? 'block' : 'none' }} mode="widthFix" />}
                    {index === 3 && <Video id="intro_video" src={WEB_API.buyVideoUrl + 'course_video_01.mp4'}></Video>}
                    {index === 7 && <View>
                        <Video id="intro_video2" src={WEB_API.buyVideoUrl + 'course_video_02.mp4'}></Video>
                        <Video id="intro_video3" src={WEB_API.buyVideoUrl + 'course_video_03.mp4'}></Video>
                    </View>}
                    {index === 8 && <View className="gifimage-wrapper">
                        <Image className="intro-image-gif" src={WEB_API.buyVideoUrl + 'program.gif'} mode="widthFix" />
                        <Image className="intro-image-gif intro-image-gif1" src={WEB_API.buyVideoUrl + 'code.gif'} mode="widthFix" />
                    </View>}
                    <Image className="intro-image" src={WEB_API.buyImageUrl + (index + 1 > 9 ? '' : '0') + (index + 1) + '.png'} mode="widthFix" />
                </View>;
    });

    return <View className="wrapper">
                {isModalPayShow && <ModalPay gdt_vid={gdt_vid} adId={adId}></ModalPay>}
                {isModalGuideShow && <ModalGuide title={modalTitle}></ModalGuide>}
                <View className="content-wrapper">
                    {introImgList}
                    <Guide classname="guide-wrapper--page"></Guide>
                </View>
                <View className="bottom-bar">
                    {!isBuy && <View className="btn-consult" onClick={this.handleConsultButtonClick}>咨询</View>}
                    <Button className={isBuy ? 'btn-pay' : 'btn-pay btn-pay--short'} openType={isRegister || isIOS ? '' : 'getUserInfo'} onGetUserInfo={this.handleGetUserInfo} onClick={this.handlePayButtonClick}>
                        {!isBuy && !isIOS && <View>¥<Text>98</Text>/5次课 <Text>立即报名</Text></View>}
                        {!isBuy && isIOS && <View><Text>立即报名</Text></View>}
                        {isBuy && <Text>查看我的报名信息</Text>}
                    </Button>
                </View>
            </View>;
  }
}