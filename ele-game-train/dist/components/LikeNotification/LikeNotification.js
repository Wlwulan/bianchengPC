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

var LikeNotification = function (_BaseComponent) {
  _inherits(LikeNotification, _BaseComponent);

  function LikeNotification() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LikeNotification);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LikeNotification.__proto__ || Object.getPrototypeOf(LikeNotification)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["src", "WorkImg", "name", "time"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LikeNotification, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(LikeNotification.prototype.__proto__ || Object.getPrototypeOf(LikeNotification.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _props = this.__props,
          name = _props.name,
          time = _props.time,
          src = _props.src,
          WorkImg = _props.WorkImg;

      Object.assign(this.__state, {
        src: src,
        WorkImg: WorkImg,
        name: name,
        time: time
      });
      return this.__state;
    }
  }]);

  return LikeNotification;
}(_index.Component);

LikeNotification.properties = {
  "name": {
    "type": null,
    "value": null
  },
  "time": {
    "type": null,
    "value": null
  },
  "src": {
    "type": null,
    "value": null
  },
  "WorkImg": {
    "type": null,
    "value": null
  }
};
LikeNotification.$$events = [];

LikeNotification.defaultProps = {
  name: ''
};
exports.default = LikeNotification;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(LikeNotification));