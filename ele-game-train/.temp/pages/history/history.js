import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { connect } from "@tarojs/redux-h5";
import { View, Text, PullDownRefresh } from '@tarojs/components';
import { request } from '../../service/request.service';
import HotWork from "../../components/HotWork/HotWork";
import { timestampFormat } from "../../util/util";
import './history.scss';
import { setAuthData } from "../../actions/auth";

@connect(({ authData, courseData, payInfoData }) => ({
  authData
}), dispatch => ({
  setAuthData(data) {
    dispatch(setAuthData(data));
  }
}))
class history extends Component {
  config = {
    navigationBarTitleText: '浏览历史'
  };
  state = {
    list: [],
    pageNum: 0,
    footerText: '',
    nothing: false
  };
  componentWillMount() {
    this.getUserBrowseHistoryList();
  }

  onReachBottom() {
    console.log('上拉/');
    this.getUserBrowseHistoryList();
  }

  getUserBrowseHistoryList() {
    Taro.showLoading({
      title: '加载中'
    });
    this.setState({ pageNum: this.state.pageNum + 1 }, () => {
      const url = '/v1/littleApp/getUserBrowseHistoryList';
      request(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.props.authData.token,
          pageNum: this.state.pageNum
        }
      }).then(res => {
        console.log('浏览历史', res);
        // if (res) {
        //     this.setState({ list: this.state.list.concat(res) })
        // } else {
        //     this.setState({ footerText: '没有更多了...' })
        // }

        if (res && res.length) {
          this.setState({
            list: this.state.list.concat(res)
          });
        } else if (this.state.pageNum !== 1) {
          this.setState({
            footerText: '没有更早的浏览作品了'
          });
        } else if (this.state.pageNum === 1) {
          this.setState({
            footerText: '您浏览过的作品都会显示在这里哦～',
            nothing: true
          });
        }

        if (res && res.length < 20) {
          this.setState({
            footerText: '没有更早的浏览作品了'
          });
        } else if (res && res.length === 20) {
          this.setState({
            footerText: '上拉加载更多...'
          });
        }
        Taro.hideLoading();
      });
    });
  }
  render() {

    const videos = this.state.list.map((el, i) => {
      return <View className="history" key={i}>
                <HotWork userInfo={{
          src: el['headPhoto'],
          name: el['authorName'],
          level: el['abilityLevel'],
          studentId: el['studentId']
        }} workImage={el['workImage']} likeNum={el['praiseCount']} time={timestampFormat(el['createDate'])} title={el['workName']} workerId={el['workId']}>
                </HotWork>
                <View className="browseTime">
                    <View className="line"></View>
                    <View className="time">{timestampFormat(el['browsTime'], 'pre')}</View>
                </View>
            </View>;
    });
    return <View className="index">
                {videos}
                <View className={'look-early ' + (this.state.nothing ? 'nothing' : '')}>
                    <Text>{this.state.footerText}</Text>
                </View>
            </View>;
  }

  componentDidMount() {}

  componentDidShow() {
    this._offReachBottom = Taro.onReachBottom({
      callback: this.onReachBottom,
      ctx: this,
      onReachBottomDistance: undefined
    });
  }

  componentDidHide() {
    this._offReachBottom();
  }

}