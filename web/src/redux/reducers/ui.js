import {
  CLOSE_POPUP,
  OPEN_POPUP,
  SET_LOADER,
  UNSET_LOADER,
} from '../actions/actionTypes';

const initialStateUi = {
  popup: {
    id: null,
    isOpen: false,
    data: null,
  },
  isLoading: false,
};

const ui = (state = initialStateUi, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return {
        ...state,
        popup: {
          id: action.id,
          isOpen: true,
          data: action.data,
        },
      };

    case CLOSE_POPUP:
      return {
        ...state,
        popup: {
          id: null,
          isOpen: false,
          data: null,
        },
      };

    case SET_LOADER:
      return {
        ...state,
        isLoading: true,
      };

    case UNSET_LOADER:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export { ui };
