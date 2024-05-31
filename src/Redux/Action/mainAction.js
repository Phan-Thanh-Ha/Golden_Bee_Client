import mainTypes from "./mainTypes";

export function closeError(params, cb) {
  return {
    type: mainTypes.ERROR,
    params,
  };
}
