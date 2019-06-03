import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";

import { setPlayVideoIndex } from "../../actions/globalData";
import { throttle } from "../../util/util";
import RecommendedLogo from "../RecommendedLogo/RecommendedLogo";
import './RecommendedLogos.scss';

@connect(({ globalData }) => ({
  globalData
}), dispatch => ({
  setPlayVideoIndex(videoBg) {
    dispatch(setPlayVideoIndex(videoBg));
  }
}))
class RecommendedLogos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      getMoreTxt: ''
    };
  }
  static defaultProps = {
    commandList: []
  };
  componentWillMount() {
    wx.reportAnalytics('recommendedlogos_onload', {});
  }
  componentDidMount() {
    Taro.eventCenter.on('selevtScrollVideo', throttle(this.playScrollVideo.bind(this), 100));
    this.props.setPlayVideoIndex(-1);
  }
  componentWillReceiveProps(nextProps) {}
  componentWillUnmount() {}
  playScrollVideo() {
    const query = Taro.createSelectorQuery().in(this.$scope);
    query.selectAll('.recommendedLogo').boundingClientRect();
    query.exec(res => {
      for (let i = 0, len = res[0].length; i < len; i++) {
        if (res[0][i].top >= 0 && res[0][i].top <= 200 && this.props.globalData.playVideoIndex !== i + 1) {
          this.props.setPlayVideoIndex(i + 1);
          break;
        }
      }
    });
  }

  render() {
    const { commandList } = this.props;
    const videos = commandList.map((el, i) => {
      return <View className="recommendedLogo" key={i}>
              <RecommendedLogo userInfo={{
          src: el['Studentinfo']['headPhoto'],
          name: el['Studentinfo']['studentName'],
          level: el['Studentinfo']['abilityLevel'],
          isPurchase: el['Studentinfo']['isPurchase'],
          studentId: el['Studentinfo']['studentId']
        }} poster={el['Suggestworksinfo']['coverImg']} videoSrc={el['Suggestworksinfo']['videoUrl']} likeNum={el['Suggestworksinfo']['priceCount']} title={el['Suggestworksinfo']['worksName']} curNumber={i + 1} workerId={el['Suggestworksinfo']['worksId']}>
              </RecommendedLogo>
            </View>;
    });
    return <View>
            <View className="index">
                {videos}
            </View>
            <View className="getMore">{this.state.getMoreTxt}</View>
        </View>;
  }
}