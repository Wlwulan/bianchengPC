"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setShowPopup = exports.setCurrentTab = exports.setPageNum = exports.setToken = exports.setPlayVideoIndex = exports.setStartTime = exports.setPhaseName = exports.setTeacherMobel = exports.setVideoURL = exports.setVideoBg = exports.setBoughtStartTime = exports.setBoughtPhaseName = undefined;

var _globalData = require("../constants/globalData.js");

var setBoughtPhaseName = exports.setBoughtPhaseName = function setBoughtPhaseName(value) {
  return {
    type: _globalData.BOUGHT_PHASE_NAME,
    value: value
  };
};
var setBoughtStartTime = exports.setBoughtStartTime = function setBoughtStartTime(value) {
  return {
    type: _globalData.BOUGHT_START_TIME,
    value: value
  };
};
var setVideoBg = exports.setVideoBg = function setVideoBg(value) {
  return {
    type: _globalData.VIDEO_BG,
    value: value
  };
};
var setVideoURL = exports.setVideoURL = function setVideoURL(value) {
  return {
    type: _globalData.VIDEO_URL,
    value: value
  };
};
var setTeacherMobel = exports.setTeacherMobel = function setTeacherMobel(value) {
  return {
    type: _globalData.TEACHER_MOBEL,
    value: value
  };
};
var setPhaseName = exports.setPhaseName = function setPhaseName(value) {
  return {
    type: _globalData.PHASE_NAME,
    value: value
  };
};
var setStartTime = exports.setStartTime = function setStartTime(value) {
  return {
    type: _globalData.START_TIME,
    value: value
  };
};
var setPlayVideoIndex = exports.setPlayVideoIndex = function setPlayVideoIndex(value) {
  return {
    type: _globalData.PLAY_VIDEO_INDEX,
    value: value
  };
};
var setToken = exports.setToken = function setToken(value) {
  return {
    type: _globalData.TOKEN,
    value: value
  };
};
var setPageNum = exports.setPageNum = function setPageNum(value) {
  return {
    type: _globalData.PAGE_NUM,
    value: value
  };
};
var setCurrentTab = exports.setCurrentTab = function setCurrentTab(value) {
  return {
    type: _globalData.CURRENT_TAB,
    value: value
  };
};
var setShowPopup = exports.setShowPopup = function setShowPopup(value) {
  return {
    type: _globalData.SHOW_POPUP,
    value: value
  };
};
// export const setPlayScrollVideo = () => {
//   return dispatch => {
//     const query = Taro.createSelectorQuery().in(this.$scope)
//     query.selectAll('.recommendedLogo').boundingClientRect()
//     query.exec((res) => {
//       for (let i = 0, len = res[0].length; i < len; i++) {
//         if (res[0][i].top >= 0 && res[0][i].top <= 200 && this.props.globalData.playVideoIndex !== i+1) {
//           dispatch(setPlayVideoIndex(i+1));
//           break;
//         }
//       }   
//     })
//   }  
// }
// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }