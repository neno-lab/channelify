import {
  CLOSE_POPUP,
  CLOSE_TOAST,
  OPEN_POPUP,
  OPEN_TOAST,
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
  isToast: false,
  toast: {
    text: '',
    className: '',
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

    case OPEN_TOAST:
      return {
        ...state,
        isToast: true,
        toast: {
          text: action.text,
          className: action.className,
        },
      };

    case CLOSE_TOAST:
      return {
        ...state,
        isToast: false,
        toast: {
          text: '',
          className: '',
        },
      };

    default:
      return state;
  }
};

export { ui };
