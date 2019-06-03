"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/react/index.js");

var _index2 = require("../../npm/@tarojs/taro-weapp/index.js");

var _index3 = _interopRequireDefault(_index2);

var _util = require("../../util/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotWorks = function (_BaseComponent) {
  _inherits(HotWorks, _BaseComponent);

  function HotWorks() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HotWorks);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HotWorks.__proto__ || Object.getPrototypeOf(HotWorks)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "rankList"], _this.state = {}, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HotWorks, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(HotWorks.prototype.__proto__ || Object.getPrototypeOf(HotWorks.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      wx.reportAnalytics('hotworks_onload', {});
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var rankList = this.__props.rankList;

      var loopArray0 = rankList ? rankList.map(function (el, i) {
        el = {
          $original: (0, _index2.internal_get_original)(el)
        };
        var $loopState__temp2 = rankList ? {
          src: el.$original['headPhoto'],
          name: el.$original['authorName'],
          level: el.$original['abilityLevel'],
          studentId: el.$original['studentId']
        } : null;
        var $loopState__temp4 = rankList ? (0, _util.timestampFormat)(el.$original['createDate']) : null;
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $original: el.$original
        };
      }) : [];
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        rankList: rankList
      });
      return this.__state;
    }
  }]);

  return HotWorks;
}(_index2.Component);

// export default HotWorks as ComponentClass<PageOwnProps, {}>

HotWorks.properties = {
  "rankList": {
    "type": null,
    "value": null
  }
};
HotWorks.$$events = [];
exports.default = HotWorks;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(HotWorks));