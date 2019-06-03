import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Image, Text, Video } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import { toAuthorize } from "../../util/util";
import LeftRigtDisplay from "../LeftRigtDisplay/LeftRigtDisplay";
import LeftPart from "../LeftPart/LeftPart";
import RightPart from "../RightPart/RightPart";

import { setPlayVideoIndex, setShowPopup } from "../../actions/globalData";

import './RecommendedLogos.scss';

@connect(({ globalData }) => ({
  globalData
}), dispatch => ({
  setPlayVideoIndex(playVideoIndex) {
    dispatch(setPlayVideoIndex(playVideoIndex));
  },
  setShowPopup(value) {
    dispatch(setShowPopup(value));
  }
}))
class RecommendedLogos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      direction: 90
    };
  }

  static defaultProps = {
    likeNum: 0
  };
  componentWillMount() {
    this.setDirection();
  }
  componentDidMount() {
    if (this.props.curNumber === this.props.globalData.playVideoIndex) {
      Taro.createVideoContext('video' + this.props.curNumber, this.$scope).play();
      this.setState({
        isPlay: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps) {
    // if (this.state.isPlay || this.props.curNumber === nextProps.globalData.playVideoIndex) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  bindPlay() {}
  bindEnded() {
    this.props.setPlayVideoIndex(-1);
    this.props.setShowPopup(true);
  }
  toAuthorize(source, id) {
    toAuthorize(source, id);
  }

  playCurrVideo(e) {
    wx.reportAnalytics('video_click', {});
    if (this.props.curNumber !== this.props.globalData.playVideoIndex) {
      this.props.setPlayVideoIndex(this.props.curNumber);
    }
  }
  fullscreen(e) {
    console.log('quanping', e);
    if (e.detail.fullScreen) {
      this.props.setShowPopup(false);
    } else {
      this.props.setShowPopup(true);
    }
  }
  setDirection() {
    const { system } = Taro.getSystemInfoSync();
    const regexp = /android/i;
    this.setState({
      direction: regexp.test(system) ? 0 : 90
    }, () => {
      console.log('direction', this.state.direction);
    });
  }
  render() {
    const { userInfo, videoSrc, likeNum, title, curNumber, poster, workerId, globalData } = this.props;
    const { playVideoIndex } = globalData;
    const { direction } = this.state;

    return <View className="RecommendedLogo">
        <View className="user-name" onClick={this.toAuthorize.bind(this, 'allworks', userInfo.studentId)}>
          <LeftRigtDisplay renderLeft={<LeftPart>
                <View className="img-warp">
                  {userInfo.isPurchase === 1 && <Image className="title-frame" mode="widthFix" src="https://appd.knowbox.cn/ss/miniapp/ele_game_register/title-frame.png">
                    </Image>}
                  <Image className="avatar" mode="widthFix" src={userInfo.src}></Image>
                </View>
              </LeftPart>} renderRight={<RightPart paddingLeft={21}>
                <View className="text-middle">
                  <Text className="name">{userInfo.name}</Text>
                  <Text className="level">Lv.{userInfo.level}</Text>
                </View>
              </RightPart>}>
          </LeftRigtDisplay>
        </View>
        <View>
          {playVideoIndex !== curNumber ? <View className="video-mask">
                <Image style="width: 750rpx;height: 563rpx;" src={poster}></Image>
                <View className="mask">
                  <View className="play-btn"
            // data-clickid={curNumber}
            onClick={this.playCurrVideo.bind(this)}></View>
                </View>
              </View> : <Video id={'video' + curNumber} style="width: 750rpx;height: 563rpx;"
        // objectFit="fill"
        src={videoSrc} controls={true} show-center-play-btn={false} autoplay={true} onPlay={this.bindPlay} onEnded={this.bindEnded} direction={direction} onFullscreenchange={this.fullscreen}
        // poster={poster}
        // initial-time={1}
        custom-cache={false}></Video>}

        </View>
        <View className="footer" onClick={this.toAuthorize.bind(this, 'index', workerId)}>
          <View className="like">
            <LeftRigtDisplay renderLeft={<LeftPart>
                  <Image style="width: 38rpx;height:38rpx;" mode="widthFix" src="https://appd.knowbox.cn/ss/miniapp/ele_game_register/like_red.png"></Image>
                </LeftPart>} renderRight={<RightPart paddingLeft={15}>
                  <View className="text-middle">
                    <Text className="number">{likeNum}</Text>
                  </View>
                </RightPart>}>
            </LeftRigtDisplay>
          </View>
          <View className="title">
            <Text>{title}</Text>
          </View>
        </View>
      </View>;
  }
}