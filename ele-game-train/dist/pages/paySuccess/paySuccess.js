"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _tslib = require("../../npm/tslib/tslib.js");

var tslib_1 = _interopRequireWildcard(_tslib);

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _utilsService = require("../../service/utils.service.js");

var _apiService = require("../../service/api.service.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paySuccess = (_temp2 = _class = function (_BaseComponent) {
  _inherits(paySuccess, _BaseComponent);

  function paySuccess() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, paySuccess);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = paySuccess.__proto__ || Object.getPrototypeOf(paySuccess)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["askTeacher", "courseName", "courseTime", "teacherMobile", "authData", "globalData"], _this.config = {
      navigationBarTitleText: '小象编程'
    }, _this.copyText = function () {
      _index2.default.setClipboardData({ data: _this.state.teacherMobile }).then(function () {
        _index2.default.showToast({
          title: '复制成功'
        });
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(paySuccess, [{
    key: "_constructor",
    value: function _constructor() {
      _get(paySuccess.prototype.__proto__ || Object.getPrototypeOf(paySuccess.prototype), "_constructor", this).apply(this, arguments);

      this.state = {
        askTeacher: ["1.点击小程序右上角的 [...]", "2.点击 [关于小象编程训练营]", "3.点击 [相关公众号]", "4.关注后，可以直接咨询老师"],
        courseName: '',
        courseTime: '',
        teacherMobile: ''
      };
    }
  }, {
    key: "getPayInfo",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
        var resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _apiService.getPayInfo)({ token: token });

              case 2:
                resp = _context.sent;

                if (resp) {
                  this.setState({
                    courseName: resp.Classname,
                    courseTime: (0, _utilsService.formatTime)(resp.Starttime),
                    teacherMobile: resp.Teachermobile
                  });
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPayInfo(_x) {
        return _ref2.apply(this, arguments);
      }

      return getPayInfo;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getPayInfo(this.props.authData.token);
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

  return paySuccess;
}(_index.Component), _class.properties = {
  "authData": {
    "type": null,
    "value": null
  },
  "globalData": {
    "type": null,
    "value": null
  }
}, _class.$$events = ["copyText"], _temp2);
paySuccess = tslib_1.__decorate([(0, _index3.connect)(function (_ref3) {
  var globalData = _ref3.globalData,
      authData = _ref3.authData;
  return {
    globalData: globalData,
    authData: authData
  };
})], paySuccess);
exports.default = paySuccess;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(paySuccess, true));