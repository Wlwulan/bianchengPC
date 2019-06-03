import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Text, PullDownRefresh } from '@tarojs/components';
import { timestampFormat } from "../../util/util";
import { request } from '../../service/request.service';
import HotWork from "../../components/HotWork/HotWork";

import './MyFavor.scss';
import { connect } from "@tarojs/redux-h5";

@connect(({ authData, courseData, payInfoData }) => ({
  authData
}), dispatch => ({
  setAuthData(data) {
    dispatch(setAuthData(data));
  }
}))
class MyFavor extends Component {
  config = {
    navigationBarTitleText: '我的喜欢'
  };
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 0,
      footerText: '',
      nothing: false
    };
  }
  componentWillMount() {
    this.getUserLikeWorksList();
  }

  onReachBottom() {
    console.log('上拉/');
    this.getUserLikeWorksList();
  }
  getUserLikeWorksList() {
    Taro.showLoading({
      title: '加载中'
    });
    this.setState({ pageNum: this.state.pageNum + 1 }, () => {
      const url = '/v1/littleApp/getUserLikeWorksList';
      request(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.props.authData.token,
          // token: 'feahvJWLZP88FddSbhv_1NMdddPJMEvXvNiUDCKxLIpMVgOpXvrqGjDhgs1mxKFP',
          pageNum: this.state.pageNum
        }
      }).then(res => {
        console.log('我的喜欢', res);
        // if (res) {
        //   this.setState({ list: this.state.list.concat(res) })
        // } else {
        //   this.setState({ footerText: '没有更多了...' })
        // }

        if (res && res.length) {
          this.setState({
            list: this.state.list.concat(res)
          });
        } else if (this.state.pageNum !== 1) {
          this.setState({
            footerText: '没有更多作品了'
          });
        } else if (this.state.pageNum === 1) {
          this.setState({
            footerText: '您点赞过的作品都会显示在这里哦～',
            nothing: true
          });
        }

        if (res && res.length < 20) {
          this.setState({
            footerText: '没有更多作品了'
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
      let date = timestampFormat(el.createDate);
      return <View className="MyFavor" key={i}>
        <HotWork userInfo={{
          src: el['headPhoto'],
          name: el['authorName'],
          level: el['abilityLevel'],
          studentId: el['studentId']
        }} workImage={el['workImage']} likeNum={el['praiseCount']} time={date} title={el['workName']} workerId={el['workId']}>
        </HotWork>
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