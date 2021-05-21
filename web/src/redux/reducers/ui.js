import { CLOSE_POPUP, OPEN_POPUP } from '../actions/actionTypes';

const initialStateUi = {
  popup: {
    id: null,
    isOpen: false,
    data: null,
  },
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

    default:
      return state;
  }
};

export { ui };
