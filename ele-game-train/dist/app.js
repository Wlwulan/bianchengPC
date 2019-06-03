"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

require("./npm/@tarojs/async-await/index.js");

var _index = require("./npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _gioMinp = require("./util/gio-minp.js");

var _gioMinp2 = _interopRequireDefault(_gioMinp);

var _index3 = require("./npm/@tarojs/redux/index.js");

var _index4 = require("./store/index.js");

var _index5 = _interopRequireDefault(_index4);

var _routerParams = require("./actions/routerParams.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _gioMinp2.default)('init', '804ab161f8d7bdf5', 'wx543b1c372161fcab', {
  version: '1.0',
  taro: _index2.default
});

var store = (0, _index5.default)();
(0, _index3.setStore)(store);

var _App = (_dec = (0, _index3.connect)(function () {
  return {};
}, function (dispatch) {
  return {
    setRouterParams: function setRouterParams(data) {
      dispatch((0, _routerParams.setRouterParams)(data));
    }
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    _classCallCheck(this, _App);

    var _this = _possibleConstructorReturn(this, (_App.__proto__ || Object.getPrototypeOf(_App)).call(this));

    _this.config = {
      pages: ['pages/index/index', 'pages/works/works', 'pages/payV2/payV2', 'pages/payChoice/payChoice', 'pages/paySuccess/paySuccess', 'pages/creatClass/creatClass', 'pages/personal/personal', 'pages/editProduct/editProduct', 'pages/likeNotifications/likeNotifications', 'pages/myProduct/myProduct', 'pages/webView/webView', 'pages/history/history', 'pages/myFavor/myFavor', 'pages/authorize/authorize', 'pages/myWorks/myWorks', "pages/protocol/protocol"],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '',
        navigationBarTextStyle: 'black'
      },
      "tabBar": {
        "color": "#a5a5a5",
        "selectedColor": "#5ca7ff",
        "list": [{
          "pagePath": "pages/works/works",
          "text": "作品集",
          "iconPath": "static/images/tabBar_default1.png",
          "selectedIconPath": "static/images/tabBar_selected1.png"
        }, {
          "pagePath": "pages/creatClass/creatClass",
          "text": "创作课堂",
          "iconPath": "static/images/tabBar_default2.png",
          "selectedIconPath": "static/images/tabBar_selected2.png"
        }, {
          "pagePath": "pages/personal/personal",
          "text": "我的创作",
          "iconPath": "static/images/tabBar_default3.png",
          "selectedIconPath": "static/images/tabBar_selected3.png"
        }]
      },
      onReachBottomDistance: 80
    };
    return _this;
  }

  _createClass(_App, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var params = this.$router.params; //获取所有参数
      if (JSON.stringify(params.query) === "{}") {
        return;
      }this.props.setRouterParams(params);
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentCatchError",
    value: function componentCatchError() {}
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component)) || _class);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});