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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var creatClass = (_temp2 = _class = function (_BaseComponent) {
  _inherits(creatClass, _BaseComponent);

  function creatClass() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, creatClass);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = creatClass.__proto__ || Object.getPrototypeOf(creatClass)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["isShowClassModel", "currTxtId", "cardCtn"], _this.config = {
      navigationBarTitleText: '创作课堂'
    }, _this.toggleClassModel = function (i) {
      if (i === 0) {
        wx.reportAnalytics('experience_program_click', {});
      } else if (i === 1) {
        wx.reportAnalytics('free_writing_click', {});
      } else if (i === 2) {
        wx.reportAnalytics('start_breaking_click', {});
      }
      if (i === 0) {
        _index2.default.navigateTo({
          url: '/pages/payV2/payV2'
        });
        return;
      }
      _this.setState({
        isShowClassModel: !_this.state.isShowClassModel,
        currTxtId: i
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(creatClass, [{
    key: "_constructor",
    value: function _constructor() {
      _get(creatClass.prototype.__proto__ || Object.getPrototypeOf(creatClass.prototype), "_constructor", this).apply(this, arguments);

      this.state = {
        cardCtn: [{
          title: "体验编程",
          imgUrl: "https://appd.knowbox.cn/ss/miniapp/ele_game_register/card_bg1.png"
        }, {
          title: "自由创作",
          imgUrl: "https://appd.knowbox.cn/ss/miniapp/ele_game_register/card_bg2.png"
        }, {
          title: "开始闯关",
          imgUrl: "https://appd.knowbox.cn/ss/miniapp/ele_game_register/card_bg3.png"
        }],
        currTxtId: -1,
        isShowClassModel: false
      };
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      wx.reportAnalytics('creatclass_onload', {});
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state = this.__state,
          isShowClassModel = _state.isShowClassModel,
          currTxtId = _state.currTxtId;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return creatClass;
}(_index.Component), _class.properties = {}, _class.$$events = ["toggleClassModel"], _temp2);
creatClass = tslib_1.__decorate([(0, _index3.connect)(function (_ref2) {
  var globalData = _ref2.globalData;
  return {
    globalData: globalData
  };
})], creatClass);
exports.default = creatClass;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(creatClass, true));