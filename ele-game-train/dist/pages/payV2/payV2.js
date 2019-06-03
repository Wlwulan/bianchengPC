"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _url = require("../../config/url.js");

var _url2 = _interopRequireDefault(_url);

var _apiService = require("../../service/api.service.js");

var _apiService2 = require("./api.service.js");

var _auth = require("../../actions/auth.js");

var _course = require("../../actions/course.js");

var _pay = require("../../actions/pay.js");

var _system = require("../../actions/system.js");

var _utilsService = require("../../service/utils.service.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PayV2 = (_dec = (0, _index3.connect)(function (_ref) {
  var authData = _ref.authData,
      courseData = _ref.courseData,
      payInfoData = _ref.payInfoData,
      systemData = _ref.systemData;
  return {
    authData: authData,
    courseData: courseData,
    payInfoData: payInfoData,
    systemData: systemData
  };
}, function (dispatch) {
  return {
    setAuthData: function setAuthData(data) {
      dispatch((0, _auth.setAuthData)(data));
    },
    setCourseData: function setCourseData(data) {
      dispatch((0, _course.setCourseData)(data));
    },
    setPayInfoData: function setPayInfoData(data) {
      dispatch((0, _pay.setPayInfoData)(data));
    },
    setSystemData: function setSystemData(data) {
      dispatch((0, _system.setSystemData)(data));
    }
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(PayV2, _BaseComponent);

  function PayV2() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, PayV2);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = PayV2.__proto__ || Object.getPrototypeOf(PayV2)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "$anonymousCallee__0", "isMulti", "WEB_API", "courseName", "courseTime", "isModalPayShow", "gdt_vid", "adId", "isModalGuideShow", "modalTitle", "isBuy", "isRegister", "isIOS", "coursePeriod", "vidContext", "vidContext2", "vidContext3", "payButtonClicked", "initDataFetched", "imgIndex2", "systemData", "authData", "setAuthData", "__fn_on", "setSystemData", "setCourseData", "setPayInfoData"], _this.config = {
      pages: ['pages/payV2/payV2']
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PayV2, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(PayV2.prototype.__proto__ || Object.getPrototypeOf(PayV2.prototype), "_constructor", this).call(this, props);
      this.state = {
        isIOS: this.props.systemData.os === 'ios',
        isRegister: this.props.authData.token !== '', // 是否已注册
        isBuy: false, // 是否已购买
        isMulti: true, // 是否为多期课程
        isModalPayShow: false,
        isModalGuideShow: false,
        modalTitle: '',
        coursePeriod: '',
        courseName: '',
        courseTime: '',
        vidContext: null,
        vidContext2: null,
        vidContext3: null,
        payButtonClicked: false,
        initDataFetched: false,
        imgIndex2: false,
        adId: '', // 统计打点相关参数
        gdt_vid: '' // 统计打点相关参数
      };
    }

    // onLoad

  }, {
    key: "componentWillMount",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var token, _ref4, code, resp, openid, unionid, _token, session_key;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = this.props.authData.token;

                if (!(token && token !== '')) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return this.getPayInfo(token);

              case 4:
                _context.next = 20;
                break;

              case 6:
                _context.next = 8;
                return _index2.default.login();

              case 8:
                _ref4 = _context.sent;
                code = _ref4.code;
                _context.next = 12;
                return (0, _apiService2.login)({ code: code }).catch(function (error) {
                  console.log(error);
                });

              case 12:
                resp = _context.sent;
                openid = resp.openid, unionid = resp.unionid, _token = resp.token, session_key = resp.session_key;

                this.props.setAuthData({
                  openid: openid,
                  unionid: unionid,
                  token: _token,
                  sessionKey: session_key
                });

                if (!(_token && _token !== '')) {
                  _context.next = 18;
                  break;
                }

                _context.next = 18;
                return this.getPayInfo(_token);

              case 18:
                this.setState({
                  isRegister: _token !== ''
                });
                this.getOS();

              case 20:
                this.redirect(this.$router.params);
                _index2.default.eventCenter.on('modalCloseEvent', function (data) {
                  _this2.setState(_defineProperty({}, data, false));
                });

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillMount() {
        return _ref3.apply(this, arguments);
      }

      return componentWillMount;
    }()

    // onReady

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var vidContext = _index2.default.createVideoContext('intro_video');
      var vidContext2 = _index2.default.createVideoContext('intro_video2');
      var vidContext3 = _index2.default.createVideoContext('intro_video3');
      this.setState({
        vidContext: vidContext,
        vidContext2: vidContext2,
        vidContext3: vidContext3
      });
    }

    // onShow

  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}

    // onHide

  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}

    // onUnload

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _index2.default.eventCenter.off('modalCloseEvent');
    }
  }, {
    key: "redirect",
    value: function redirect(params) {
      var gdt_vid = params.gdt_vid,
          adId = params.adId;

      this.setState({
        gdt_vid: gdt_vid,
        adId: adId
      });
    }
  }, {
    key: "getOS",
    value: function getOS() {
      var _Taro$getSystemInfoSy = _index2.default.getSystemInfoSync(),
          system = _Taro$getSystemInfoSy.system;

      var regexp = /android/i;
      this.props.setSystemData({
        os: regexp.test(system) ? 'android' : 'ios'
      });
      this.setState({
        isIOS: this.props.systemData.os === 'ios'
      });
    }
  }, {
    key: "getUserInfoSetting",
    value: function getUserInfoSetting() {
      var _this3 = this;

      _index2.default.getSetting().then(function (resp) {
        var userInfoSetting = resp.authSetting['scope.userInfo'];
        _this3.setState({
          isRegister: userInfoSetting ? true : false
        });
      });
    }
  }, {
    key: "toPay",
    value: function toPay() {
      var _state = this.state,
          isMulti = _state.isMulti,
          vidContext = _state.vidContext,
          vidContext2 = _state.vidContext2,
          vidContext3 = _state.vidContext3;
      var _$router$params = this.$router.params,
          gdt_vid = _$router$params.gdt_vid,
          adId = _$router$params.adId;

      if (isMulti) {
        (0, _utilsService.redirectTo)('payChoice', "gdt_vid=" + gdt_vid + "&adId=" + adId);
      } else {
        this.setState({ isModalPayShow: true });
        vidContext.pause();
        vidContext2.pause();
        vidContext3.pause();
      }
    }
  }, {
    key: "getProductList",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref6, IsMultiPhase, PhaseGroupList, phraseData;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _apiService2.getProductList)();

              case 2:
                _ref6 = _context2.sent;
                IsMultiPhase = _ref6.IsMultiPhase;
                PhaseGroupList = _ref6.PhaseGroupList;

                this.setState({
                  isMulti: IsMultiPhase
                });
                this.props.setCourseData(PhaseGroupList);
                phraseData = PhaseGroupList[0].PhaseList[0];

                this.setState({
                  coursePeriod: PhaseGroupList[0].GroupName,
                  courseName: phraseData.Phasename,
                  courseTime: (0, _utilsService.formatTime)(phraseData.Starttime)
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getProductList() {
        return _ref5.apply(this, arguments);
      }

      return getProductList;
    }()
  }, {
    key: "getPayInfo",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(token) {
        var resp;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _apiService.getPayInfo)({ token: token });

              case 2:
                resp = _context3.sent;

                if (resp) {
                  this.props.setPayInfoData(resp);
                  this.setState({ isBuy: true });
                }
                _context3.next = 6;
                return this.getProductList();

              case 6:
                this.setState({ initDataFetched: true });

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPayInfo(_x) {
        return _ref7.apply(this, arguments);
      }

      return getPayInfo;
    }()
  }, {
    key: "handleGetUserInfo",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
        var _e$detail, encryptedData, iv, userInfo, _props$authData, unionid, openid, sessionKey, avatarUrl, gender, language, rest, token;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _e$detail = e.detail, encryptedData = _e$detail.encryptedData, iv = _e$detail.iv, userInfo = _e$detail.userInfo;
                _props$authData = this.props.authData, unionid = _props$authData.unionid, openid = _props$authData.openid, sessionKey = _props$authData.sessionKey;

                if (!(unionid === '')) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 5;
                return (0, _apiService.fetchUnionId)({ encryptedData: encryptedData, iv: iv, sessionKey: sessionKey });

              case 5:
                unionid = _context4.sent;

                this.props.setAuthData({ unionid: unionid });

              case 7:
                avatarUrl = userInfo.avatarUrl, gender = userInfo.gender, language = userInfo.language, rest = _objectWithoutProperties(userInfo, ["avatarUrl", "gender", "language"]);
                _context4.next = 10;
                return (0, _apiService.fetchUserToken)(_extends({
                  unionid: unionid,
                  openid: openid,
                  headPhoto: avatarUrl,
                  sex: gender
                }, rest));

              case 10:
                token = _context4.sent;

                this.props.setAuthData({ token: token });
                this.setState({
                  isRegister: true
                });

                _context4.next = 15;
                return this.getPayInfo(token);

              case 15:
                if (this.state.payButtonClicked) {
                  this.setState({ payButtonClicked: false });
                  this.toPay();
                }

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleGetUserInfo(_x2) {
        return _ref8.apply(this, arguments);
      }

      return handleGetUserInfo;
    }()
  }, {
    key: "handleConsultButtonClick",
    value: function handleConsultButtonClick() {
      this.setState({
        isModalGuideShow: true,
        modalTitle: '咨询老师'
      });
      this.state.vidContext.pause();
      this.state.vidContext2.pause();
      this.state.vidContext3.pause();
    }
  }, {
    key: "handlePayButtonClick",
    value: function handlePayButtonClick() {
      var _state2 = this.state,
          isIOS = _state2.isIOS,
          isRegister = _state2.isRegister,
          isBuy = _state2.isBuy,
          vidContext = _state2.vidContext,
          vidContext2 = _state2.vidContext2,
          vidContext3 = _state2.vidContext3,
          initDataFetched = _state2.initDataFetched;

      if (isRegister && !initDataFetched) {
        (0, _utilsService.showToast)('数据初始化中，请稍后...');
        return;
      }
      if (isBuy) {
        (0, _utilsService.redirectTo)('paySuccess');
      } else if (isIOS) {
        this.setState({
          isModalGuideShow: true,
          modalTitle: '立即报名'
        });
        vidContext.pause();
        vidContext2.pause();
        vidContext3.pause();
      } else {
        if (isRegister) {
          this.toPay();
        } else this.setState({ payButtonClicked: true });
      }
    }
  }, {
    key: "handlChangeImgIndex2",
    value: function handlChangeImgIndex2(index) {
      console.log(index);
      if (index === 1) {
        this.setState({
          imgIndex2: !this.state.imgIndex2
        });
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state3 = this.__state,
          isIOS = _state3.isIOS,
          isRegister = _state3.isRegister,
          isBuy = _state3.isBuy,
          isMulti = _state3.isMulti,
          isModalPayShow = _state3.isModalPayShow,
          isModalGuideShow = _state3.isModalGuideShow,
          modalTitle = _state3.modalTitle,
          courseName = _state3.courseName,
          courseTime = _state3.courseTime,
          gdt_vid = _state3.gdt_vid,
          adId = _state3.adId,
          imgIndex2 = _state3.imgIndex2;


      var $anonymousCallee__0 = [].concat(_toConsumableArray(Array(12).keys()));
      var loopArray0 = [].concat(_toConsumableArray(Array(12).keys())).map(function (index) {
        index = {
          $original: (0, _index.internal_get_original)(index)
        };
        var $loopState__temp2 = index.$original === 2 ? (0, _index.internal_inline_style)({ display: imgIndex2 ? 'block' : 'none' }) : null;
        return {
          $loopState__temp2: $loopState__temp2,
          $original: index.$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        $anonymousCallee__0: $anonymousCallee__0,
        WEB_API: _url2.default
      });
      return this.__state;
    }
  }]);

  return PayV2;
}(_index.Component)) || _class);
PayV2.properties = {
  "systemData": {
    "type": null,
    "value": null
  },
  "authData": {
    "type": null,
    "value": null
  },
  "setAuthData": {
    "type": null,
    "value": null
  },
  "__fn_on": {
    "type": null,
    "value": null
  },
  "setSystemData": {
    "type": null,
    "value": null
  },
  "setCourseData": {
    "type": null,
    "value": null
  },
  "setPayInfoData": {
    "type": null,
    "value": null
  }
};
PayV2.$$events = ["handlChangeImgIndex2", "handleConsultButtonClick", "handleGetUserInfo", "handlePayButtonClick"];
exports.default = PayV2;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(PayV2, true));