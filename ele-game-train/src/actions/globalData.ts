import {
  VIDEO_BG,
  VIDEO_URL,
  TEACHER_MOBEL,
  PHASE_NAME,
  START_TIME,
  PLAY_VIDEO_INDEX,
  BOUGHT_PHASE_NAME,
  BOUGHT_START_TIME,
  TOKEN,
  PAGE_NUM,
  CURRENT_TAB,
  SHOW_POPUP
} from '../constants/globalData'

export const setBoughtPhaseName = (value) => {
  return {
    type: BOUGHT_PHASE_NAME,
    value: value
  }
}

export const setBoughtStartTime = (value) => {
  return {
    type: BOUGHT_START_TIME,
    value: value
  }
}

export const setVideoBg = (value) => {
  return {
    type: VIDEO_BG,
    value: value
  }
}

export const setVideoURL = (value) => {
  return {
    type: VIDEO_URL,
    value: value
  }
}

export const setTeacherMobel = (value) => {
  return {
    type: TEACHER_MOBEL,
    value: value
  }
}

export const setPhaseName = (value) => {
  return {
    type: PHASE_NAME,
    value: value
  }
}

export const setStartTime = (value) => {
  return {
    type: START_TIME,
    value: value
  }
}

export const setPlayVideoIndex = (value) => {
  return {
    type: PLAY_VIDEO_INDEX,
    value: value
  }
}

export const setToken = (value) => {
  return {
    type: TOKEN,
    value: value
  }
}
export const setPageNum = (value) => {
  return {
    type: PAGE_NUM,
    value: value
  }
}
export const setCurrentTab = (value) => {
  return {
    type: CURRENT_TAB,
    value: value
  }
}
export const setShowPopup = (value) => {
  return {
    type: SHOW_POPUP,
    value: value
  }
}
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