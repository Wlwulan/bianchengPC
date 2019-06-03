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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var imgUrl = "/static/images/popup_bg.gif";

var popupwindow = (_dec = (0, _index4.connect)(function (_ref) {
  var globalData = _ref.globalData;
  return {
    globalData: globalData
  };
}, function (dispatch) {
  return {};
}), _dec(_class = function (_BaseComponent) {
  _inherits(popupwindow, _BaseComponent);

  function popupwindow() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, popupwindow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = popupwindow.__proto__ || Object.getPrototypeOf(popupwindow)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["imgUrl", "list", "ratio", "isCanvas"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(popupwindow, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(popupwindow.prototype.__proto__ || Object.getPrototypeOf(popupwindow.prototype), "_constructor", this).call(this, props);
      this.state = {
        list: [],
        ratio: 0
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.uniformScale();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      setTimeout(function () {
        // console.log('popupReceiveProps',);
        _this2.uniformScale();
      }, 200);
    }
  }, {
    key: "toPay",
    value: function toPay() {
      wx.reportAnalytics('topay_click', {});
      _index3.default.navigateTo({
        url: '/pages/payV2/payV2'
      });
    }
  }, {
    key: "uniformScale",
    value: function uniformScale() {
      var _this3 = this;

      _index3.default.getSystemInfo().then(function (res) {
        // console.log(res)
        _this3.setState({ ratio: res.screenWidth / 375 }, function () {
          _this3.drawImg();
        });
      });
    }
  }, {
    key: "drawImg",
    value: function drawImg() {
      var ctx = _index3.default.createCanvasContext('canvas', this.$scope);
      ctx.drawImage(imgUrl, 0, 0, 90 * this.state.ratio, 75.5 * this.state.ratio);
      ctx.draw();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;
      Object.assign(this.__state, {
        imgUrl: imgUrl
      });
      return this.__state;
    }
  }]);

  return popupwindow;
}(_index2.Component)) || _class);
popupwindow.properties = {
  "isCanvas": {
    "type": null,
    "value": null
  }
};
popupwindow.$$events = ["toPay"];
exports.default = popupwindow;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(popupwindow));