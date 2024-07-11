import mainTypes from "../Action/mainTypes";

const initialState = {
  error: false,
  loading: false,
  language: "vn",
  locationTime: {},
  acceptedOrder: {},
  myOrdersAccepted: [],
  initValueFirebase: false,
};
export default function (state = initialState, action = {}) {
  switch (action.type) {
    case mainTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case mainTypes.USER_PROFILE:
      {
        // console.log("user in redux", action.payload);
      }
      return {
        ...state,
        userLogin: action.payload,
      };
    case mainTypes.ACCEPTED_ORDER:
      {
        // console.log("oder accepted in redux", action.payload);
      }
      return {
        ...state,
        acceptedOrder: action.payload,
      };
    case mainTypes.MY_ORDER_ACCEPTED:
      {
        // console.log("my oder accepted in redux", action.payload);
      }
      return {
        ...state,
        myOrdersAccepted: action.payload,
      };
    case mainTypes.LOCATION_TIME:
      return {
        ...state,
        locationTime: action.payload,
      };
    case mainTypes.INIT_VALUE_FIREBASE:
      return {
        ...state,
        initValueFirebase: action.payload,
      };
    default:
      return state;
  }
}
