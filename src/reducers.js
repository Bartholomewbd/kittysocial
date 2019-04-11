import {
  CHANGE_SEARCHFIELD,
  REQUEST_KITTYS_PENDING,
  REQUEST_KITTYS_SUCCESS,
  REQUEST_KITTYS_FAILED
} from "./constants.js";

const initialStateSearch = {
  searchField: ""
};

export const searchKittys = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return Object.assign({}, state, { searchField: action.payload });
    default:
      return state;
  }
};

const initialStateKittys = {
  isPending: false,
  kittys: [],
  error: ""
};

export const requestKittys = (state = initialStateKittys, action = {}) => {
  switch (action.type) {
    case REQUEST_KITTYS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_KITTYS_SUCCESS:
      return Object.assign({}, state, {
        kittys: action.payload,
        isPending: false
      });
    case REQUEST_KITTYS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    default:
      return state;
  }
};
