import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Text, PullDownRefresh } from '@tarojs/components';
import WEB_API from "../../config/url";
import LikeNotification from "../../components/LikeNotification/LikeNotification";
import { request } from '../../service/request.service';
import { timestampFormat } from "../../util/util";
import './likeNotifications.scss';
import { setAuthData } from "../../actions/auth";
import { connect } from "@tarojs/redux-h5";

@connect(({ authData, courseData, payInfoData }) => ({
  authData
}), dispatch => ({
  setAuthData(data) {
    dispatch(setAuthData(data));
  }
}))
class LikeNotifications extends Component {
  config = {
    navigationBarTitleText: '点赞通知'
  };
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0,
      unreadList: [],
      readList: [],
      praiseId: 0,
      mewPageNum: 0,
      unreadOver: false,
      footerText: ''
    };
  }
  componentWillMount() {
    this.getNewPraiseList();
  }
  getPraiseList() {
    this.setState({ pageNum: this.state.pageNum + 1 }, () => {
      Taro.request({
        method: 'POST',
        url: WEB_API.baseUrl + '/v1/littleApp/getPraiseList',
        data: {
          token: this.props.authData.token,
          pageNum: this.state.pageNum,
          praiseId: this.state.praiseId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.data && res.data.data.length === 20) {
          this.setState({
            readList: this.state.readList.concat(res.data.data),
            footerText: '上拉加载更多'
          });
        } else {
          this.setState({
            readList: this.state.readList.concat(res.data.data),
            footerText: '没有更多了'
          });
        }
      });
    });
  }
  getNewPraiseList() {
    this.setState({ mewPageNum: this.state.mewPageNum + 1 }, () => {
      const url = '/v1/littleApp/getNewPraiseList';
      request(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.props.authData.token,
          pageNum: this.state.mewPageNum
        }
      }).then(res => {
        if (res === null) {
          this.setState({
            unreadOver: true,
            footerText: '查看更早消息'
          });
          return;
        }
        this.setState({
          unreadList: this.state.unreadList.concat(res),
          praiseId: res && res[res.length - 1]['PraiseId'] || 0,
          footerText: '上拉加载更多'
        });
        if (res.length < 20 && this.state.mewPageNum === 1) {
          this.setState({
            unreadOver: true,
            footerText: '查看更早消息'
          });
        }
      });
    });
  }
  onReachBottom() {
    if (!this.state.unreadOver) {
      this.getNewPraiseList();
    } else {
      if (this.state.readList.length !== 0) {
        this.getPraiseList();
      }
    }
  }
  render() {
    const { unreadList, readList, unreadOver } = this.state;
    const unread = unreadList && unreadList.map((el, i) => {
      return <View className="like-notification" key={i}>
				<LikeNotification src={el['HeadPhoto']} name={el['StudentName']} time={timestampFormat(el['AddTime'], 'pre')} WorkImg={el['WorkImg']}>
				</LikeNotification>
			</View>;
    });
    const read = readList.map((el, i) => {
      return <View className="like-notification" key={i}>
				<LikeNotification src={el['HeadPhoto']} name={el['StudentName']} time={timestampFormat(el['AddTime'], 'pre')} WorkImg={el['WorkImg']}>
				</LikeNotification>
			</View>;
    });
    return <View className="index">
				{unread}
				{read}
				{unreadOver && <View className="look-early">
						<Text onClick={this.getPraiseList}>{this.state.footerText}</Text>
					</View>}

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