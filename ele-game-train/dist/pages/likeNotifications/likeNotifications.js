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

var _url = require("../../config/url.js");

var _url2 = _interopRequireDefault(_url);

var _requestService = require("../../service/request.service.js");

var _util = require("../../util/util.js");

var _auth = require("../../actions/auth.js");

var _index4 = require("../../npm/@tarojs/redux/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LikeNotifications = (_dec = (0, _index4.connect)(function (_ref) {
  var authData = _ref.authData,
      courseData = _ref.courseData,
      payInfoData = _ref.payInfoData;
  return {
    authData: authData
  };
}, function (dispatch) {
  return {
    setAuthData: function setAuthData(data) {
      dispatch((0, _auth.setAuthData)(data));
    }
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(LikeNotifications, _BaseComponent);

  function LikeNotifications() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, LikeNotifications);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = LikeNotifications.__proto__ || Object.getPrototypeOf(LikeNotifications)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "loopArray1", "unreadList", "readList", "unreadOver", "pageNum", "praiseId", "mewPageNum", "footerText", "authData"], _this.config = {
      navigationBarTitleText: '点赞通知'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LikeNotifications, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(LikeNotifications.prototype.__proto__ || Object.getPrototypeOf(LikeNotifications.prototype), "_constructor", this).call(this, props);
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
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getNewPraiseList();
    }
  }, {
    key: "getPraiseList",
    value: function getPraiseList() {
      var _this2 = this;

      this.setState({ pageNum: this.state.pageNum + 1 }, function () {
        _index3.default.request({
          method: 'POST',
          url: _url2.default.baseUrl + '/v1/littleApp/getPraiseList',
          data: {
            token: _this2.props.authData.token,
            pageNum: _this2.state.pageNum,
            praiseId: _this2.state.praiseId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (res) {
          if (res.data.data && res.data.data.length === 20) {
            _this2.setState({
              readList: _this2.state.readList.concat(res.data.data),
              footerText: '上拉加载更多'
            });
          } else {
            _this2.setState({
              readList: _this2.state.readList.concat(res.data.data),
              footerText: '没有更多了'
            });
          }
        });
      });
    }
  }, {
    key: "getNewPraiseList",
    value: function getNewPraiseList() {
      var _this3 = this;

      this.setState({ mewPageNum: this.state.mewPageNum + 1 }, function () {
        var url = '/v1/littleApp/getNewPraiseList';
        (0, _requestService.request)(url, {
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            token: _this3.props.authData.token,
            pageNum: _this3.state.mewPageNum
          }
        }).then(function (res) {
          if (res === null) {
            _this3.setState({
              unreadOver: true,
              footerText: '查看更早消息'
            });
            return;
          }
          _this3.setState({
            unreadList: _this3.state.unreadList.concat(res),
            praiseId: res && res[res.length - 1]['PraiseId'] || 0,
            footerText: '上拉加载更多'
          });
          if (res.length < 20 && _this3.state.mewPageNum === 1) {
            _this3.setState({
              unreadOver: true,
              footerText: '查看更早消息'
            });
          }
        });
      });
    }
  }, {
    key: "onReachBottom",
    value: function onReachBottom() {
      if (!this.state.unreadOver) {
        this.getNewPraiseList();
      } else {
        if (this.state.readList.length !== 0) {
          this.getPraiseList();
        }
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state = this.__state,
          unreadList = _state.unreadList,
          readList = _state.readList,
          unreadOver = _state.unreadOver;

      var loopArray0 = unreadList ? unreadList.map(function (el, i) {
        el = {
          $original: (0, _index2.internal_get_original)(el)
        };
        var $loopState__temp2 = unreadList ? (0, _util.timestampFormat)(el.$original['AddTime'], 'pre') : null;
        return {
          $loopState__temp2: $loopState__temp2,
          $original: el.$original
        };
      }) : [];
      var loopArray1 = readList.map(function (el, i) {
        el = {
          $original: (0, _index2.internal_get_original)(el)
        };
        var $loopState__temp4 = (0, _util.timestampFormat)(el.$original['AddTime'], 'pre');
        return {
          $loopState__temp4: $loopState__temp4,
          $original: el.$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        loopArray1: loopArray1
      });
      return this.__state;
    }
  }]);

  return LikeNotifications;
}(_index2.Component)) || _class);
LikeNotifications.properties = {
  "authData": {
    "type": null,
    "value": null
  }
};
LikeNotifications.$$events = ["getPraiseList"];
exports.default = LikeNotifications;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(LikeNotifications, true));