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

var _util = require("../../util/util.js");

var _auth = require("../../actions/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var history = (_dec = (0, _index4.connect)(function (_ref) {
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
  _inherits(history, _BaseComponent);

  function history() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, history);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = history.__proto__ || Object.getPrototypeOf(history)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "list", "pageNum", "footerText", "nothing", "authData"], _this.config = {
      navigationBarTitleText: '浏览历史'
    }, _this.state = {
      list: [],
      pageNum: 0,
      footerText: '',
      nothing: false
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(history, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(history.prototype.__proto__ || Object.getPrototypeOf(history.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.getUserBrowseHistoryList();
    }
  }, {
    key: "onReachBottom",
    value: function onReachBottom() {
      console.log('上拉/');
      this.getUserBrowseHistoryList();
    }
  }, {
    key: "getUserBrowseHistoryList",
    value: function getUserBrowseHistoryList() {
      var _this2 = this;

      _index3.default.showLoading({
        title: '加载中'
      });
      this.setState({ pageNum: this.state.pageNum + 1 }, function () {
        var url = '/v1/littleApp/getUserBrowseHistoryList';
        (0, _requestService.request)(url, {
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: {
            token: _this2.props.authData.token,
            pageNum: _this2.state.pageNum
          }
        }).then(function (res) {
          console.log('浏览历史', res);
          // if (res) {
          //     this.setState({ list: this.state.list.concat(res) })
          // } else {
          //     this.setState({ footerText: '没有更多了...' })
          // }

          if (res && res.length) {
            _this2.setState({
              list: _this2.state.list.concat(res)
            });
          } else if (_this2.state.pageNum !== 1) {
            _this2.setState({
              footerText: '没有更早的浏览作品了'
            });
          } else if (_this2.state.pageNum === 1) {
            _this2.setState({
              footerText: '您浏览过的作品都会显示在这里哦～',
              nothing: true
            });
          }

          if (res && res.length < 20) {
            _this2.setState({
              footerText: '没有更早的浏览作品了'
            });
          } else if (res && res.length === 20) {
            _this2.setState({
              footerText: '上拉加载更多...'
            });
          }
          _index3.default.hideLoading();
        });
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var loopArray0 = this.__state.list.map(function (el, i) {
        el = {
          $original: (0, _index2.internal_get_original)(el)
        };
        var $loopState__temp2 = {
          src: el.$original['headPhoto'],
          name: el.$original['authorName'],
          level: el.$original['abilityLevel'],
          studentId: el.$original['studentId']
        };
        var $loopState__temp4 = (0, _util.timestampFormat)(el.$original['createDate']);
        var $loopState__temp6 = (0, _util.timestampFormat)(el.$original['browsTime'], 'pre');
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $loopState__temp6: $loopState__temp6,
          $original: el.$original
        };
      });

      Object.assign(this.__state, {
        loopArray0: loopArray0
      });
      return this.__state;
    }
  }]);

  return history;
}(_index2.Component)) || _class);
history.properties = {
  "authData": {
    "type": null,
    "value": null
  }
};
history.$$events = [];
exports.default = history;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(history, true));