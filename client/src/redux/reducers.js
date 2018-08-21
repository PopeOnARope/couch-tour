import { createAction, handleActions } from "redux-actions";

const defaultState = {
  user: {},
  currentView: "WELCOME",
  distance: 350,
  mapViewToggled: false,
  shouldReanimate: true
};

export const updateCurrentView = createAction("UPDATE_CURRENT_VIEW");
export const setUserData = createAction("SET_USER_DATA");
export const updateDistance = createAction("UPDATE_DISTANCE");
export const toggleShowDetails = createAction("TOGGLE_SHOW_DETAILS");
export const toggleMapView = createAction("TOGGLE_MAP_VIEW");
const reducer = handleActions(
  {
    TOGGLE_SHOW_DETAILS: (state, { payload }) => {
      const currentShow = payload ? { ...payload } : null;
      return {
        ...state,
        currentShow,
        shouldReanimate: false
      };
    },
    TOGGLE_MAP_VIEW: (state, { payload }) => {
      return {
        ...state,
        mapViewToggled: !state.mapViewToggled,
        shouldReanimate: false
      };
    },
    SET_USER_DATA: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        shouldReanimate: true
      };
    },
    UPDATE_DISTANCE: (state, { payload }) => ({
      ...state,
      distance: payload,
      shouldReanimate: false
    })
  },
  defaultState
);

export default reducer;
