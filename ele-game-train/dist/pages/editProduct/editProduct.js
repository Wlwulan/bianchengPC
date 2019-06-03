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

var _requestService = require("../../service/request.service.js");

var _util = require("../../util/util.js");

var _index4 = require("../../npm/@tarojs/redux/index.js");

var _auth = require("../../actions/auth.js");

var _productInfo = require("../../actions/productInfo.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var editProduct = (_dec = (0, _index4.connect)(function (_ref) {
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
  _inherits(editProduct, _BaseComponent);

  function editProduct() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, editProduct);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = editProduct.__proto__ || Object.getPrototypeOf(editProduct)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["isShowModel", "transparent", "authData", "productInfo"], _this.config = {
      pages: ['pages/editProduct/editProduct'],
      navigationBarTitleText: '修改作品信息'
    }, _this.toggleModel = function () {
      // 关闭弹窗
      _this.setState({
        isShowModel: !_this.state.isShowModel,
        transparent: true
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(editProduct, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(editProduct.prototype.__proto__ || Object.getPrototypeOf(editProduct.prototype), "_constructor", this).call(this, props);
      this.state = {
        isShowModel: false
      };
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "reSure",
    value: function reSure(e) {
      var _this2 = this;

      var value = e.detail.value;
      console.log(value);
      (0, _requestService.request)('/v1/littleApp/modifyWork', {
        method: 'POST',
        data: {
          token: this.props.authData.token,
          workId: this.$router.params.workId,
          workName: value.workName,
          summary: value.summary
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (res) {
        (0, _util.showToast)('修改作品信息成功');
        _this2.setState({
          isShowModel: false,
          transparent: false
        });
        setTimeout(function () {
          _index3.default.navigateBack({
            delta: 1
          });
        }, 2000);
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.setState({
        isShowModel: !this.state.isShowModel
      });
      _index3.default.navigateBack({
        delta: 1
      });
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

  return editProduct;
}(_index2.Component)) || _class);

// export default editProduct as ComponentClass<PageOwnProps, PageState>

editProduct.properties = {
  "authData": {
    "type": null,
    "value": null
  },
  "productInfo": {
    "type": null,
    "value": null
  }
};
editProduct.$$events = ["reSure", "toggleModel", "cancel"];
exports.default = editProduct;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(editProduct, true));