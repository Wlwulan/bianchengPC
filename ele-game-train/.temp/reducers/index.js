import { combineReducers } from 'redux';
import globalData from "./globalData";
import systemData from "./system";
import authData from "./auth";
import courseData from "./course";
import payInfoData from "./pay";
import productInfo from "./productInfo";
import appParams from "./appParams";
import routerParams from "./routerParams";
export default combineReducers({
  globalData,
  systemData,
  authData,
  courseData,
  payInfoData,
  productInfo,
  appParams,
  routerParams
});