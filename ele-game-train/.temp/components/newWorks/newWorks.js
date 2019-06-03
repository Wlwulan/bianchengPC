import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View } from '@tarojs/components';

import HotWork from "../HotWork/HotWork";
import { timestampFormat } from "../../util/util";
import './newWorks.scss';

class newWorks extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  componentWillMount() {
    wx.reportAnalytics('newworks_onload', {});
  }

  render() {
    const { newList } = this.props;
    const videos = newList && newList.map((el, i) => {
      return <View className="hot-work" key={i}>
                <HotWork userInfo={{
          src: el['headPhoto'],
          name: el['authorName'],
          level: el['abilityLevel'],
          studentId: el['studentId']
        }} workImage={el['workImage']} likeNum={el['praiseCount']} time={timestampFormat(el['createDate'], 'pre')} title={el['workName']} workerId={el['workId']}>
                </HotWork>

            </View>;
    });
    return <View className={`newWorks`}>
                <View className="index">
                    {videos}
                </View>
            </View>;
  }
}