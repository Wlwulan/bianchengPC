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

var _url = require("../../config/url.js");

var _url2 = _interopRequireDefault(_url);

var _utilsService = require("../../service/utils.service.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shareMsg = {
  authorid: '',
  imgUrl: '',
  title: '',
  page: '',
  clockIn: false
};

var webView = (_dec = (0, _index3.connect)(function (_ref) {
  var authData = _ref.authData,
      courseData = _ref.courseData,
      payInfoData = _ref.payInfoData;
  return {
    authData: authData
  };
}, function (dispatch) {
  return {
    setAuthData: function (_setAuthData) {
      function setAuthData(_x) {
        return _setAuthData.apply(this, arguments);
      }

      setAuthData.toString = function () {
        return _setAuthData.toString();
      };

      return setAuthData;
    }(function (data) {
      dispatch(setAuthData(data));
    })
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(webView, _BaseComponent);

  function webView() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, webView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = webView.__proto__ || Object.getPrototypeOf(webView)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["src", "authData"], _this.config = {
      pages: ['pages/webView/webView']
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(webView, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(webView.prototype.__proto__ || Object.getPrototypeOf(webView.prototype), "_constructor", this).call(this, props);
      this.state = {
        src: ''
      };
    }
  }, {
    key: "switchUrl",
    value: function switchUrl() {
      var _$router$params = this.$router.params,
          pageName = _$router$params.pageName,
          authorid = _$router$params.authorid,
          authorId = authorid ? '&authorid=' + authorid : '',
          src = '';

      switch (pageName) {
        case 'index':
          // 预览页
          src = _url2.default.webviewUrl + 'scratch/index.html?workId=' + this.$router.params.id + '&token=' + this.props.authData.token + '&fullscreen=true&sourceh5=miniProgram' + authorId;
          break;
        case 'allworks':
          // 个人主页
          src = _url2.default.webviewUrl + 'activity/allworks/allworks.html?studentId=' + this.$router.params.id + '&token=' + this.props.authData.token + '&source=miniProgram';
      }
      this.setState({
        src: src
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.switchUrl();
    }
  }, {
    key: "onShareAppMessage",
    value: function onShareAppMessage(res) {
      var _this2 = this;

      // console.log(res);
      var webViewUrl = res.webViewUrl;
      var _shareMsg = shareMsg,
          page = _shareMsg.page,
          clockIn = _shareMsg.clockIn;
      var _$router$params2 = this.$router.params,
          authorid = _$router$params2.authorid,
          id = _$router$params2.id;

      var authorId = authorid ? '&authorid=' + authorid : '';

      switch (page) {
        case 'index':
          if (clockIn) {
            this.clockIn(webViewUrl, this.getId(webViewUrl, 'workId'));
          } else {
            setTimeout(function () {
              (0, _utilsService.redirectTo)('webView', "pageName=index&id=" + _this2.getId(webViewUrl, 'workId') + "&" + authorId);
            }, 2000);
          }
          return {
            title: shareMsg.title,
            path: '/pages/index/index?id=' + this.getId(webViewUrl, 'workId') + '&source=index' + shareMsg.authorid,
            imageUrl: shareMsg.imgUrl
          };
          break;
        case 'allworks':
          setTimeout(function () {
            (0, _utilsService.redirectTo)('webView', "pageName=allworks&id=" + _this2.getId(webViewUrl, 'studentId'));
          }, 2000);
          return {
            title: shareMsg.title,
            path: '/pages/index/index?id=' + this.getId(webViewUrl, 'studentId') + '&source=allworks',
            imageUrl: shareMsg.imgUrl

          };
          break;
      }
    }
  }, {
    key: "clockIn",
    value: function clockIn(webViewUrl, id) {
      var url = '/v1/homework/clockIn';
      _index2.default.request({
        method: 'POST',
        url: _url2.default.baseUrl + url,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          token: this.props.authData.token,
          workId: this.getId(webViewUrl, 'workId')
        }
      }).then(function (res) {
        (0, _utilsService.redirectTo)('webView', "pageName=index&id=" + id);
      });
    }
  }, {
    key: "getId",
    value: function getId(url, name) {
      var index = url.indexOf('?');
      var params = url.substring(index + 1, url.length);
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = params.match(reg);
      if (r != null) {
        return unescape(r[2]);
      }return null;
    }
  }, {
    key: "handleMsg",
    value: function handleMsg(e) {
      var data = e.detail.data[e.detail.data.length - 1];
      var imgUrl = data.imgUrl,
          title = data.title,
          page = data.page;

      var authorid = '';
      var clockIn = false;

      if (data.authorid) {
        authorid = data.authorid;
      };
      if (data.clockIn) {
        clockIn = data.clockIn;
      };
      shareMsg = {
        authorid: authorid ? '&authorid=' + authorid : '',
        imgUrl: imgUrl,
        title: title,
        page: page,
        clockIn: clockIn
      };
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

  return webView;
}(_index.Component)) || _class);
webView.properties = {
  "authData": {
    "type": null,
    "value": null
  }
};
webView.$$events = ["handleMsg"];
exports.default = webView;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(webView, true));