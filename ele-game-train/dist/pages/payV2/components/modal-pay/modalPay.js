"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../../npm/@tarojs/redux/index.js");

var _apiService = require("../../../../service/api.service.js");

var _utilsService = require("../../../../service/utils.service.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalPay = (_dec = (0, _index3.connect)(function (_ref) {
  var authData = _ref.authData,
      courseData = _ref.courseData;
  return {
    authData: authData,
    courseData: courseData
  };
}, function (dispatch) {
  return {};
}), _dec(_class = function (_BaseComponent) {
  _inherits(ModalPay, _BaseComponent);

  function ModalPay() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, ModalPay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ModalPay.__proto__ || Object.getPrototypeOf(ModalPay)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["cellphone", "isCellphoneValid", "inPurchasing", "authData", "courseData", "gdt_vid", "adId"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ModalPay, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(ModalPay.prototype.__proto__ || Object.getPrototypeOf(ModalPay.prototype), "_constructor", this).call(this, props);
      this.state = {
        cellphone: '',
        isCellphoneValid: false,
        inPurchasing: false
      };
    }

    // 检测手机输入

  }, {
    key: "handleCellPhoneInput",
    value: function handleCellPhoneInput(e) {
      var cellPhoneRegExp = /^1[3|4|5|8][0-9]\d{4,8}$/;
      var val = e.detail.value;
      if (val.length === 11 && cellPhoneRegExp.test(val)) {
        this.setState({
          isCellphoneValid: true,
          cellphone: val
        });
      } else {
        this.setState({ isCellphoneValid: false });
      }
    }
  }, {
    key: "handleDoPay",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var _props$authData, openid, token, phaseId, inPurchasing, resp;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _props$authData = this.props.authData, openid = _props$authData.openid, token = _props$authData.token;
                phaseId = this.props.courseData[0].PhaseList[0].Phaseid;
                inPurchasing = this.state.inPurchasing;

                if (!inPurchasing) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                this.setState({ inPurchasing: true });
                _context.next = 8;
                return (0, _apiService.doPay)({
                  phaseId: phaseId,
                  token: token,
                  openId: openid,
                  mobile: this.state.cellphone
                });

              case 8:
                resp = _context.sent;

                if (!(this.props.gdt_vid && this.props.adId)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 12;
                return (0, _apiService.advertBack)({
                  orderId: resp.orderId,
                  adId: this.props.adId,
                  clickId: this.props.gdt_vid
                });

              case 12:
                _index2.default.requestPayment(_extends({}, resp)).then(function () {
                  (0, _utilsService.redirectTo)('paySuccess');
                }, function () {
                  _this2.setState({ inPurchasing: false });
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleDoPay() {
        return _ref3.apply(this, arguments);
      }

      return handleDoPay;
    }()
  }, {
    key: "closeModal",
    value: function closeModal() {
      _index2.default.eventCenter.trigger('modalCloseEvent', 'isModalPayShow');
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

  return ModalPay;
}(_index.Component)) || _class);
ModalPay.properties = {
  "authData": {
    "type": null,
    "value": null
  },
  "courseData": {
    "type": null,
    "value": null
  },
  "gdt_vid": {
    "type": null,
    "value": null
  },
  "adId": {
    "type": null,
    "value": null
  }
};
ModalPay.$$events = ["closeModal", "handleCellPhoneInput", "handleDoPay"];
exports.default = ModalPay;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(ModalPay));