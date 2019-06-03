"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/react/index.js");

var _index2 = require("../../npm/@tarojs/taro-weapp/index.js");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("../../npm/@tarojs/redux/index.js");

var _apiService = require("../../service/api.service.js");

var _auth = require("../../actions/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var authorize = (_dec = (0, _index4.connect)(function (_ref) {
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
  _inherits(authorize, _BaseComponent);

  function authorize() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, authorize);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = authorize.__proto__ || Object.getPrototypeOf(authorize)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["isRegister", "authData", "setAuthData"], _this.config = {
      navigationBarTitleText: ''
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(authorize, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(authorize.prototype.__proto__ || Object.getPrototypeOf(authorize.prototype), "_constructor", this).call(this, props);
      this.state = {
        isRegister: this.props.authData.token && this.props.authData.token !== '' // 是否已注册
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('authData', this.props.authData, this.state.isRegister);
      this.state.isRegister && this.toWebview();
    }
  }, {
    key: "handleGetUserInfo",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var _this2 = this;

        var _e$detail, encryptedData, iv, userInfo, _props$authData, unionid, openid, sessionKey, avatarUrl, gender, language, rest, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (e.detail.userInfo) {
                  _context.next = 3;
                  break;
                }

                _index3.default.navigateBack(-1);
                return _context.abrupt("return");

              case 3:
                _e$detail = e.detail, encryptedData = _e$detail.encryptedData, iv = _e$detail.iv, userInfo = _e$detail.userInfo;
                _props$authData = this.props.authData, unionid = _props$authData.unionid, openid = _props$authData.openid, sessionKey = _props$authData.sessionKey;

                if (!(unionid === '')) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return (0, _apiService.fetchUnionId)({ encryptedData: encryptedData, iv: iv, sessionKey: sessionKey });

              case 8:
                unionid = _context.sent;

                this.props.setAuthData({ unionid: unionid });

              case 10:
                avatarUrl = userInfo.avatarUrl, gender = userInfo.gender, language = userInfo.language, rest = _objectWithoutProperties(userInfo, ["avatarUrl", "gender", "language"]);
                _context.next = 13;
                return (0, _apiService.fetchUserToken)(_extends({
                  unionid: unionid,
                  openid: openid,
                  headPhoto: avatarUrl,
                  sex: gender
                }, rest));

              case 13:
                token = _context.sent;

                this.props.setAuthData({ token: token });
                this.setState({ isRegister: true }, function () {
                  _this2.toWebview();
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleGetUserInfo(_x) {
        return _ref3.apply(this, arguments);
      }

      return handleGetUserInfo;
    }()
  }, {
    key: "toWebview",
    value: function toWebview() {
      var _$router$params = this.$router.params,
          source = _$router$params.source,
          id = _$router$params.id,
          authorid = _$router$params.authorid;

      var authorId = authorid ? '&authorid=' + authorid : '';
      _index3.default.redirectTo({
        url: "/pages/webView/webView?pageName=" + source + "&id=" + id + authorId
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var isRegister = this.__state.isRegister;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return authorize;
}(_index2.Component)) || _class);
authorize.properties = {
  "authData": {
    "type": null,
    "value": null
  },
  "setAuthData": {
    "type": null,
    "value": null
  }
};
authorize.$$events = ["handleGetUserInfo"];
exports.default = authorize;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(authorize, true));