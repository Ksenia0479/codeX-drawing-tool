import uuid from "node-uuid";
import _ from "lodash";

// constants
import * as types from "store/constants";

const initialState = [];

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case types.ADD_ALERT:
      const { payload: { type = "", message = "" } = {} } = action;

      return [
        ...state,
        {
          id: uuid(),
          type,
          message,
          timeOut: 5000,
          closeOnToastrClick: true
        }
      ];
    case types.REMOVE_ALERT:
      const { payload: { id: idToBeRemoved } = {} } = action;

      return _.filter(state, ({ id: currentId }) => {
        return currentId !== idToBeRemoved;
      });
    default:
      return state;
  }
};
