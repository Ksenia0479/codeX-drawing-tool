// constants
import * as types from "store/constants";

const addAlert = (message, type) => {
  return { type: types.ADD_ALERT, payload: { message, type } };
};

const removeAlert = id => {
  return { type: types.REMOVE_ALERT, payload: { id } };
};

export { addAlert, removeAlert };
