import { SET_PRODUCT_INFO } from "../actions/productInfo";

export default function productInfo(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT_INFO:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
}