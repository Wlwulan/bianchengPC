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

var _util = require("../../util/util.js");

var _globalData = require("../../actions/globalData.js");

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
    setPlayVideoIndex: function setPlayVideoIndex(playVideoIndex) {
      dispatch((0, _globalData.setPlayVideoIndex)(playVideoIndex));
    },
    setShowPopup: function setShowPopup(value) {
      dispatch((0, _globalData.setShowPopup)(value));
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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = RecommendedLogos.__proto__ || Object.getPrototypeOf(RecommendedLogos)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["userInfo", "playVideoIndex", "curNumber", "poster", "videoSrc", "direction", "workerId", "likeNum", "title", "isPlay", "globalData", "setPlayVideoIndex", "setShowPopup"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecommendedLogos, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(RecommendedLogos.prototype.__proto__ || Object.getPrototypeOf(RecommendedLogos.prototype), "_constructor", this).call(this, props);
      this.state = {
        isPlay: false,
        direction: 90
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setDirection();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.curNumber === this.props.globalData.playVideoIndex) {
        _index3.default.createVideoContext('video' + this.props.curNumber, this.$scope).play();
        this.setState({
          isPlay: true
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // if (this.state.isPlay || this.props.curNumber === nextProps.globalData.playVideoIndex) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
  }, {
    key: "bindPlay",
    value: function bindPlay() {}
  }, {
    key: "bindEnded",
    value: function bindEnded() {
      this.props.setPlayVideoIndex(-1);
      this.props.setShowPopup(true);
    }
  }, {
    key: "toAuthorize",
    value: function toAuthorize(source, id) {
      (0, _util.toAuthorize)(source, id);
    }
  }, {
    key: "playCurrVideo",
    value: function playCurrVideo(e) {
      wx.reportAnalytics('video_click', {});
      if (this.props.curNumber !== this.props.globalData.playVideoIndex) {
        this.props.setPlayVideoIndex(this.props.curNumber);
      }
    }
  }, {
    key: "fullscreen",
    value: function fullscreen(e) {
      console.log('quanping', e);
      if (e.detail.fullScreen) {
        this.props.setShowPopup(false);
      } else {
        this.props.setShowPopup(true);
      }
    }
  }, {
    key: "setDirection",
    value: function setDirection() {
      var _this2 = this;

      var _Taro$getSystemInfoSy = _index3.default.getSystemInfoSync(),
          system = _Taro$getSystemInfoSy.system;

      var regexp = /android/i;
      this.setState({
        direction: regexp.test(system) ? 0 : 90
      }, function () {
        console.log('direction', _this2.state.direction);
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _props = this.__props,
          userInfo = _props.userInfo,
          videoSrc = _props.videoSrc,
          likeNum = _props.likeNum,
          title = _props.title,
          curNumber = _props.curNumber,
          poster = _props.poster,
          workerId = _props.workerId,
          globalData = _props.globalData;
      var playVideoIndex = globalData.playVideoIndex;
      var direction = this.__state.direction;


      Object.assign(this.__state, {
        userInfo: userInfo,
        playVideoIndex: playVideoIndex,
        curNumber: curNumber,
        poster: poster,
        videoSrc: videoSrc,
        workerId: workerId,
        likeNum: likeNum,
        title: title
      });
      return this.__state;
    }
  }]);

  return RecommendedLogos;
}(_index2.Component)) || _class);
RecommendedLogos.properties = {
  "curNumber": {
    "type": null,
    "value": null
  },
  "globalData": {
    "type": null,
    "value": null
  },
  "setPlayVideoIndex": {
    "type": null,
    "value": null
  },
  "setShowPopup": {
    "type": null,
    "value": null
  },
  "userInfo": {
    "type": null,
    "value": null
  },
  "videoSrc": {
    "type": null,
    "value": null
  },
  "likeNum": {
    "type": null,
    "value": null
  },
  "title": {
    "type": null,
    "value": null
  },
  "poster": {
    "type": null,
    "value": null
  },
  "workerId": {
    "type": null,
    "value": null
  }
};
RecommendedLogos.$$events = ["toAuthorize", "playCurrVideo", "bindPlay", "bindEnded", "fullscreen"];
RecommendedLogos.defaultProps = {
  likeNum: 0
};
exports.default = RecommendedLogos;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(RecommendedLogos));