"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _util = require("../../util/util.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecommendedLogos = function (_BaseComponent) {
  _inherits(RecommendedLogos, _BaseComponent);

  function RecommendedLogos() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecommendedLogos);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecommendedLogos.__proto__ || Object.getPrototypeOf(RecommendedLogos)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["workerId", "workImage", "userInfo", "title", "time", "likeNum", "children"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecommendedLogos, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(RecommendedLogos.prototype.__proto__ || Object.getPrototypeOf(RecommendedLogos.prototype), "_constructor", this).call(this, props);
    }
  }, {
    key: "toAuthorize",
    value: function toAuthorize(source, id) {
      (0, _util.toAuthorize)(source, id);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _props = this.__props,
          userInfo = _props.userInfo,
          likeNum = _props.likeNum,
          title = _props.title,
          time = _props.time,
          workImage = _props.workImage,
          workerId = _props.workerId;

      Object.assign(this.__state, {
        workerId: workerId,
        workImage: workImage,
        userInfo: userInfo,
        title: title,
        time: time,
        likeNum: likeNum
      });
      return this.__state;
    }
  }]);

  return RecommendedLogos;
}(_index.Component);

RecommendedLogos.properties = {
  "userInfo": {
    "type": null,
    "value": null
  },
  "likeNum": {
    "type": null,
    "value": null
  },
  "title": {
    "type": null,
    "value": null
  },
  "time": {
    "type": null,
    "value": null
  },
  "workImage": {
    "type": null,
    "value": null
  },
  "workerId": {
    "type": null,
    "value": null
  }
};
RecommendedLogos.$$events = ["toAuthorize"];

RecommendedLogos.defaultProps = {
  likeNum: 0
};
exports.default = RecommendedLogos;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(RecommendedLogos));