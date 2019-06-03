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

var _globalData = require("../../actions/globalData.js");

var _util = require("../../util/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecommendedLogos = (_dec = (0, _index4.connect)(function (_ref) {
  var globalData = _ref.globalData;
  return {
    globalData: globalData
  };
}, function (dispatch) {
  return {
    setPlayVideoIndex: function setPlayVideoIndex(videoBg) {
      dispatch((0, _globalData.setPlayVideoIndex)(videoBg));
    }
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(RecommendedLogos, _BaseComponent);

  function RecommendedLogos() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, RecommendedLogos);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = RecommendedLogos.__proto__ || Object.getPrototypeOf(RecommendedLogos)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "commandList", "pageNum", "getMoreTxt", "__fn_on", "setPlayVideoIndex", "globalData"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecommendedLogos, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(RecommendedLogos.prototype.__proto__ || Object.getPrototypeOf(RecommendedLogos.prototype), "_constructor", this).call(this, props);
      this.state = {
        pageNum: 1,
        getMoreTxt: ''
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      wx.reportAnalytics('recommendedlogos_onload', {});
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      _index3.default.eventCenter.on('selevtScrollVideo', (0, _util.throttle)(this.playScrollVideo.bind(this), 100));
      this.props.setPlayVideoIndex(-1);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "playScrollVideo",
    value: function playScrollVideo() {
      var _this2 = this;

      var query = _index3.default.createSelectorQuery().in(this.$scope);
      query.selectAll('.recommendedLogo').boundingClientRect();
      query.exec(function (res) {
        for (var i = 0, len = res[0].length; i < len; i++) {
          if (res[0][i].top >= 0 && res[0][i].top <= 200 && _this2.props.globalData.playVideoIndex !== i + 1) {
            _this2.props.setPlayVideoIndex(i + 1);
            break;
          }
        }
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var commandList = this.__props.commandList;

      var loopArray0 = commandList.map(function (el, i) {
        el = {
          $original: (0, _index2.internal_get_original)(el)
        };
        var $loopState__temp2 = {
          src: el.$original['Studentinfo']['headPhoto'],
          name: el.$original['Studentinfo']['studentName'],
          level: el.$original['Studentinfo']['abilityLevel'],
          isPurchase: el.$original['Studentinfo']['isPurchase'],
          studentId: el.$original['Studentinfo']['studentId']
        };
        var $loopState__temp4 = i + 1;
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $original: el.$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        commandList: commandList
      });
      return this.__state;
    }
  }]);

  return RecommendedLogos;
}(_index2.Component)) || _class);
RecommendedLogos.properties = {
  "__fn_on": {
    "type": null,
    "value": null
  },
  "setPlayVideoIndex": {
    "type": null,
    "value": null
  },
  "globalData": {
    "type": null,
    "value": null
  },
  "commandList": {
    "type": null,
    "value": null
  }
};
RecommendedLogos.$$events = [];
RecommendedLogos.defaultProps = {
  commandList: []
};
exports.default = RecommendedLogos;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(RecommendedLogos));