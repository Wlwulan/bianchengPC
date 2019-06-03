"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _apiService = require("../../service/api.service.js");

var _utilsService = require("../../service/utils.service.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PayChoice = (_dec = (0, _index3.connect)(function (_ref) {
  var authData = _ref.authData,
      courseData = _ref.courseData;
  return {
    authData: authData,
    courseData: courseData
  };
}, function (dispatch) {
  return {};
}), _dec(_class = function (_BaseComponent) {
  _inherits(PayChoice, _BaseComponent);

  function PayChoice() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, PayChoice);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = PayChoice.__proto__ || Object.getPrototypeOf(PayChoice)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "$anonymousCallee__0", "cellphone", "isCellphoneValid", "activeClassId", "activeTimeId", "productListData", "inPurchasing", "isCheckedProtocol", "courseData", "authData"], _this.config = {
      pages: ['pages/payChoice/payChoice']
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PayChoice, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(PayChoice.prototype.__proto__ || Object.getPrototypeOf(PayChoice.prototype), "_constructor", this).call(this, props);
      this.state = {
        cellphone: '',
        isCellphoneValid: false,
        activeClassId: '',
        activeTimeId: '',
        productListData: [],
        inPurchasing: false,
        isCheckedProtocol: true
      };
    }

    // onLoad

  }, {
    key: "componentWillMount",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var courseData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                courseData = this.props.courseData;

                this.setState({
                  productListData: courseData,
                  activeClassId: courseData[0].GroupId,
                  activeTimeId: courseData[0].PhaseList[0].Phaseid
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillMount() {
        return _ref3.apply(this, arguments);
      }

      return componentWillMount;
    }()

    // onReady

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}

    // onShow

  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}

    // onHide

  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}

    // onUnload

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}

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
    key: "handleClassSelected",
    value: function handleClassSelected(e) {
      var _e$currentTarget$data = e.currentTarget.dataset,
          id = _e$currentTarget$data.id,
          timeId = _e$currentTarget$data.timeId;

      if (id === this.state.activeClassId) {
        return;
      }this.setState({
        activeClassId: id,
        activeTimeId: timeId
      });
    }
  }, {
    key: "handleTimeSelected",
    value: function handleTimeSelected(e) {
      var id = e.currentTarget.dataset.id;

      if (id === this.state.activeTimeId) {
        return;
      }this.setState({ activeTimeId: id });
    }
  }, {
    key: "filterTimeList",
    value: function filterTimeList() {
      var _this2 = this;

      var timeList = this.state.productListData.find(function (item) {
        return item.GroupId === _this2.state.activeClassId;
      });

      return timeList ? timeList.PhaseList : [];
    }
  }, {
    key: "handleDoPay",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        var _state, cellphone, activeTimeId, inPurchasing, _props$authData, token, openid, resp, _$router$params, gdt_vid, adId;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _state = this.state, cellphone = _state.cellphone, activeTimeId = _state.activeTimeId, inPurchasing = _state.inPurchasing;
                _props$authData = this.props.authData, token = _props$authData.token, openid = _props$authData.openid;

                if (!inPurchasing) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return");

              case 4:
                this.setState({ inPurchasing: true });
                _context2.next = 7;
                return (0, _apiService.doPay)({
                  phaseId: activeTimeId,
                  mobile: cellphone,
                  openId: openid,
                  token: token
                });

              case 7:
                resp = _context2.sent;
                _$router$params = this.$router.params, gdt_vid = _$router$params.gdt_vid, adId = _$router$params.adId;

                if (!(gdt_vid && adId)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 12;
                return (0, _apiService.advertBack)({
                  orderId: resp.orderId,
                  adId: adId,
                  clickId: gdt_vid
                });

              case 12:
                _index2.default.requestPayment(_extends({}, resp)).then(function () {
                  (0, _utilsService.redirectTo)('paySuccess');
                }, function () {
                  _this3.setState({ inPurchasing: false });
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleDoPay() {
        return _ref4.apply(this, arguments);
      }

      return handleDoPay;
    }()
  }, {
    key: "handleCheckboxChange",
    value: function handleCheckboxChange(e) {
      this.setState({ isCheckedProtocol: e.detail.value.length == 0 ? false : true });
    }
  }, {
    key: "toProtocol",
    value: function toProtocol() {
      (0, _utilsService.navigateTo)('protocol');
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;
      var $anonymousCallee__0 = this.filterTimeList();
      var loopArray0 = this.filterTimeList().map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = (0, _utilsService.formatTime)(item.$original.Starttime);
        return {
          $loopState__temp2: $loopState__temp2,
          $original: item.$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        $anonymousCallee__0: $anonymousCallee__0
      });
      return this.__state;
    }
  }]);

  return PayChoice;
}(_index.Component)) || _class);
PayChoice.properties = {
  "courseData": {
    "type": null,
    "value": null
  },
  "authData": {
    "type": null,
    "value": null
  }
};
PayChoice.$$events = ["handleClassSelected", "handleTimeSelected", "handleCellPhoneInput", "handleCheckboxChange", "toProtocol", "handleDoPay"];
exports.default = PayChoice;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(PayChoice, true));