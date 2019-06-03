"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalContainerService = function (_BaseComponent) {
  _inherits(ModalContainerService, _BaseComponent);

  function ModalContainerService() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ModalContainerService);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalContainerService.__proto__ || Object.getPrototypeOf(ModalContainerService)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["__fn_onCloseModal", "top", "children"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ModalContainerService, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(ModalContainerService.prototype.__proto__ || Object.getPrototypeOf(ModalContainerService.prototype), "_constructor", this).call(this, props);
      this.onCloseModal = this.onCloseModal.bind(this);
    }
  }, {
    key: "onCloseModal",
    value: function onCloseModal() {
      this.__triggerPropsFn("onCloseModal", [null].concat([]));
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

  return ModalContainerService;
}(_index.Component);

ModalContainerService.properties = {
  "__fn_onCloseModal": {
    "type": null,
    "value": null
  },
  "top": {
    "type": null,
    "value": null
  }
};
ModalContainerService.$$events = [];

ModalContainerService.defaultProps = {
  top: 0
};
exports.default = ModalContainerService;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(ModalContainerService));