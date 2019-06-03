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

var _auth = require("../../actions/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var personal = (_dec = (0, _index4.connect)(function (_ref) {
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
  _inherits(personal, _BaseComponent);

  function personal() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, personal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = personal.__proto__ || Object.getPrototypeOf(personal)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "userInfo", "isShowModel", "clickSource", "showAuthorized", "myList", "detailPath", "isRegister", "authData"], _this.config = {
      navigationBarTitleText: '我的'
    }, _this.toMyFavor = function () {
      _index3.default.navigateTo({
        url: '/pages/likeNotifications/likeNotifications'
      });
    }, _this.toDetailPage = function (i) {
      if (i === 0) {
        wx.reportAnalytics('myproduct_click', {});
      } else if (i === 1) {
        wx.reportAnalytics('myworks_click', {});
      } else if (i === 2) {
        wx.reportAnalytics('mylikes_click', {});
      } else if (i === 3) {
        wx.reportAnalytics('history_click', {});
      }
      _index3.default.navigateTo({
        url: _this.state.detailPath[i]
      });
    }, _this.toggleModel = function (clickSource) {
      if (_this.state.userInfo['isPurchase'] === 1 && clickSource === "isbuyBtn") {
        return;
      }
      if (_this.state.userInfo['isPurchase'] === 0 && clickSource === "isbuyBtn") {
        wx.reportAnalytics('join_training', {});
      }
      _this.setState({
        isShowModel: !_this.state.isShowModel,
        clickSource: clickSource
      });
    }, _this.authorizeCallBack = function () {
      _this.setState({ showAuthorized: false }, function () {
        _this.getProductList().then(function (res) {
          _this.setState({
            userInfo: res
          });
        });
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(personal, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(personal.prototype.__proto__ || Object.getPrototypeOf(personal.prototype), "_constructor", this).call(this, props);
      this.state = {
        myList: [{
          imgUrl: this.getImgUrl('my-product-icon'),
          name: '我的作品'
        }, {
          imgUrl: this.getImgUrl('my-work-icon'),
          name: '我的作业'
        }, {
          imgUrl: this.getImgUrl('my-favor-icon'),
          name: '我的喜欢'
        }, {
          imgUrl: this.getImgUrl('history-icon'),
          name: '浏览历史'
        }],
        detailPath: ['/pages/myProduct/myProduct', '/pages/myWorks/myWorks', '/pages/myFavor/myFavor', '/pages/history/history'],
        userInfo: {},
        isShowModel: false,
        showAuthorized: false,
        clickSource: '',
        isRegister: this.props.authData.token && this.props.authData.token !== '' // 是否已注册          
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.isAuthorized();
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      wx.reportAnalytics('personal_onload', {});
    }
  }, {
    key: "getImgUrl",
    value: function getImgUrl(name) {
      return "https://appd.knowbox.cn/ss/miniapp/ele_game_register/personal/" + name + ".png";
    }
  }, {
    key: "getProductList",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = '/v1/littleApp/getUserInfo';
                return _context.abrupt("return", (0, _requestService.request)(url, {
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    token: this.props.authData.token
                  }
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getProductList() {
        return _ref3.apply(this, arguments);
      }

      return getProductList;
    }()
  }, {
    key: "toPay",
    value: function toPay() {
      _index3.default.navigateTo({
        url: '/pages/payV2/payV2'
      });
    }
  }, {
    key: "isAuthorized",
    value: function isAuthorized() {
      var _this2 = this;

      // Taro.getSetting().then((res) => {
      //     if (res.authSetting['scope.userInfo'] === true) {
      //         this.getProductList().then((res) => {
      //             this.setState({
      //                 userInfo: res
      //             })
      //         })
      //     } else {
      //         this.setState({ showAuthorized: true })
      //     }
      // })
      if (this.state.isRegister) {
        this.getProductList().then(function (res) {
          _this2.setState({
            userInfo: res
          });
        });
      } else {
        this.setState({ showAuthorized: true });
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
          userInfo = _state.userInfo,
          isShowModel = _state.isShowModel,
          showAuthorized = _state.showAuthorized,
          progressBarWidth = _state.progressBarWidth,
          clickSource = _state.clickSource;

      var anonymousState__temp = userInfo['upgradeProgress'] && parseInt(userInfo['upgradeProgress'] * 100);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp
      });
      return this.__state;
    }
  }]);

  return personal;
}(_index2.Component)) || _class);
personal.properties = {
  "authData": {
    "type": null,
    "value": null
  }
};
personal.$$events = ["toggleModel", "toDetailPage", "toPay", "authorizeCallBack"];
exports.default = personal;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(personal, true));