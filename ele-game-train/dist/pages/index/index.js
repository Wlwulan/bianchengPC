"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _auth = require("../../actions/auth.js");

var _system = require("../../actions/system.js");

var _apiService = require("./api.service.js");

var _utilsService = require("../../service/utils.service.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = (_dec = (0, _index3.connect)(function (_ref) {
  var authData = _ref.authData;
  return {
    authData: authData
  };
}, function (dispatch) {
  return {
    setAuthData: function setAuthData(data) {
      dispatch((0, _auth.setAuthData)(data));
    },
    setSystemData: function setSystemData(data) {
      dispatch((0, _system.setSystemData)(data));
    }
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["setAuthData", "setSystemData"], _this.config = {
      pages: ['pages/index/index']
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.state = {};
    }

    // onLoad

  }, {
    key: "componentWillMount",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref4, code, resp, openid, unionid, token, session_key;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                console.log(this.$router.params, 'xxxxxxxxxxxxxxxx');

                _context.next = 3;
                return _index2.default.login();

              case 3:
                _ref4 = _context.sent;
                code = _ref4.code;
                _context.next = 7;
                return (0, _apiService.login)({ code: code }).catch(function (error) {
                  console.log(error);
                });

              case 7:
                resp = _context.sent;
                openid = resp.openid, unionid = resp.unionid, token = resp.token, session_key = resp.session_key;

                this.props.setAuthData({
                  openid: openid,
                  unionid: unionid,
                  token: token,
                  sessionKey: session_key
                });
                this.getOS();
                this.redirect(this.$router.params);

              case 12:
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
    value: function componentDidMount() {}

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
    value: function componentWillUnmount() {}
  }, {
    key: "getOS",
    value: function getOS() {
      var _Taro$getSystemInfoSy = _index2.default.getSystemInfoSync(),
          system = _Taro$getSystemInfoSy.system;

      var regexp = /android/i;
      this.props.setSystemData({
        os: regexp.test(system) ? 'android' : 'ios'
      });
    }
  }, {
    key: "redirect",
    value: function redirect(params) {
      var to = params.to;

      if (to === 'pay') {
        (0, _utilsService.redirectTo)('payV2');
      } else (0, _utilsService.switchTab)('works');
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component)) || _class);
Index.properties = {
  "setAuthData": {
    "type": null,
    "value": null
  },
  "setSystemData": {
    "type": null,
    "value": null
  }
};
Index.$$events = [];
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));