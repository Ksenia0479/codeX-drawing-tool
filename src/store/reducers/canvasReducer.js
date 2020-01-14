import _ from "lodash";

// constants
import * as types from "store/constants";

const defaultState = { result: [], data: [] };

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.UPDATE_CANVAS:
      return {
        ...state,
        ...payload,
        result: [...state.result, _.cloneDeep(payload.data)]
      };

    default:
      return state;
  }
};
