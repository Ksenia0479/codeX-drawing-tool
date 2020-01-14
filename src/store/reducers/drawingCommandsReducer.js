// constants
import * as types from "store/constants";

const defaultState = {
  commands: []
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_DRAWING_COMMANDS_SUCCESS:
      return { ...payload };
    default:
      return state;
  }
};
