import Taro from '@tarojs/taro-h5';
import { ComponentClass } from 'react';
import { Component } from "@tarojs/taro-h5";
import Nerv, { login } from "nervjs";
import { View, Text, PullDownRefresh } from '@tarojs/components';
import { connect } from "@tarojs/redux-h5";
import { request } from '../../service/request.service';
import Popupwindow from "../../components/popupwindow/popupwindow";
import { getCommandList, getRankList, getNewList, getGoodList } from "./api.service";
import TabBar from "../../components/TabBars/TabBars";
import './works.scss';
import { setAuthData } from "../../actions/auth";
import { setPageNum } from "../../actions/globalData";
import { paging } from "../../util/util";

import RecommendedLogos from "../../components/RecommendedLogos/RecommendedLogos";
import HotWorks from "../../components/HotWorks/HotWorks";
import NewWorks from "../../components/newWorks/newWorks";
import TopnotchPlayers from "../../components/TopnotchPlayers/TopnotchPlayers";

import { navigateTo, qs } from '../../service/utils.service';

@connect(({ authData, courseData, payInfoData, globalData, routerParams }) => ({
  authData, globalData, routerParams
}), dispatch => ({
  setAuthData(data) {
    dispatch(setAuthData(data));
  },
  setPageNum(data) {
    dispatch(setPageNum(data));
  }
}))
class works extends Component {
  constructor(props) {
    super(props);
  }
  config = {
    navigationBarTitleText: '推荐作品',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
    pageOrientation: "portrait"
  };
  state = {
    tabTitle: ['推荐作品', '作品排行', '新品上架', '优秀创客'],
    favorNum: 0,
    avatar: '',
    isCanvas: true,
    commandList: [],
    rankList: [],
    newList: [],
    goodList: [],
    commandPageNum: 1,
    rankPageNum: 1,
    newPageNum: 1,
    goodPageNum: 1,
    formatRankList: [],
    formatNewList: [],
    getMoreTxt: '',
    isShowLoading: true
  };
  componentWillMount() {
    const { scene, query } = this.props.routerParams;
    if (scene === 1007 || scene === 1008) {
      navigateTo('authorize', qs(query));
    }
    this.getCommandWorksList();
  }
  componentDidShow() {
    this.pullDownRefreshRef.bindEvent();
    this._offReachBottom = Taro.onReachBottom({
      callback: this.onReachBottom,
      ctx: this,
      onReachBottomDistance: undefined
    });

    if (this.props.authData && this.props.authData.token != '') {
      this.getNewPraiseNum().then(res => {
        this.setState({ favorNum: res });
      });
      this.getUserInfo().then(res => {
        this.setState({ avatar: res['headPhoto'] });
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    let { rankList, newList, goodList } = this.state;
    this.setState({
      isCanvas: nextProps.globalData.currentTab === 0 ? true : false,
      isShowLoading: true
    }, () => {
      const { currentTab } = nextProps.globalData;
      switch (currentTab) {
        case 0:
          break;
        case 1:
          if (rankList.length !== 0) return;
          this.setState({ getMoreTxt: '' });
          this.getRankWorksList();
          break;
        case 2:
          if (newList.length !== 0) return;
          this.setState({ getMoreTxt: '' });
          this.getNewWorksList();
          break;
        case 3:
          if (goodList.length !== 0) return;
          this.setState({ getMoreTxt: '' });
          this.getGoodWorksList();
          break;
        default:
          break;
      }
    });
  }
  onReachBottom() {
    this.setState({ isShowLoading: false });
    const { currentTab } = this.props.globalData;
    switch (currentTab) {
      case 0:
        let commandPageNum = ++this.state.commandPageNum;
        this.setState({ commandPageNum }, () => {
          this.getCommandWorksList();
        });
        break;
      case 1:
        let rankPageNum = ++this.state.rankPageNum;
        this.setState({ rankPageNum }, () => {
          this.getFormatList(this.state.rankList, rankPageNum, 'formatRankList', this.state.formatRankList);
        });
        break;
      case 2:
        let newPageNum = ++this.state.newPageNum;
        this.setState({ newPageNum }, () => {
          this.getFormatList(this.state.newList, newPageNum, 'formatNewList', this.state.formatNewList);
        });
        break;
      case 3:
        let goodPageNum = ++this.state.goodPageNum;
        this.setState({ goodPageNum }, () => {
          this.getGoodWorksList();
        });
        break;
      default:
        break;
    }
  }
  onPullDownRefresh() {
    this.setState({ isShowLoading: false });
    const { currentTab } = this.props.globalData;
    switch (currentTab) {
      case 0:
        this.setState({ commandPageNum: 1 }, () => {
          this.getCommandWorksList();
        });
        break;
      case 1:
        this.setState({ rankPageNum: 1 }, () => {
          this.getRankWorksList();
        });
        break;
      case 2:
        this.setState({ newPageNum: 1 }, () => {
          this.getNewWorksList();
        });
        break;
      case 3:
        this.setState({ goodPageNum: 1 }, () => {
          this.getGoodWorksList();
        });
        break;
      default:
        break;
    }
  }
  // onPageScroll(e) {
  //     console.log('scroll', e);

  // }
  toMyFavor = () => {
    Taro.navigateTo({
      url: '/pages/likeNotifications/likeNotifications'
    });
  };
  getNewPraiseNum() {
    const url = '/v1/littleApp/getNewPraiseNum';
    return request(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: this.props.authData.token
      }
    });
  }
  getUserInfo() {
    const url = '/v1/littleApp/getUserInfo';
    return request(url, {
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: this.props.authData.token
      }
    });
  }
  getCommandWorksList() {
    this.state.isShowLoading && Taro.showLoading({ title: '加载中' });
    let { commandPageNum, commandList } = this.state;
    getCommandList({ pageNum: commandPageNum }).then(res => {
      this.getList(res, 'commandList', commandList, commandPageNum);
    });
  }
  getGoodWorksList() {
    this.state.isShowLoading && Taro.showLoading({ title: '加载中' });
    let { goodPageNum, goodList } = this.state;
    getGoodList({ pageNum: goodPageNum }).then(res => {
      this.getList(res, 'goodList', goodList, goodPageNum);
    });
  }
  getRankWorksList() {
    this.state.isShowLoading && Taro.showLoading({ title: '加载中' });
    let { rankPageNum, rankList, formatRankList } = this.state;
    getRankList().then(res => {
      this.setState({
        rankList: res
      }, () => {
        this.getFormatList(res, rankPageNum, 'formatRankList', formatRankList);
      });
    });
  }
  getNewWorksList() {
    this.state.isShowLoading && Taro.showLoading({ title: '加载中' });
    let { newPageNum, newList, formatNewList } = this.state;
    getNewList().then(res => {
      this.setState({
        newList: res
      }, () => {
        this.getFormatList(res, newPageNum, 'formatNewList', formatNewList);
      });
    });
  }
  getFormatList(initList, pageNum, listRenderKey, listRender) {
    let concatList = paging(initList, pageNum);
    this.getList(concatList, listRenderKey, listRender, pageNum);
  }
  getList(res, listKey, list, pageNum) {
    if (res && res.length != 0) {
      let listVal = [];
      // if(listKey === 'commandList'){
      //     Taro.pageScrollTo({
      //         scrollTop: 0,
      //         duration: 0,
      //     })
      //     listVal = res;
      // }else {
      //     listVal = pageNum === 1 ? res : list.concat(res)
      // }
      this.setState({
        [listKey]: pageNum === 1 ? res : list.concat(res)
      }, () => {
        this.setState({
          getMoreTxt: '正在加载中...'
        });
      });
    } else {
      this.setState({
        getMoreTxt: '没有更多了'
      });
    }
    Taro.hideLoading();
    Taro.stopPullDownRefresh();
  }
  render() {
    const { favorNum, avatar, tabTitle, commandList, formatRankList, formatNewList, goodList } = this.state;
    const { currentTab, showPopup } = this.props.globalData;
    let commandComp;
    if (currentTab === 0) {
      commandComp = <RecommendedLogos commandList={commandList}></RecommendedLogos>;
    }

    const _temp = <View className={`index ${currentTab !== 0 && (favorNum > 0 ? 'index-space1' : 'index-space2')}`}>
                <View className={` header ${currentTab !== 0 ? 'fixed' : ''}`}>
                    {favorNum > 0 && <View className={`favour-notice `}>
                            <View className="favour-notice-remind" onClick={this.toMyFavor}>
                                <image src={avatar}></image>
                                <text>新获得{favorNum}个赞</text>
                                <View className="right">
                                    <Text className="right-arrow1"></Text>
                                    <Text className="right-arrow2"></Text>
                                </View>
                            </View>
                        </View>}
                        <TabBar list={tabTitle}>
                        </TabBar>                    
                </View>

                    {/* <View style={`display: ${currentTab === 0 ? 'block' : 'none'} `}>
                        <RecommendedLogos
                            commandList={commandList}
                        ></RecommendedLogos>
                     </View>         */}
                    <View style={`display: ${currentTab === 1 ? 'block' : 'none'} `}>
                        <HotWorks rankList={formatRankList}></HotWorks>
                    </View>
                    <View style={`display: ${currentTab === 2 ? 'block' : 'none'} `}>
                        <NewWorks newList={formatNewList}></NewWorks>
                    </View>
                    <View style={`display: ${currentTab === 3 ? 'block' : 'none'} `}>
                        <TopnotchPlayers goodList={goodList}></TopnotchPlayers>
                    </View>
                    {commandComp}
                <View className="getMore">{this.state.getMoreTxt}</View>
                {showPopup && <Popupwindow isCanvas={isCanvas}></Popupwindow>}

            </View>;

    return <PullDownRefresh onRefresh={this.onPullDownRefresh.bind(this)} ref={ref => {
      this.pullDownRefreshRef = ref;
    }}>{_temp}</PullDownRefresh>;
  }

  componentDidMount() {}

  componentDidHide() {
    this.pullDownRefreshRef.unbindEvent();

    this._offReachBottom();
  }

}