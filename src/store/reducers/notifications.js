import actionTypes from "../actions/types";
const initialState = {
  isLoading: false,
  list: []
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_NOTIFICATIONS_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.GET_NOTIFICATIONS_SUCCESS:
      return { ...state, isLoading: false, list: [...payload, ...state.list] };
    case actionTypes.GET_NOTIFICATIONS_FAILED:
      return { ...state, isLoading: false };

    case actionTypes.MARK_AS_READ:
      return {
        ...state,
        list: getNewList(state.list, payload)
      };
    case actionTypes.MARK_ALL_AS_READ:
      return { ...state, list: getNewList(state.list) };
    default:
      return state;
  }
};

const getNewList = (list, id) => {
  let newList = [];
  if (id) {
    newList = list.map(item => {
      if (item.id === id) {
        item.hasRead = true;
      }
      return item;
    });
  } else {
    newList = list.map(item => {
      item.hasRead = true;
      return item;
    });
  }
  return newList;
};
