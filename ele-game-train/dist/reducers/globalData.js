'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = globalData;

var _globalData = require('../constants/globalData.js');

var INITIAL_STATE = {
  videoBg: '',
  videoURL: '',
  teacherModel: '',
  phaseName: '',
  startTime: '',
  playVideoIndex: 1,
  boughtStartTime: '',
  boughtPhaseName: '',
  token: '',
  openId: '',
  pageNum: 1,
  currentTab: 0,
  showPopup: true
};
function globalData() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _globalData.BOUGHT_START_TIME:
      return _extends({}, state, {
        boughtStartTime: action.value
      });
    case _globalData.BOUGHT_PHASE_NAME:
      return _extends({}, state, {
        boughtPhaseName: action.value
      });
    case _globalData.VIDEO_BG:
      return _extends({}, state, {
        videoBg: action.value
      });
    case _globalData.VIDEO_URL:
      return _extends({}, state, {
        videoURL: action.value
      });
    case _globalData.TEACHER_MOBEL:
      return _extends({}, state, {
        teacherModel: action.value
      });
    case _globalData.PHASE_NAME:
      return _extends({}, state, {
        phaseName: action.value
      });
    case _globalData.START_TIME:
      return _extends({}, state, {
        startTime: action.value
      });
    case _globalData.PLAY_VIDEO_INDEX:
      return _extends({}, state, {
        playVideoIndex: action.value
      });
    case _globalData.TOKEN:
      return _extends({}, state, {
        token: action.value
      });
    case _globalData.PAGE_NUM:
      return _extends({}, state, {
        pageNum: action.value
      });
    case _globalData.CURRENT_TAB:
      return _extends({}, state, {
        currentTab: action.value
      });
    case _globalData.SHOW_POPUP:
      return _extends({}, state, {
        showPopup: action.value
      });
    default:
      return state;
  }
}