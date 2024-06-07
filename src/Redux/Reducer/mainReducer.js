import mainTypes from "../Action/mainTypes";

const initialState = {
  error: false,
  loading: false,
  language: "vn",
  confirmed: -1,
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case mainTypes.CONFIRM:
      return {
        ...state,
        confirmed: action.payload,
      };
    case mainTypes.DONE_JOB:
      return {
        ...state,
        confirmed: -1,
      };
    default:
      return state;
  }
}
