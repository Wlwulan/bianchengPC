"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _requestService = require("../../service/request.service.js");

var _util = require("../../util/util.js");

var _index3 = require("../../npm/@tarojs/redux/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var myWorks = (_dec = (0, _index3.connect)(function (_ref) {
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
  _inherits(myWorks, _BaseComponent);

  function myWorks() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, myWorks);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = myWorks.__proto__ || Object.getPrototypeOf(myWorks)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "isShowModel", "myProductList", "pageNum", "footerText", "nothing", "isShowEditToast", "isPublished", "menuBtn1", "menuBtn2", "modalSwitch", "currentIndex", "authData"], _this.config = {
      pages: ['pages/myWorks/myWorks'],
      navigationBarTitleText: '我的作业',
      onReachBottomDistance: 50
    }, _this.toggleModel = function () {
      // 关闭弹窗
      _this.setState({
        isShowModel: !_this.state.isShowModel
      });
    }, _this.listMenu = function (i) {
      // 点击列表作品
      console.log(_this.state.myProductList[i].Showstate);
      _this.setState({
        isShowEditToast: true,
        // isPublished: this.state.myProductList[i].showStatus
        isPublished: _this.state.myProductList[i].Showstate,
        workId: _this.state.myProductList[i].Worksid,
        currentIndex: i
      });
    }, _this.select = function (el, i) {
      // 点击菜单按钮
      console.log(el, i);
      if (el.disabled) {
        // 不可点击
        _this.setState({
          isShowModel: true,
          modalSwitch: 1
        });
        return;
      }
      if (i === 0) {
        // 预览
        _index2.default.navigateTo({
          url: '/pages/webView/webView?pageName=index&id=' + _this.state.workId
        });
      } else if (i === 1) {
        // 发布/下架
        var isPublished = _this.state.isPublished;
        if (isPublished) {
          // 已发布，需下架
          _this.setState({
            isShowModel: true,
            modalSwitch: 2
          });
        } else {
          // 未发布，需上架
          // let operation = isPublished ? 1 : 0
          _this.operateWork(1);
        }
      }
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(myWorks, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(myWorks.prototype.__proto__ || Object.getPrototypeOf(myWorks.prototype), "_constructor", this).call(this, props);
      this.state = {
        myProductList: [], // 作品列表
        pageNum: 0,
        footerText: '',
        nothing: false,
        isShowModel: false,
        isShowEditToast: false,
        isPublished: '', // 点击作品是否发布（0-未发布；1-发布）
        menuBtn1: [// 菜单按钮（未发布）
        {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/preview.png',
          'txt': '预览',
          'disabled': false
        }, {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/publish.png',
          'txt': '发布',
          'disabled': false
        }, {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/change-information-gray.png',
          'txt': '修改作品信息',
          'disabled': true
        }, {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/delete-gray.png',
          'txt': '删除',
          'disabled': true
        }],
        menuBtn2: [// 菜单按钮（已发布）
        {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/preview.png',
          'txt': '预览',
          'disabled': false
        }, {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/undercarriage.png',
          'txt': '下架',
          'disabled': false
        }, {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/change-information-gray.png',
          'txt': '修改作品信息',
          'disabled': true
        }, {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/delete-gray.png',
          'txt': '删除',
          'disabled': true
        }],
        modalSwitch: '', // 弹框（1-点击灰色按钮；2-下架确认；3-删除确认）
        currentIndex: ''
      };
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      this.getMyProductList();
    }

    // onHide

  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      this.state.isShowModel = false;
      this.state.myProductList = [];
      this.state.pageNum = 0;
      this.state.isShowEditToast = false;
    }

    // onUnload

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "onReachBottom",
    value: function onReachBottom() {
      console.log('上拉/');
      this.getMyProductList();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      // 取消菜单编辑
      this.setState({
        isShowEditToast: false
      });
    }
  }, {
    key: "getMyProductList",
    value: function getMyProductList() {
      var _this2 = this;

      // 获取作品列表
      this.setState({ pageNum: this.state.pageNum + 1 }, function () {

        (0, _requestService.request)('/v1/littleApp/getUserWorksList', {
          method: 'POST',
          data: {
            token: _this2.props.authData.token,
            pageNum: _this2.state.pageNum,
            workType: 1
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function (res) {
          console.log('个人作品', res);
          if (res && res.length) {
            _this2.setState({
              myProductList: _this2.state.myProductList.concat(res)
            });
          } else if (_this2.state.pageNum !== 1) {
            _this2.setState({
              footerText: '没有更多作品了'
            });
          } else if (_this2.state.pageNum === 1) {
            _this2.setState({
              footerText: '您还没有完成作业哦，快去完成自己的第一份作业吧！',
              nothing: true
            });
          }

          if (res && res.length < 20) {
            _this2.setState({
              footerText: '没有更多作品了'
            });
          } else if (res && res.length === 20) {
            _this2.setState({
              footerText: '上拉加载更多...'
            });
          }
        });
      });
    }
  }, {
    key: "operateWork",
    value: function operateWork(operation) {
      var _this3 = this;

      // 编辑作品（0-下架；1-发布；2-删除）
      (0, _requestService.request)('/v1/littleApp/operateWork', {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.props.authData.token,
          workId: this.state.workId,
          operation: operation
        }
      }).then(function (res) {
        console.log('operateWork', res);
        var toastTit = '';
        var myProductList = _this3.state.myProductList;
        switch (operation) {
          case 0:
            toastTit = '下架成功';
            _this3.setState({
              isShowModel: false
            });

            myProductList[_this3.state.currentIndex].Showstate = 0;
            _this3.setState({
              myProductList: myProductList,
              isPublished: false
            });
            break;
          case 1:
            toastTit = '发布成功';
            myProductList[_this3.state.currentIndex].Showstate = 1;
            _this3.setState({
              myProductList: myProductList,
              isPublished: true
            });
            break;
          case 2:
            toastTit = '删除成功';
            myProductList.splice(_this3.state.currentIndex, 1);
            _this3.setState({
              myProductList: myProductList,
              isShowModel: false
            });

        }
        (0, _util.showToast)(toastTit);
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var loopArray0 = this.__state.myProductList.map(function (el, i) {
        el = {
          $original: (0, _index.internal_get_original)(el)
        };

        var date = (0, _util.timestampFormat)(el.$original.UpdateTime);
        return {
          date: date,
          $original: el.$original
        };
      });

      Object.assign(this.__state, {
        loopArray0: loopArray0
      });
      return this.__state;
    }
  }]);

  return myWorks;
}(_index.Component)) || _class);
//
// export default myProduct as ComponentClass<PageOwnProps, PageState>

myWorks.properties = {
  "authData": {
    "type": null,
    "value": null
  }
};
myWorks.$$events = ["listMenu", "cancel", "select", "toggleModel", "operateWork"];
exports.default = myWorks;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(myWorks, true));