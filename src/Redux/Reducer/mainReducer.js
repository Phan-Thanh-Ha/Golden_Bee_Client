import { StorageNames } from "../../Constants";
import { setData } from "../../Utils";
import mainTypes from "../Action/mainTypes";

const initialState = {
  error: false,
  loading: false,
  language: "vn",
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
