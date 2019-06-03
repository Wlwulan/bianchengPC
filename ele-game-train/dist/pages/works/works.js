"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/react/index.js");

var _index2 = require("../../npm/@tarojs/taro-weapp/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../../npm/@tarojs/redux/index.js");

var _requestService = require("../../service/request.service.js");

var _apiService = require("./api.service.js");

var _auth = require("../../actions/auth.js");

var _globalData = require("../../actions/globalData.js");

var _util = require("../../util/util.js");

var _utilsService = require("../../service/utils.service.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var works = (_dec = (0, _index4.connect)(function (_ref) {
  var authData = _ref.authData,
      courseData = _ref.courseData,
      payInfoData = _ref.payInfoData,
      globalData = _ref.globalData,
      routerParams = _ref.routerParams;
  return {
    authData: authData, globalData: globalData, routerParams: routerParams
  };
}, function (dispatch) {
  return {
    setAuthData: function setAuthData(data) {
      dispatch((0, _auth.setAuthData)(data));
    },
    setPageNum: function setPageNum(data) {
      dispatch((0, _globalData.setPageNum)(data));
    }
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(works, _BaseComponent);

  function works() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, works);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = works.__proto__ || Object.getPrototypeOf(works)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["currentTab", "commandList", "favorNum", "avatar", "tabTitle", "formatRankList", "formatNewList", "goodList", "showPopup", "isCanvas", "rankList", "newList", "commandPageNum", "rankPageNum", "newPageNum", "goodPageNum", "getMoreTxt", "isShowLoading", "routerParams", "authData", "globalData"], _this.config = {
      navigationBarTitleText: '推荐作品',
      enablePullDownRefresh: true,
      backgroundTextStyle: 'dark',
      pageOrientation: "portrait"
    }, _this.state = {
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
    }, _this.toMyFavor = function () {
      _index3.default.navigateTo({
        url: '/pages/likeNotifications/likeNotifications'
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(works, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(works.prototype.__proto__ || Object.getPrototypeOf(works.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _props$routerParams = this.props.routerParams,
          scene = _props$routerParams.scene,
          query = _props$routerParams.query;

      if (scene === 1007 || scene === 1008) {
        (0, _utilsService.navigateTo)('authorize', (0, _utilsService.qs)(query));
      }
      this.getCommandWorksList();
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var _this2 = this;

      if (this.props.authData && this.props.authData.token != '') {
        this.getNewPraiseNum().then(function (res) {
          _this2.setState({ favorNum: res });
        });
        this.getUserInfo().then(function (res) {
          _this2.setState({ avatar: res['headPhoto'] });
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var _state = this.state,
          rankList = _state.rankList,
          newList = _state.newList,
          goodList = _state.goodList;

      this.setState({
        isCanvas: nextProps.globalData.currentTab === 0 ? true : false,
        isShowLoading: true
      }, function () {
        var currentTab = nextProps.globalData.currentTab;

        switch (currentTab) {
          case 0:
            break;
          case 1:
            if (rankList.length !== 0) {
              return;
            }_this3.setState({ getMoreTxt: '' });
            _this3.getRankWorksList();
            break;
          case 2:
            if (newList.length !== 0) {
              return;
            }_this3.setState({ getMoreTxt: '' });
            _this3.getNewWorksList();
            break;
          case 3:
            if (goodList.length !== 0) {
              return;
            }_this3.setState({ getMoreTxt: '' });
            _this3.getGoodWorksList();
            break;
          default:
            break;
        }
      });
    }
  }, {
    key: "onReachBottom",
    value: function onReachBottom() {
      var _this4 = this;

      this.setState({ isShowLoading: false });
      var currentTab = this.props.globalData.currentTab;

      switch (currentTab) {
        case 0:
          var commandPageNum = ++this.state.commandPageNum;
          this.setState({ commandPageNum: commandPageNum }, function () {
            _this4.getCommandWorksList();
          });
          break;
        case 1:
          var rankPageNum = ++this.state.rankPageNum;
          this.setState({ rankPageNum: rankPageNum }, function () {
            _this4.getFormatList(_this4.state.rankList, rankPageNum, 'formatRankList', _this4.state.formatRankList);
          });
          break;
        case 2:
          var newPageNum = ++this.state.newPageNum;
          this.setState({ newPageNum: newPageNum }, function () {
            _this4.getFormatList(_this4.state.newList, newPageNum, 'formatNewList', _this4.state.formatNewList);
          });
          break;
        case 3:
          var goodPageNum = ++this.state.goodPageNum;
          this.setState({ goodPageNum: goodPageNum }, function () {
            _this4.getGoodWorksList();
          });
          break;
        default:
          break;
      }
    }
  }, {
    key: "onPullDownRefresh",
    value: function onPullDownRefresh() {
      var _this5 = this;

      this.setState({ isShowLoading: false });
      var currentTab = this.props.globalData.currentTab;

      switch (currentTab) {
        case 0:
          this.setState({ commandPageNum: 1 }, function () {
            _this5.getCommandWorksList();
          });
          break;
        case 1:
          this.setState({ rankPageNum: 1 }, function () {
            _this5.getRankWorksList();
          });
          break;
        case 2:
          this.setState({ newPageNum: 1 }, function () {
            _this5.getNewWorksList();
          });
          break;
        case 3:
          this.setState({ goodPageNum: 1 }, function () {
            _this5.getGoodWorksList();
          });
          break;
        default:
          break;
      }
    }
    // onPageScroll(e) {
    //     console.log('scroll', e);

    // }

  }, {
    key: "getNewPraiseNum",
    value: function getNewPraiseNum() {
      var url = '/v1/littleApp/getNewPraiseNum';
      return (0, _requestService.request)(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.props.authData.token
        }
      });
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      var url = '/v1/littleApp/getUserInfo';
      return (0, _requestService.request)(url, {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.props.authData.token
        }
      });
    }
  }, {
    key: "getCommandWorksList",
    value: function getCommandWorksList() {
      var _this6 = this;

      this.state.isShowLoading && _index3.default.showLoading({ title: '加载中' });
      var _state2 = this.state,
          commandPageNum = _state2.commandPageNum,
          commandList = _state2.commandList;

      (0, _apiService.getCommandList)({ pageNum: commandPageNum }).then(function (res) {
        _this6.getList(res, 'commandList', commandList, commandPageNum);
      });
    }
  }, {
    key: "getGoodWorksList",
    value: function getGoodWorksList() {
      var _this7 = this;

      this.state.isShowLoading && _index3.default.showLoading({ title: '加载中' });
      var _state3 = this.state,
          goodPageNum = _state3.goodPageNum,
          goodList = _state3.goodList;

      (0, _apiService.getGoodList)({ pageNum: goodPageNum }).then(function (res) {
        _this7.getList(res, 'goodList', goodList, goodPageNum);
      });
    }
  }, {
    key: "getRankWorksList",
    value: function getRankWorksList() {
      var _this8 = this;

      this.state.isShowLoading && _index3.default.showLoading({ title: '加载中' });
      var _state4 = this.state,
          rankPageNum = _state4.rankPageNum,
          rankList = _state4.rankList,
          formatRankList = _state4.formatRankList;

      (0, _apiService.getRankList)().then(function (res) {
        _this8.setState({
          rankList: res
        }, function () {
          _this8.getFormatList(res, rankPageNum, 'formatRankList', formatRankList);
        });
      });
    }
  }, {
    key: "getNewWorksList",
    value: function getNewWorksList() {
      var _this9 = this;

      this.state.isShowLoading && _index3.default.showLoading({ title: '加载中' });
      var _state5 = this.state,
          newPageNum = _state5.newPageNum,
          newList = _state5.newList,
          formatNewList = _state5.formatNewList;

      (0, _apiService.getNewList)().then(function (res) {
        _this9.setState({
          newList: res
        }, function () {
          _this9.getFormatList(res, newPageNum, 'formatNewList', formatNewList);
        });
      });
    }
  }, {
    key: "getFormatList",
    value: function getFormatList(initList, pageNum, listRenderKey, listRender) {
      var concatList = (0, _util.paging)(initList, pageNum);
      this.getList(concatList, listRenderKey, listRender, pageNum);
    }
  }, {
    key: "getList",
    value: function getList(res, listKey, list, pageNum) {
      var _this10 = this;

      if (res && res.length != 0) {
        var listVal = [];
        // if(listKey === 'commandList'){
        //     Taro.pageScrollTo({
        //         scrollTop: 0,
        //         duration: 0,
        //     })
        //     listVal = res;
        // }else {
        //     listVal = pageNum === 1 ? res : list.concat(res)
        // }
        this.setState(_defineProperty({}, listKey, pageNum === 1 ? res : list.concat(res)), function () {
          _this10.setState({
            getMoreTxt: '正在加载中...'
          });
        });
      } else {
        this.setState({
          getMoreTxt: '没有更多了'
        });
      }
      _index3.default.hideLoading();
      _index3.default.stopPullDownRefresh();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state6 = this.__state,
          favorNum = _state6.favorNum,
          avatar = _state6.avatar,
          tabTitle = _state6.tabTitle,
          commandList = _state6.commandList,
          formatRankList = _state6.formatRankList,
          formatNewList = _state6.formatNewList,
          goodList = _state6.goodList;
      var _props$globalData = this.__props.globalData,
          currentTab = _props$globalData.currentTab,
          showPopup = _props$globalData.showPopup;

      var commandComp = void 0;
      if (currentTab === 0) {}
      Object.assign(this.__state, {
        currentTab: currentTab,
        showPopup: showPopup
      });
      return this.__state;
    }
  }]);

  return works;
}(_index2.Component)) || _class);
works.properties = {
  "routerParams": {
    "type": null,
    "value": null
  },
  "authData": {
    "type": null,
    "value": null
  },
  "globalData": {
    "type": null,
    "value": null
  }
};
works.$$events = ["toMyFavor"];
exports.default = works;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(works, true));