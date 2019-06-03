import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";

import { View, Text } from '@tarojs/components';

import HotWork from "../HotWork/HotWork";
import { timestampFormat } from "../../util/util";
import './HotWorks.scss';
class HotWorks extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  componentWillMount() {
    wx.reportAnalytics('hotworks_onload', {});
  }
  componentWillReceiveProps(nextProps) {}
  componentWillUnmount() {}
  render() {
    const { rankList } = this.props;
    const videos = rankList && rankList.map((el, i) => {
      return <View className="hot-work" key={i}>
				<HotWork userInfo={{
          src: el['headPhoto'],
          name: el['authorName'],
          level: el['abilityLevel'],
          studentId: el['studentId']
        }} workImage={el['workImage']} likeNum={el['praiseCount']} time={timestampFormat(el['createDate'])} title={el['workName']} workerId={el['workId']}>
					<Text className={`ranking ${'active-' + i}`}>No.{i + 1}</Text>
				</HotWork>
			</View>;
    });
    return <View>
				<View className="index">
					{videos}
				</View>
			</View>;
  }
}

// export default HotWorks as ComponentClass<PageOwnProps, {}>