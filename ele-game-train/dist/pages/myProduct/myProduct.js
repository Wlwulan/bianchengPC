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

var _auth = require("../../actions/auth.js");

var _productInfo = require("../../actions/productInfo.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var myProduct = (_dec = (0, _index3.connect)(function (_ref) {
  var authData = _ref.authData,
      productInfo = _ref.productInfo;
  return {
    authData: authData,
    productInfo: productInfo
  };
}, function (dispatch) {
  return {
    setAuthData: function setAuthData(data) {
      dispatch((0, _auth.setAuthData)(data));
    },
    setProductInfo: function setProductInfo(data) {
      dispatch((0, _productInfo.setProductInfo)(data));
    }
  };
}), _dec(_class = function (_BaseComponent) {
  _inherits(myProduct, _BaseComponent);

  function myProduct() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, myProduct);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = myProduct.__proto__ || Object.getPrototypeOf(myProduct)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "isShowModel", "myProductList", "workName", "Comment", "nothing", "pageNum", "footerText", "isShowEditToast", "isPublished", "menuBtn1", "menuBtn2", "modalSwitch", "currentIndex", "authData", "setProductInfo"], _this.config = {
      pages: ['pages/myProduct/myProduct'],
      navigationBarTitleText: '我的作品',
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
        workName: _this.state.myProductList[i].Worksname,
        Comment: _this.state.myProductList[i].WorksBrief,
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
      } else if (i === 2) {
        // 修改作品信息
        var workName = _this.state.workName,
            comment = _this.state.Comment;
        _this.props.setProductInfo({ workName: workName, comment: comment });
        _index2.default.navigateTo({
          url: '/pages/editProduct/editProduct?workId=' + _this.state.workId
        });
      } else if (i === 3) {
        // 删除作品
        _this.setState({
          isShowModel: true,
          modalSwitch: 3
        });
      }
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(myProduct, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(myProduct.prototype.__proto__ || Object.getPrototypeOf(myProduct.prototype), "_constructor", this).call(this, props);
      this.state = {
        myProductList: [], // 作品列表
        workName: '', // 当前作品名称
        Comment: '', // 当前作品简介
        nothing: false,
        pageNum: 0,
        footerText: '',
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
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/change-information.png',
          'txt': '修改作品信息',
          'disabled': false
        }, {
          'imgUrl': 'https://appd.knowbox.cn/ss/miniapp/ele_game_register/myProduct/delete.png',
          'txt': '删除',
          'disabled': false
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
      console.log(this.props.authData.token, 'token');
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
      _index2.default.showLoading({
        title: '加载中'
      });
      this.setState({ pageNum: this.state.pageNum + 1 }, function () {

        (0, _requestService.request)('/v1/littleApp/getUserWorksList', {
          method: 'POST',
          data: {
            token: _this2.props.authData.token,
            pageNum: _this2.state.pageNum,
            workType: 2
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
              footerText: '您还没有作品哦，快去尝试作出自己的第一个作品吧！',
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

          _index2.default.hideLoading();
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
              isShowModel: false,
              isShowEditToast: false
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

  return myProduct;
}(_index.Component)) || _class);
//
// export default myProduct as ComponentClass<PageOwnProps, PageState>

myProduct.properties = {
  "authData": {
    "type": null,
    "value": null
  },
  "setProductInfo": {
    "type": null,
    "value": null
  }
};
myProduct.$$events = ["listMenu", "cancel", "select", "toggleModel", "operateWork"];
exports.default = myProduct;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(myProduct, true));