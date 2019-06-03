import { VIDEO_BG, VIDEO_URL, TEACHER_MOBEL, PHASE_NAME, START_TIME, PLAY_VIDEO_INDEX, BOUGHT_PHASE_NAME, BOUGHT_START_TIME, TOKEN, PAGE_NUM, CURRENT_TAB, SHOW_POPUP } from "../constants/globalData";
const INITIAL_STATE = {
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
export default function globalData(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOUGHT_START_TIME:
      return {
        ...state,
        boughtStartTime: action.value
      };
    case BOUGHT_PHASE_NAME:
      return {
        ...state,
        boughtPhaseName: action.value
      };
    case VIDEO_BG:
      return {
        ...state,
        videoBg: action.value
      };
    case VIDEO_URL:
      return {
        ...state,
        videoURL: action.value
      };
    case TEACHER_MOBEL:
      return {
        ...state,
        teacherModel: action.value
      };
    case PHASE_NAME:
      return {
        ...state,
        phaseName: action.value
      };
    case START_TIME:
      return {
        ...state,
        startTime: action.value
      };
    case PLAY_VIDEO_INDEX:
      return {
        ...state,
        playVideoIndex: action.value
      };
    case TOKEN:
      return {
        ...state,
        token: action.value
      };
    case PAGE_NUM:
      return {
        ...state,
        pageNum: action.value
      };
    case CURRENT_TAB:
      return {
        ...state,
        currentTab: action.value
      };
    case SHOW_POPUP:
      return {
        ...state,
        showPopup: action.value
      };
    default:
      return state;
  }
}