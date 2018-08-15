import { createAction, handleActions } from "redux-actions";

const defaultState = {
  user: {},
  currentView: "WELCOME"
};

export const updateCurrentView = createAction("UPDATE_CURRENT_VIEW");
export const setUserData = createAction("SET_USER_DATA");
const reducer = handleActions(
  {
    SET_USER_DATA: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        ...payload
      };
    }
  },
  defaultState
);

export default reducer;
