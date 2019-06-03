import { SET_ROUTER_PARAMS } from "../actions/routerParams";

export default function routerParams(state = {}, action) {
  switch (action.type) {
    case SET_ROUTER_PARAMS:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}