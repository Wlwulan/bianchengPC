import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { Canvas, Image, View } from '@tarojs/components';
import imgUrl from '../../static/images/popup_bg.gif';
import './popupwindow.scss';
import { connect } from "@tarojs/redux-h5";

@connect(({ globalData }) => ({
  globalData
}), dispatch => ({}))
class popupwindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ratio: 0
    };
  }

  componentWillMount() {
    this.uniformScale();
  }
  componentWillReceiveProps(nextProps) {

    setTimeout(() => {
      // console.log('popupReceiveProps',);
      this.uniformScale();
    }, 200);
  }
  toPay() {
    wx.reportAnalytics('topay_click', {});
    Taro.navigateTo({
      url: '/pages/payV2/payV2'
    });
  }
  uniformScale() {
    Taro.getSystemInfo().then(res => {
      // console.log(res)
      this.setState({ ratio: res.screenWidth / 375 }, () => {
        this.drawImg();
      });
    });
  }
  drawImg() {
    const ctx = Taro.createCanvasContext('canvas', this.$scope);
    ctx.drawImage(imgUrl, 0, 0, 90 * this.state.ratio, 75.5 * this.state.ratio);
    ctx.draw();
  }
  render() {
    // console.log('popupReceivePropsrender',);
    return <View className="popup">
        {!this.props.isCanvas ? <Image src={imgUrl} onClick={this.toPay}></Image> : <Canvas onClick={this.toPay} style="width: 180rpx;height: 151rpx;" canvasId="canvas" className="canvas" />}
      </View>;
  }
}